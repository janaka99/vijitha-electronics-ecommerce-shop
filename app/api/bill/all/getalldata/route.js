import { IsLoggedIn } from "@middlewares";
import Bill from "@models/bill";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  //check the if the user is logged import styled from 'styled-components/native';
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();

      //get todays date
      const today = new Date();

      //get 7 days ago
      const lastSevenDays = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const last31Days = new Date(today.getTime() - 31 * 24 * 60 * 60 * 1000);
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      // Calculate the start of the current day by setting hours, minutes, seconds, and milliseconds to 0

      const result1 = await Bill.aggregate([
        {
          $match: {
            createdAt: { $gte: lastSevenDays, $lt: startOfDay },
          },
        },
        {
          $group: {
            _id: null,
            totalCost: { $sum: "$totalCost" },
          },
        },
      ]);

      const result2 = await Bill.aggregate([
        {
          $match: {
            createdAt: { $gte: last31Days, $lt: startOfDay },
          },
        },
        {
          $group: {
            _id: null,
            totalCost: { $sum: "$totalCost" },
          },
        },
      ]);

      const result3 = await Bill.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfDay },
          },
        },
        {
          $group: {
            _id: null,
            totalCost: { $sum: "$totalCost" },
          },
        },
      ]);

      const result4 = await Bill.find()
        .sort({ createdAt: -1 })
        .populate("cashier");

      const totalCostToday = result3.length > 0 ? result3[0].totalCost : 0;
      const totalCostLastSevenDays =
        result1.length > 0 ? result1[0].totalCost : 0;
      const totalCost31Days = result2.length > 0 ? result2[0].totalCost : 0;

      const payload = {
        last7: totalCostLastSevenDays,
        last31: totalCost31Days,
        today: totalCostToday,
        bills: result4,
      };

      return new Response(JSON.stringify(payload), {
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
