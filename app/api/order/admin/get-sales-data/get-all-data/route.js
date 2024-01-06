import { IsLoggedIn } from "@middlewares";
import Bill from "@models/bill";
import Item from "@models/item";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import moment from "moment";
import mongoose from "mongoose";

export async function GET(req, res) {
  //check the if the user is logged import styled from 'styled-components/native';
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    const session = await mongoose.startSession();
    try {
      connectToDB();

      // Today's date and time
      const endDate = new Date();
      endDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day
      const today = new Date(endDate);
      const days7 = new Date(endDate);
      days7.setDate(today.getDate() - 7); // 7 days ago from today's date
      const days31 = new Date(endDate);
      days31.setDate(today.getDate() - 31); // 31 days ago from today's date

      const today_r = new Date();
      today_r.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      // Calculate the start of the current day by setting hours, minutes, seconds, and milliseconds to 0
      session.startTransaction();

      let todaySales = await Order.find({
        isPaid: true,
        createdAt: { $gte: today_r, $lt: tomorrow },
      })
        .populate({
          path: "orderItems",
          model: OrderItem,
        })
        .populate({ path: "customer", model: User })
        .populate({ path: "confirmedBy.user", model: User })
        .populate({ path: "dispatchedBy.user", model: User })
        .populate({ path: "canceledBy.user", model: User })
        .populate({ path: "processingBy.user", model: User });

      let last7daysSales = await Order.find({
        isPaid: true,
        createdAt: { $gte: days7, $lt: endDate },
      })
        .populate({
          path: "orderItems",
          model: OrderItem,
        })
        .populate({ path: "customer", model: User })
        .populate({ path: "confirmedBy.user", model: User })
        .populate({ path: "dispatchedBy.user", model: User })
        .populate({ path: "canceledBy.user", model: User })
        .populate({ path: "processingBy.user", model: User });
      let last31daysSales = await Order.find({
        isPaid: true,
        createdAt: { $gte: days31, $lt: endDate },
      })
        .populate({
          path: "orderItems",
          model: OrderItem,
        })
        .populate({ path: "customer", model: User })
        .populate({ path: "confirmedBy.user", model: User })
        .populate({ path: "dispatchedBy.user", model: User })
        .populate({ path: "canceledBy.user", model: User })
        .populate({ path: "processingBy.user", model: User });
      let allOrders = await Order.find({
        isPaid: true,
      })
        .populate({
          path: "orderItems",
          model: OrderItem,
        })
        .populate({ path: "customer", model: User })
        .populate({ path: "confirmedBy.user", model: User })
        .populate({ path: "dispatchedBy.user", model: User })
        .populate({ path: "canceledBy.user", model: User })
        .populate({ path: "processingBy.user", model: User });
      // last7days = calTotal(last7days);
      const payload = {
        today: {
          total: calTotal(todaySales),
          orders: todaySales,
        },
        last7days: {
          total: calTotal(last7daysSales),
          orders: last7daysSales,
        },
        last31days: {
          total: calTotal(last31daysSales),
          orders: last31daysSales,
        },
        allOrders: {
          total: calTotal(allOrders),
          orders: allOrders,
        },
      };

      await session.commitTransaction();
      session.endSession();
      return new Response(JSON.stringify(payload), {
        status: 200,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 400,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}

const calTotal = (items) => {
  let total = 0;
  let ethTotal = 0;
  if (items.length <= 0) {
    return {
      usd: total,
      eth: ethTotal,
    };
  }
  items.map((item) => {
    if (item.isEthPayment === true) {
      item.orderItems.map((i) => {
        let total = i.boughtPrice_unit_eth * i.quantity;
        ethTotal = ethTotal + total;
      });
    } else {
      item.orderItems.map((i) => {
        let itemTotal = i.boughtPrice_unit * i.quantity;
        total = total + itemTotal;
      });
    }
  });

  return {
    usd: total,
    eth: ethTotal,
  };
};
