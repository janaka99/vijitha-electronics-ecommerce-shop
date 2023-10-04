import { IsLoggedIn, IsLoggedInAsAdmin } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import Order from "@models/order";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { sendOrderUpdate } from "@utils/mailService";
import mongoose from "mongoose";

export async function POST(req) {
  let isAdmin = await IsLoggedInAsAdmin(req);
  if (isAdmin !== false) {
    try {
      const mongoSession = await mongoose.startSession();

      mongoSession.startTransaction();
      await connectToDB();
      //find all available products
      const { type, nextAction, orderId } = await req.json();
      console.log(type, nextAction, orderId);
      const rs = await Order.find({ _id: orderId })
        .populate({
          path: "customer",
          model: User,
        })
        .session(mongoSession);
      if (rs.length <= 0 || !rs) {
        return new Response(
          JSON.stringify({ message: "Something went wrong" }),
          {
            status: 500,
          }
        );
      }
      if (rs[0]) {
        let order = rs[0];
        const { isTrue, name, object } = isNextAction(
          order.status,
          nextAction,
          isAdmin._id.toString()
        );
        if (isTrue === false) {
          return new Response(
            JSON.stringify({ message: "Something went wrong " }),
            {
              status: 401,
            }
          );
        }
        console.log(object);

        const update = {
          status: nextAction,
        };
        update[name] = object;
        try {
          await Order.findOneAndUpdate(
            { _id: order.id, isPaid: true },
            update
          ).session(mongoSession);

          console.log(
            "result ",
            rs[0].customer.email,
            rs[0].customer.name,

            nextAction,
            order._id
          );
          await sendOrderUpdate(
            rs[0].customer.email,
            rs[0].customer.name,
            nextAction,
            order._id
          );
          await mongoSession.commitTransaction();
          return new Response(JSON.stringify({ message: "Success" }), {
            status: 200,
          });
        } catch (error) {
          //return all the products
          mongoSession.endSession();
          return new Response(
            JSON.stringify({ message: "Something went wrong " }),
            {
              status: 500,
            }
          );
        }
      }
    } catch (err) {
      mongoSession.endSession();
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ message: "You Don't Have Permission" }),
      {
        status: 500,
      }
    );
  }
}

function isNextAction(action, nextAction, adminId) {
  if (action === "Pending" || nextAction === "Confirmed") {
    let name = "confirmedBy";
    return {
      isTrue: true,
      name: name,
      object: {
        user: adminId,
        datetime: Date.now(),
        isConfirmed: true,
      },
    };
  }
  if (action === "Confirmed" || nextAction === "Processing") {
    let name = "processingBy";
    return {
      isTrue: true,
      name: name,
      object: {
        user: adminId,
        datetime: Date.now(),
        isProcessing: true,
      },
    };
  }
  if (action === "Processing" || nextAction === "Dispatched") {
    let name = "dispatchedBy";
    return {
      isTrue: true,
      name: name,
      object: {
        user: adminId,
        datetime: Date.now(),
        isDispatched: true,
      },
    };
  }
  if (
    nextAction === "Canceled" &&
    (action === "Pending" || action === "Confirmed" || action === "Processing")
  ) {
    let name = "canceledBy";
    return {
      isTrue: true,
      name: name,
      object: {
        user: adminId,
        datetime: Date.now(),
        isCanceled: true,
      },
    };
  }

  return false, false;
}
