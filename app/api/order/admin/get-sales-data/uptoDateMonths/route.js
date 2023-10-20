import { IsLoggedIn } from "@middlewares";
import Bill from "@models/bill";
import Item from "@models/item";
import Order from "@models/order";
import OrderItem from "@models/orderedItem";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const firstMonthOfYear = new Date(currentYear, 0, 1);
      const monthsOfYear = [];

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

      for (let i = 0; i <= currentMonth; i++) {
        const month = new Date(currentYear, i, 1);
        monthsOfYear.push(month);
      }

      const results = await OrderItem.aggregate([
        {
          $match: {
            createdAt: { $gte: firstMonthOfYear },
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
