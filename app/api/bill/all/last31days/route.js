import { IsLoggedIn } from "@middlewares";
import Bill from "@models/bill";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();

      const today = new Date();
      const last31Days = new Date(today.getTime() - 31 * 24 * 60 * 60 * 1000);

      const dateRange = [];

      for (let i = 31; i > 0; i--) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const formattedDate = date.toISOString().substring(0, 10);
        dateRange.push(formattedDate);
      }

      console.log(dateRange);
      const results = await Bill.aggregate([
        {
          $match: {
            createdAt: { $gte: last31Days },
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
