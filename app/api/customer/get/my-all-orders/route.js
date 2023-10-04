import { IsLoggedIn } from "@middlewares";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  //check the if the user is logged in
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();
      //find all available products
      const rs = await Order.find({ customer: loggedUser._id })
        .populate({
          path: "customer",
          model: User,
        })
        .populate({ path: "orderItems", model: OrderItem });
      //return all the products
      return new Response(JSON.stringify(rs), {
        status: 200,
      });
    } catch (err) {
      //return an error
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    //return an error
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
