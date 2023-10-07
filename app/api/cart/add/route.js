import Cart from "@models/cart";
import { IsLoggedIn } from "@middlewares";
import Item from "@models/item";
import mongoose from "mongoose";

export async function POST(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    const mongoSession = await mongoose.startSession();
    try {
      mongoSession.startTransaction();

      // Get data from the requst
      const { product_id, quantity } = await req.json();

      //chekk if the product is exist
      const product = await Item.findById(product_id);
      let qty = 0;

      if (product) {
        // check if quantity is available
        if (product.qty <= 0) {
          return new Response(
            JSON.stringify({
              message: "Something went wrong",
            }),
            {
              status: 400,
            }
          );
        }

        // Check if the cart is created
        const cartHave = await Cart.find({
          $and: [{ customer: loggedUser._id }, { itemId: product._id }],
        });

        if (cartHave.length !== 1) {
          const cartItem = new Cart({
            itemId: product._id,
            quantity: quantity,
            customer: loggedUser._id,
          });
          await cartItem.save();
          return new Response(JSON.stringify({ message: "Added To Cart" }), {
            status: 200,
          });
        } else {
          qty = cartHave[0].quantity + quantity;
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

          // check if the quantity is greater than the available quantity
          if (qty > product.qty) {
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

          // update the cart
          const updatedItem = await Cart.findOneAndUpdate(
            {
              $and: [{ customer: loggedUser._id }, { itemId: product._id }],
            },
            {
              $set: { quantity: qty },
            },
            { new: true } // Return the updated document
          );
          mongoSession.commitTransaction();
          if (updatedItem) {
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
        }
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
