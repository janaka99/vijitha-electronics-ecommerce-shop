import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function GET(req, res) {
  try {
    await connectToDB();
    //find all available products
    console.log("reached");
    const token = req.nextUrl.searchParams.get("token");
    const rs = await User.find({ "passResetCode.code": token });
    if (rs.length > 0) {
      return new Response(JSON.stringify({ message: "Valid Token" }), {
        status: 200,
      });
    }

    //return all the products
    return new Response(JSON.stringify({ errr: "Invalid Token" }), {
      status: 400,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
