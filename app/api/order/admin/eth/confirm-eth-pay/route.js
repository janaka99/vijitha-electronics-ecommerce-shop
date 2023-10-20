import { IsLoggedInAsAdmin } from "@middlewares";
import Cart from "@models/cart";
import Item from "@models/item";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import User from "@models/user";
import ABI from "@utils/abi.json";

import Web3 from "web3";

export async function POST(req) {
  const user = await IsLoggedInAsAdmin(req);
  if (user === false) {
    return new Response(JSON.stringify({ message: "Unauthorized Access" }), {
      status: 405,
    });
  }
  try {
    const web3 = new Web3(process.env.NEXT_SEPOLIA_RPC_URL);

    try {
      console.log("orderId");
      const { orderId } = await req.json();
      console.log(orderId);
      const contractABI = ABI; // Replace with your contract's ABI
      const contractAddress =
        process.env.NEXT_VIJITHAELECTRONICS_CONTRACT_ADDRESS; // Replace with your contract's address
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const orders = await contract.methods
        .getOrderByOrderId(orderId.toString())
        .call();
      if (orders.length <= 0 || !orders) {
        return new Response(
          JSON.stringify({ message: "Something went wrong" }),
          {
            status: 405,
          }
        );
      }
      const paid_order = await Order.findOne({
        _id: orderId,
        isPaid: false,
        isEthPayament: true,
      });

      if (!paid_order) {
        return new Response(
          JSON.stringify({
            message: "Something went wrong",
            error: error.message,
          }),
          {
            status: 400,
          }
        );
      }

      const results = await OrderItem.find({
        orderId: orderId,
      });

      for (const result of results) {
        const item = await Item.findById(result.itemId);
        if (item) {
          // reduce the quantity of the product back in stock
          item.qty -= result.quantity;
          item.totalSold += result.quantity;
          await item.save();
        }
      }

      await Order.updateOne({ _id: orderId }, { isPaid: true });
      await Cart.deleteMany({ customer: paid_order.customer });
      return new Response(
        JSON.stringify({ message: "Order Placed", order: "orders" }),
        {
          status: 200,
        }
      );

      return new Response(JSON.stringify({ message: "Update Successfull" }), {
        status: 200,
      });
    } catch (error) {
      // mongooseSession.abortTransaction();
      console.log(error);
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
          error: error.message,
        }),
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error }),
      {
        status: 400,
      }
    );
  }
}

const createList = (list) => {
  const data = list.map((item) => {
    for (let i = 0; i < list.length; i++) {
      return {
        orderId: item[1],
        customerId: item[2],
        paymentAddress: item[3],
        total: item[4],
      };
    }
  });
  return data;
};
