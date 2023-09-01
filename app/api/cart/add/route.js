import Cart from "@models/cart";
import { IsLoggedIn } from "@middlewares";
import Item from "@models/item";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export async function POST(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      const { product_id, quantity } = await req.json();
      const product = await Item.findById(product_id);
      let qty = 0;
      if (product) {
        // Check if the item already exists in the cart
        const existingCartItem = loggedUser.cart.find(
          (item) => item.itemId.toString() === product_id
        );
        if (existingCartItem) {
          qty = existingCartItem.quantity + quantity;
        } else {
          qty = quantity;
        }
        if (product.qty < qty) {
          return new Response(JSON.stringify({ message: "Item Sold Out" }), {
            status: 400,
          });
        }

        if (existingCartItem) {
          // If the item exists, update the quantity
          qty = await User.updateOne(
            { _id: loggedUser._id, "cart.itemId": product_id },
            { $set: { "cart.$.quantity": qty } }
          );
        } else {
          // If the item doesn't exist, add it to the cart
          await User.findByIdAndUpdate(loggedUser._id, {
            $push: {
              cart: {
                itemId: product_id,
                quantity: qty,
              },
            },
          });
        }

        return new Response(JSON.stringify({ message: "Added To Cart" }), {
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({ message: "Something went wrong" }),
          {
            status: 400,
          }
        );
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
