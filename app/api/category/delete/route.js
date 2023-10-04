import { IsLoggedIn, IsLoggedInAsAdmin } from "@middlewares";
import Category from "@models/category";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedInAsAdmin(req);
  if (loggedUser !== false) {
    try {
      const { categoryId } = await req.json();

      //check if there is a category id in the request
      if (
        categoryId === undefined ||
        categoryId === null ||
        categoryId === ""
      ) {
        //if not return error
        return new Response(
          JSON.stringify({ message: "Something went wrong " }),
          {
            status: 500,
          }
        );
      } else {
        connectToDB();
        //else find the category and delete it from the database
        await Category.findOneAndDelete({ _id: categoryId });

        return new Response(JSON.stringify({ message: "Success" }), {
          status: 200,
        });
      }
    } catch (err) {
      console.error(err);
      //if error, then return error response
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
