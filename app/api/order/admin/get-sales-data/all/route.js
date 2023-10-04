import { IsLoggedIn } from "@middlewares";
import Bill from "@models/bill";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  //check the if the user is logged in
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();
      //find all available products
      const rs = await Order.find({ isPaid: true });
      //return all the products
      return new Response(JSON.stringify(rs), {
        status: 200,
      });
    } catch (err) {
      //return an error
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    //return an error
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
