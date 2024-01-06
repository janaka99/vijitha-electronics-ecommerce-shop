import Cart from "@models/cart";
import { IsLoggedIn } from "@middlewares";
import Item from "@models/item";

export async function POST(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      let id = req.nextUrl.searchParams.get("id").toString();
      console.log(id);
      // Check if the cart is created
      await Cart.findOneAndDelete({
        $and: [{ customer: loggedUser._id }, { _id: id }],
      });

      return new Response(
        JSON.stringify({ message: "Successfully removed the item" }),
        {
          status: 200,
        }
      );
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 401,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
