import { connectToDB } from "@utils/database";
import User from "@models/user";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcrypt";

import { IsLoggedInAsAdmin } from "@middlewares";
import { sendVerificationEmail } from "@utils/mailService";

export const POST = async (req, res) => {
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
    if (password == "" || password.length < 8) {
      return new Response(
        JSON.stringify({ message: "Password not long enough" }),
        { status: 400 }
      );
    }

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return new Response(JSON.stringify({ message: "Email already taken" }), {
        status: 400,
      });
    }

    var crypto = require("crypto");
    var vcode = crypto.randomBytes(20).toString("hex");
    let newHashedPass = await bcrypt.hash(password.toString(), 10);
    const newUser = new User({
      name: name,
      email: email.toLowerCase(),
      password: newHashedPass,
      phoneNumber: phone_number,
      address1: address1,
      address2: address2,
      address3: address3,
      emailVerification: vcode,
      src: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    });

    await newUser.save();
    await sendVerificationEmail(newUser.email, newUser.emailVerification);

    return new Response(
      JSON.stringify({ message: "Successfully registered a new user" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Failed to create new user" }),
      { status: 400 }
    );
  }
};
