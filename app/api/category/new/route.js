import { IsLoggedIn } from "@middlewares";
import Category from "@models/category";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      const { name } = await req.json();
      console.log(name);
      if (name === undefined || name === null || name === "") {
        return new Response(
          JSON.stringify({ message: "Something went wrong " }),
          {
            status: 500,
          }
        );
      } else {
        connectToDB();
        const newCategory = new Category({
          name: name,
        });

        const rs = await newCategory.save();

        return new Response(JSON.stringify({ message: "Success" }), {
          status: 200,
        });
      }
    } catch (err) {
      if (err.code && err.code === 11000) {
        return new Response(
          JSON.stringify({ message: "Category already exists" }),
          {
            status: 500,
          }
        );
      }
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
      // res.status(500).json({ message: "success" });
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
