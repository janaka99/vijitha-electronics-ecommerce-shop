import { IsLoggedIn, IsLoggedInAsAdmin } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  const user = await IsLoggedInAsAdmin(req);
  if (user === false) {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
  try {
    await connectToDB();
    //find all available products
    const id = req.nextUrl.searchParams.get("id");
    const rs = await Item.find({ _id: id, status: "available" }).populate({
      path: "category",
      model: Category,
    });
    console.log("Result ", res);
    if (rs) {
      return new Response(JSON.stringify(rs), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 400,
        }
      );
    }

    //return all the products
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
