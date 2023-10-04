import { IsLoggedIn, IsLoggedInAsAdmin } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  let isAdmin = await IsLoggedInAsAdmin(req);
  if (isAdmin !== false) {
    try {
      await connectToDB();
      //find all available products
      let filter;
      const status = req.nextUrl.searchParams.get("status");
      if (status === "Not Paid") {
        filter = {
          isPaid: false,
        };
      } else {
        filter = {
          $and: [{ status: status }, { isPaid: true }],
        };
      }
      const rs = await Order.find(filter)
        .populate({
          path: "customer",
          model: User,
        })
        .populate({
          path: "orderItems",
          model: OrderItem,
        })
        .populate("canceledBy.user", "name email")
        .populate("dispatchedBy.user", "name email")
        .populate("processingBy.user", "name email")
        .populate("confirmedBy.user", "name email");

      //return all the products
      return new Response(JSON.stringify(rs), {
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
