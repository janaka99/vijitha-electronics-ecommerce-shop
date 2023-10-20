import { IsLoggedIn } from "@middlewares";
import Cart from "@models/cart";
import Item from "@models/item";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import User from "@models/user";
import Stripe from "stripe";
const stripeInstance = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);
const mongoose = require("mongoose");

export async function POST(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    const mongoSession = await mongoose.startSession();

    try {
      // mongoSession.startTransaction();
      const result = await Cart.find({ customer: loggedUser._id }).populate({
        path: "itemId",
        model: Item,
      });

      if (result.length <= 0) {
        return new Response(JSON.stringify({ message: "Invalid purchase" }), {
          status: 500,
        });
      }
      const head = req.headers.get("origin");
      const { address_id } = await req.json();
      const shippingAddress = await findAddress(
        loggedUser._id.toString(),
        address_id
      );
      if (shippingAddress === false) {
        return new Response(
          JSON.stringify({ message: "Invalid Address Try Again" }),
          {
            status: 400,
          }
        );
      }

      const newOrder = new Order({
        orderItems: [],
        customer: loggedUser._id,
        shippingDetails: shippingAddress,
      });

      const items = await Promise.all(
        result.map(async (item) => {
          const newOrderItem = new OrderItem({
            itemId: item.itemId._id,
            product_img: item.itemId.src,
            name: item.itemId.name,
            quantity: item.quantity,
            boughtPrice_unit: item.itemId.price,
            orderId: newOrder._id,
            customer: loggedUser._id,
          });

          let ord = await newOrderItem.save();

          return ord._id;
        })
      );

      newOrder.orderItems = newOrder.orderItems.concat(items);

      console.log(newOrder);
      console.log("work for here 1");
      const createdOrder = await newOrder.save();

      console.log("work for here 2");
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        // billing_address_collection: "auto",
        phone_number_collection: {
          enabled: true,
        },
        shipping_options: [{ shipping_rate: "shr_1NxxAxSAnzC7DqTgT7c3j3Zp" }],
        line_items: result.map((item) => {
          const img = item.itemId.src;

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.itemId.name,
                images: [img],
              },
              unit_amount: item.itemId.price * 100,
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",

        success_url: `${head}/user/dashboard/my-orders`,
        cancel_url: `${head}/products/buy/checkout`,
        metadata: {
          order_id: createdOrder._id.toString(),
          user_id: loggedUser._id.toString(),
          shipping_address: JSON.stringify(shippingAddress),
        },
        payment_intent_data: {
          metadata: {
            order_id: createdOrder._id.toString(),
            user_id: loggedUser._id.toString(),
            shipping_address: JSON.stringify(shippingAddress),
          },
        },
      };
      console.log("work for here 3");
      // await mongoSession.commitTransaction();
      const session = await stripeInstance.checkout.sessions.create(params);
      // let session = "Asda";
      console.log("work for here 4");
      return new Response(JSON.stringify(session), {
        status: 200,
      });
    } catch (err) {
      console.error(err);
      // await mongoSession.abortTransaction();
      return new Response(
        JSON.stringify({ message: "Category already exists" }),
        {
          status: 500,
        }
      );
    } finally {
      // mongoSession.endSession();
    }
  } else {
    console.log("asd");
    return new Response(
      JSON.stringify({ message: "Category already exists" }),
      {
        status: 500,
      }
    );
  }
}

const findAddress = async (userId, shippingAddressIdToFind) => {
  const user = await User.findOne(
    { _id: userId, "shippingAddress._id": shippingAddressIdToFind },
    { "shippingAddress.$": 1 }
  );
  if (!user) {
    return false;
  }
  if (!user.shippingAddress || user.shippingAddress.length === 0) {
    return false;
  }

  const foundShippingAddress = user.shippingAddress[0]; // There should be only one matching address

  return foundShippingAddress;
};
