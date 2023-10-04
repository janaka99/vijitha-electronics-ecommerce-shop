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
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const firstMonthOfYear = new Date(currentYear, 0, 1);
      const monthsOfYear = [];

      for (let i = 0; i <= currentMonth; i++) {
        const month = new Date(currentYear, i, 1);
        monthsOfYear.push(month);
      }

      const results = await Bill.aggregate([
        {
          $match: {
            createdAt: { $gte: firstMonthOfYear },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalCost: { $sum: "$totalCost" },
          },
        },
      ]);

      const data = monthsOfYear.map((month) => {
        const monthNumber = month.getMonth();
        const year = month.getFullYear();
        const result = results.find((item) => item._id === monthNumber);
        const totalCost = result ? result.totalCost : 0;

        return {
          month: monthNumber,
          year,
          totalCost,
        };
      });

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
