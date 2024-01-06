import { IsLoggedIn } from "@middlewares";
import Bill from "@models/bill";
import Item from "@models/item";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import { connectToDB } from "@utils/database";
import moment from "moment";
const { DateTime } = require("luxon");

export async function GET(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      console.log(currentYear);
      const lastYear = currentYear - 1;
      console.log(lastYear);
      const firstDayOfLastYear = new Date(lastYear, 0, 1);
      const lastDayOfLastYear = new Date(lastYear, 11, 31);

      const firstMonthOfYear = new Date(currentYear - 1, 0, 1);
      const monthsOfYear = [];

      for (let i = 0; i < 12; i++) {
        const month = new Date(currentYear - 1, i, 1);
        monthsOfYear.push(month);
      }

      const allMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // const startOfMonth = new Date(currentYear - 1, currentMonth, 1); // Start of the current month
      console.log(lastDayOfLastYear, firstDayOfLastYear);
      const results = await OrderItem.aggregate([
        {
          $match: {
            createdAt: {
              $gte: firstDayOfLastYear,
              $lt: lastDayOfLastYear,
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: {
              $sum: {
                $multiply: ["$quantity", "$boughtPrice_unit"],
              },
            },
            eth_total: {
              $sum: {
                $multiply: ["$quantity", "$boughtPrice_unit_eth"],
              },
            },
          },
        },
      ]);

      let allMonthsData = [];

      allMonths.forEach((month) => {
        allMonthsData.push({
          month: month,
          total: 0,
          eth_total: 0,
        });
      });
      console.log(results);
      results.forEach((result) => {
        const monthIndex = result._id - 1;
        allMonthsData[monthIndex].total = result.total;
        allMonthsData[monthIndex].eth_total = result.eth_total;
      });
      return new Response(JSON.stringify(allMonthsData), {
        status: 200,
      });
    } catch (error) {
      console.log("err ", error);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
