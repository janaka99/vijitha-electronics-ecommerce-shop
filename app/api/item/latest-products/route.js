import Category from "@models/category";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  try {
    connectToDB();
    //find all available products
    const rs = await Item.find({ status: "available" })
      .populate({
        path: "category",
        model: Category,
      })
      .sort({ createdAt: -1 })
      .limit(8);

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
