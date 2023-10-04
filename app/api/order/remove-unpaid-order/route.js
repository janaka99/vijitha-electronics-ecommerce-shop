import { IsLoggedIn, IsLoggedInAsAdmin } from "@middlewares";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export async function POST(req, res) {
  let user = await IsLoggedIn(req);
  if (user !== false) {
    const { order_id } = await req.json();
    const session = await mongoose.startSession();
    try {
      await connectToDB();
      session.startTransaction();

      await Order.deleteOne({
        $and: [{ _id: order_id }, { customer: user._id }, { isPaid: false }],
      });

      await OrderItem.deleteMany({
        $and: [{ orderId: order_id }, { customer: user._id }],
      });

      session.commitTransaction();
      //return all the products
      return new Response(JSON.stringify({ message: "SuccessFull" }), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ message: "You Don't Have Permission" }),
      {
        status: 500,
      }
    );
  }
}
