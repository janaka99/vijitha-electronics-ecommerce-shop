import { IsLoggedIn } from "@middlewares";
import Bill from "@models/bill";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  //check the if the user is logged import { first } from 'react-native'
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();

      const today = new Date();
      const lastSevenDays = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const dateRange = [];

      for (let i = 7; i > 0; i--) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const formattedDate = date.toISOString().substring(0, 10);
        dateRange.push(formattedDate);
      }

      console.log(dateRange);
      const results = await Bill.aggregate([
        {
          $match: {
            createdAt: { $gte: lastSevenDays },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            totalCost: { $sum: "$totalCost" },
          },
        },
      ]);
      console.log(results);
      const data = dateRange.map((date) => {
        const result = results.find((item) => item._id === date);
        const totalCost = result ? result.totalCost : 0;
        return {
          date,
          totalCost,
        };
      });
      console.log(data);
      return new Response(JSON.stringify(data), {
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
