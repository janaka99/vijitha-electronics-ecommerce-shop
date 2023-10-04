import { IsLoggedIn, IsLoggedInAsAdmin } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import Order from "@models/order";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function POST(req, res) {
  let user = await IsLoggedIn(req);
  if (user !== false) {
    const { order_id } = await req.json();

    try {
      await connectToDB();

      await Order.findOneAndUpdate(
        { $and: [{ _id: order_id }, { customer: user._id }] },
        {
          status: "Delivered",
        }
      );

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
