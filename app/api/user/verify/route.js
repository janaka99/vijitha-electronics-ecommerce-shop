import { IsLoggedIn } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await connectToDB();
    const { token } = await req.json();
    console.log(id);
    const rs = await User.findOneAndUpdate(
      { emailVerification: token, isVerified: false },
      {
        isVerified: true,
      },
      { new: true }
    );
    if (rs) {
      return new Response(
        JSON.stringify({ message: "Email Verification Successful" }),
        {
          status: 200,
        }
      );
    }

    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  } catch (err) {
    console.log(err);

    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
