import Order from "@models/order";
import Cart from "@models/cart";

import ABI from "@utils/abi.json";
import Web3 from "web3";

export async function POST(req) {
  try {
    const { orderId, customer_id } = await req.json();

    const web3 = new Web3(process.env.NEXT_SEPOLIA_RPC_URL);

    try {
      const contractABI = ABI; // Replace with your contract's ABI
      const contractAddress =
        process.env.NEXT_VIJITHAELECTRONICS_CONTRACT_ADDRESS; // Replace with your contract's address
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const orders = await contract.methods
        .getOrderByOrderId("652ec6e0c6c1e8ea6463870b")
        .call();

      if (orders.length < 0 || !orders) {
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

      try {
        await Order.updateOne({ _id: orderId }, { isPaid: true });
        await Cart.deleteMany({ customer: customer_id });
        return new Response(
          JSON.stringify({ message: "Order Placed", order: "orders" }),
          {
            status: 200,
          }
        );
      } catch (error) {
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
