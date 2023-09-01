import { connectToDB } from "@utils/database";
import { IsLoggedInAsAdmin } from "@middlewares";
import User from "@models/user";

export async function POST(req, res) {
  const loggedUser = await IsLoggedInAsAdmin(req);
  if (loggedUser !== false) {
    try {
      const { userId } = await req.json();
      //check if the product id is null
      if (userId === undefined || userId === null || userId === "") {
        return new Response(
          JSON.stringify({ message: "Something went wrong " }),
          {
            status: 500,
          }
        );
      } else {
        connectToDB();
        //update the product status to not available
        await User.findByIdAndUpdate(userId, {
          accountStatus: "resigned",
        });

        return new Response(JSON.stringify({ message: "Success" }), {
          status: 200,
        });
      }
    } catch (err) {
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
