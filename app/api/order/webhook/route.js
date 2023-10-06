import Stripe from "stripe";
import { headers } from "next/headers";
import Order from "@models/order";
import Cart from "@models/cart";
import OrderItem from "@models/orderedItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("stripe-signature").toString();
  // const signature = NextResponse.headers().get("stripe-signature").toString();
  console.log(signature);
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NEXT_STRIPE_WEBHOOK_SECRET_TEST_MODE
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Webhook Error", error: req.headers }),
      {
        status: 400,
      }
    );
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
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
          error: error.message,
        }),
        {
          status: 400,
        }
      );
    }
  }
  return new Response(JSON.stringify({ message: "Something went wrong" }), {
    status: 400,
  });
}
