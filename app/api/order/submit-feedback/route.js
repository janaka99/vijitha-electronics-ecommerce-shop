import { IsLoggedIn, IsLoggedInAsAdmin } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import Review from "@models/review";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export async function POST(req, res) {
  let user = await IsLoggedIn(req);
  if (user !== false) {
    const { rating, message, item_id, order_id, order_item_id } =
      await req.json();
    console.log(rating, message, item_id, order_id, order_item_id);
    try {
      if (message === "" || rating < 0 || rating > 6) {
        return new Response(
          JSON.stringify({ message: "Fill all ther fields" }),
          {
            status: 400,
          }
        );
      }
      await connectToDB();
      const mongoSession = await mongoose.startSession();
      const item = await OrderItem.findOne({
        orderId: order_id,
        customer: user._id,
        itemId: item_id,
        _id: order_item_id,
      });

      if (!item) {
        return new Response(
          JSON.stringify({ message: "Something went wrong " }),
          {
            status: 400,
          }
        );
      }
      const newFeedback = new Review({
        message: message,
        rating: rating,
        addedBy: user._id,
        item: item.itemId,
        orderItem: item._id,
      });
      mongoSession.startTransaction();
      await newFeedback.save();
      await OrderItem.findOneAndUpdate({ _id: item._id }, { reviewed: true });
      await mongoSession.commitTransaction();
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
