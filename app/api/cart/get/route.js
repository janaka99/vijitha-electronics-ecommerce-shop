import { connectToDB } from "@utils/database";
import { IsLoggedIn } from "@middlewares";
import User from "@models/user";
import Item from "@models/item";
import Cart from "@models/cart";

export async function GET(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      // await connectToDB();
      //update the product status to not available
      // const cart = await User.findOne({ _id: loggedUser._id }).populate({
      //   path: "cart.itemId",
      //   model: Item,
      //   select: "name price src",
      // });
      // console.log("cart ", cart);
      const cartItems = await Cart.find({ customer: loggedUser._id }).populate({
        path: "itemId",
        model: Item,
      });
      return new Response(JSON.stringify(cartItems), {
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 501,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
