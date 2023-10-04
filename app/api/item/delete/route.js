import { connectToDB } from "@utils/database";
import Item from "@models/item";
import IsLoggedIn, { IsLoggedInAsAdmin } from "@middlewares";

export async function POST(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedInAsAdmin(req);
  if (loggedUser === false) {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
  try {
    // get the product id
    const { itemId } = await req.json();
    //check if the product id is null
    if (itemId === undefined || itemId === null || itemId === "") {
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 401,
        }
      );
    } else {
      connectToDB();
      //update the product status to not available
      await Item.findByIdAndUpdate(itemId, {
        status: "not_available",
      });

      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
