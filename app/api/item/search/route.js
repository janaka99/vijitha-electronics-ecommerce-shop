import Category from "@models/category";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function POST(req, res) {
  try {
    connectToDB();

    const { search } = await req.json();

    const keywords = search.split(" ");
    // Use regex for case-insensitive search in title or description
    const regexArray = keywords.map((keyword) => new RegExp(keyword, "i"));
    console.log(regexArray);
    const query = {
      $or: [
        { name: { $in: regexArray } },
        { description: { $in: regexArray } },
      ],
      // status: "available", // Additional condition for the status
    };

    //find all available products
    const rs = await Item.find(query).populate({
      path: "category",
      model: Category,
    });
    console.log(rs.length);
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
