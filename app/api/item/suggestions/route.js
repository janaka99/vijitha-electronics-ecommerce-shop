import Category from "@models/category";
import Item from "@models/item";
import { connectToDB } from "@utils/database";

export async function POST(req, res) {
  try {
    connectToDB();

    const { search } = await req.json();
    let rs = null;
    if (
      search === undefined ||
      search === null ||
      search.length === 0 ||
      search == ""
    ) {
      //find all available products
      rs = await Item.find()
        .populate({
          path: "category",
          model: Category,
        })
        .limit(4);
    } else {
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
      rs = await Item.find(query)
        .populate({
          path: "category",
          model: Category,
        })
        .limit(4);
    }
    if (rs == null || rs.length == 0 || rs == undefined) {
      rs = await Item.find()
        .populate({
          path: "category",
          model: Category,
        })
        .limit(4);
    }
    if (rs.length < 4) {
      const remain = 4 - rs.length;
      const newrs = await Item.find()
        .populate({
          path: "category",
          model: Category,
        })
        .limit(remain);
      // combine newrs and rs
      rs = rs.concat(newrs);
      return new Response(JSON.stringify(rs), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify(rs), {
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
