import { connectToDB } from "@utils/database";
import { IsLoggedIn } from "@middlewares";
import User from "@models/user";

export async function GET(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();
      //update the product status to not available
      const cart = await User.findOne({ _id: loggedUser._id }).populate({
        path: "cart.itemId",
        select: "name price src",
      });

      return new Response(JSON.stringify(cart.cart), {
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
