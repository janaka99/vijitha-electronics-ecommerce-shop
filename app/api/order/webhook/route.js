import Stripe from "stripe";
import { headers } from "next/headers";
import Order from "@models/order";
import Cart from "@models/cart";
import OrderItem from "@models/orderedItem";
import mongoose from "mongoose";
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);
// whsec_293a39677864d1641bea738d1d6c512ec92808e6ad8e5af5295ba9e4b81ca6cd

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("stripe-signature").toString();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NEXT_STRIPE_WEBHOOK_SECRET_TEST_MODE
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Webhook Error" }), {
      status: 400,
    });
  }

  //   const address = session.customer_details.address;

  if (event.type === "checkout.session.completed") {
    // const mongooseSession = await mongoose.startSession();

    try {
      const session = event.data.object;
      //   console.log(session);
      // mongooseSession.startTransaction();

      await Order.updateOne(
        { _id: session.metadata.order_id },
        { isPaid: true }
      );
      await Cart.deleteMany({ customer: session.metadata.user_id });

      // await mongooseSession.commitTransaction();

      return new Response(JSON.stringify({ message: "Order Placed" }), {
        status: 200,
      });
    } catch (error) {
      // mongooseSession.abortTransaction();
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 400,
      });
    } finally {
      // mongooseSession.endSession();
    }
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 400,
  });
}
