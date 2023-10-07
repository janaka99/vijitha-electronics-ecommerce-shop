import { connectToDB } from "@utils/database";
import User from "@models/user";
import { IsLoggedIn } from "@middlewares";

export async function GET(req, res) {
  const loggedUser = await IsLoggedIn(req);

  if (loggedUser !== false) {
    try {
      connectToDB();
      //find all available products
      const rs = await User.findOne({ _id: loggedUser._id });

      //return all the products
      return new Response(JSON.stringify(rs.shippingAddress), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "You need to logged In!" }), {
      status: 500,
    });
  }
}
