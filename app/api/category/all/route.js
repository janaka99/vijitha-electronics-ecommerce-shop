import { IsLoggedIn } from "@middlewares";
import Category from "@models/category";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      connectToDB();
      const rs = await Category.find();

      return new Response(JSON.stringify(rs), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
