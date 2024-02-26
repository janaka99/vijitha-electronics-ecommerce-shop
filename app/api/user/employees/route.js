import { connectToDB } from "@utils/database";
import User from "@models/user";

export async function GET(req, res) {
  try {
    connectToDB();
    //find all available products
    const rs = await User.find({
      role: { $in: ["admin", "manager", "employee"] },
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
