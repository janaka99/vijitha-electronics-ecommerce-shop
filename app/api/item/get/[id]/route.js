import { IsLoggedIn } from "@middlewares";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  try {
    await connectToDB();
    //find all available products
    const id = req.nextUrl.searchParams.get("id");
    const rs = await Item.find({ _id: id }).populate("category");
    console.log(rs);
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
