import Cart from "@models/cart";
import { IsLoggedIn } from "@middlewares";
import Item from "@models/item";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      let qty = 0;
      let id = req.nextUrl.searchParams.get("id").toString();

      const cartHave = await Cart.find({
        $and: [{ customer: loggedUser._id }, { itemId: id }],
      }).populate({
        path: "itemId",
        model: Item,
      });

      console.log(cartHave);
      if (cartHave.length !== 1) {
        return new Response(
          JSON.stringify({ message: "Something went wrong" }),
          {
            status: 400,
          }
        );
      } else {
        qty = cartHave[0].quantity - 1;
        if (qty <= 0) {
          return new Response(
            JSON.stringify({
              lessThan1: "0",
              message: "Quantity can not be 0",
            }),
            {
              status: 400,
            }
          );
        }
        if (qty > cartHave[0].itemId.qty) {
          return new Response(
            JSON.stringify({
              maxExceeded: "0",
              message: "Quantity exceed the maximum item count",
            }),
            {
              status: 400,
            }
          );
        }
        const updatedItem = await Cart.findOneAndUpdate(
          {
            $and: [{ customer: loggedUser._id }, { itemId: id }],
          },
          {
            $set: { quantity: qty },
          },
          { new: true } // Return the updated document
        );
        if (updatedItem) {
          return new Response(
            JSON.stringify({ message: "item quantity Updated" }),
            {
              status: 200,
            }
          );
        } else {
          return new Response(
            JSON.stringify({ message: "Something went wrong" }),
            {
              status: 400,
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 400,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 400,
    });
  }
}
