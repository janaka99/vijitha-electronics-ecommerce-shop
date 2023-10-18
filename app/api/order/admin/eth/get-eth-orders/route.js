import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import User from "@models/user";
import ABI from "@utils/abi.json";

import Web3 from "web3";

export async function GET(req) {
  try {
    const web3 = new Web3(process.env.NEXT_SEPOLIA_RPC_URL);

    try {
      const contractABI = ABI; // Replace with your contract's ABI
      const contractAddress =
        process.env.NEXT_VIJITHAELECTRONICS_CONTRACT_ADDRESS; // Replace with your contract's address
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const orders = await contract.methods.getAllOrders().call();
      if (orders.length < 0 || !orders) {
        return new Response(
          JSON.stringify({
            message: "Something went wrong",
          }),
          {
            status: 400,
          }
        );
      }
      // Convert BigInt values to strings before serializing
      let serializedData = JSON.stringify(orders, (key, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      });
      serializedData = JSON.parse(serializedData);

      serializedData = createList(serializedData);

      for (let i = 0; i < serializedData.length; i++) {
        let order = await Order.findOne({ _id: serializedData[i].orderId })
          .populate({
            path: "customer",
            model: User,
          })
          .populate({
            path: "orderItems",
            model: OrderItem,
          });

        serializedData[i].orderDetails = order;
      }

      return new Response(JSON.stringify(serializedData), {
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
          status: 400,
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
