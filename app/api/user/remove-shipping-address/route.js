import { IsLoggedIn } from "@middlewares";
import User from "@models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await IsLoggedIn(req);
  if (user !== false) {
    const { id } = await req.json();

    if (id === undefined || id === null || id === "") {
      return NextResponse.json({ message: "Error" }, { status: 400 });
    }
    try {
      await User.findOneAndUpdate(
        {
          $and: [
            { _id: user._id },
            {
              "shippingAddress._id": id,
            },
          ],
        },
        { $pull: { shippingAddress: { _id: id } } }
      );
      return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error" }, { status: 400 });
    }
  }
  return NextResponse.json({ message: "Error" }, { status: 400 });
}
