import { connectToDB } from "@utils/database";
import User from "@models/user";
import { getServerSession } from "next-auth/next";

import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const isloggedIn = await IsLoggedIn(req);

  if (isloggedIn === false) {
    try {
      const {
        name,
        email,
        phone_number,
        address1,
        address2,
        address3,
        password,
      } = await req.json();
      await connectToDB();

      var crypto = require("crypto");
      var vcode = crypto.randomBytes(20).toString("hex");

      const user = await User.findOne({ email: email });

      if (user.length > 0) {
        return new Response(JSON.stringify({ error: "User already exists!" }), {
          status: 200,
        });
      }

      const newUser = new User({
        name: name,
        email: email,
        password: password,
        phoneNumber: phone_number,
        address1: address1,
        address2: address2,
        address3: address3,
        emailVerification: vcode,
      });

      const result = await newUser.save();

      console.log(result);

      return new Response(
        JSON.stringify({ message: "Successfully registered please login" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ message: "Failed to create new user" }),
        { status: 200 }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "You already logged In!" }), {
      status: 500,
    });
  }
};
