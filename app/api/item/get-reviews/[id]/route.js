import { IsLoggedIn } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import Review from "@models/review";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  try {
    await connectToDB();
    //find all available products
    const id = req.nextUrl.searchParams.get("id");
    const rs = await Review.find({ item: id }).populate({
      path: "addedBy",
      model: User,
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
