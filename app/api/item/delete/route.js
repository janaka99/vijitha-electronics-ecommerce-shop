import { connectToDB } from "@utils/database";
import Item from "@models/item";
import IsLoggedIn from "@middlewares";

export async function POST(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      // get the product id
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
        await Item.findByIdAndUpdate(userId, {
          status: "not_available",
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
