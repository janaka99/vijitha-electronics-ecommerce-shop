import { IsLoggedIn } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  try {
    await connectToDB();
    //find all available products
    const id = req.nextUrl.searchParams.get("id");
    const rs = await Item.find({ _id: id, status: "available" }).populate({
      path: "category",
      model: Category,
    });

    //return all the products
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
