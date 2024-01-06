import Stripe from "stripe";
import { headers } from "next/headers";
import Order from "@models/order";
import Cart from "@models/cart";
import OrderItem from "@models/orderedItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { buffer } from "micro";
import Item from "@models/item";
import { connectToDB } from "@utils/database";
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.text();
    await connectToDB();
    console.log("reched");
    const signature = headers().get("stripe-signature").toString();
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.NEXT_STRIPE_WEBHOOK_SECRET_TEST_MODE
      );
    } catch (error) {
      console.log("err 2 ", error);
      return new Response(
        JSON.stringify({
          message: "Webhook Error",
          newErrro: error,
          body: body,
        }),
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

        const results = await OrderItem.find({
          orderId: session.metadata.order_id,
        });

        for (const result of results) {
          const item = await Item.findById(result.itemId);
          if (item) {
            // reduce the quantity of the product back in stock
            item.qty -= result.quantity;
            item.totalSold += result.quantity;
            await item.save();
          }
        }

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
        console.log("err ", error);
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
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error }),
      {
        status: 400,
      }
    );
  }
}
