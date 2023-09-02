import { IsLoggedIn } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  try {
    await connectToDB();
    //find available categories
    const id = req.nextUrl.searchParams.get("id");
    const rs = await Category.find({ _id: id });
    console.log(rs);
    //return all the categories
    return new Response(JSON.stringify(rs), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
