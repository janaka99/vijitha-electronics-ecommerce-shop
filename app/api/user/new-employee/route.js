import { connectToDB } from "@utils/database";
import User from "@models/user";
import { getServerSession } from "next-auth/next";

import { IsLoggedInAsAdmin } from "@middlewares";
import { sendVerificationEmail } from "@utils/mailService";

export const POST = async (req, res) => {
  const isAdmin = await IsLoggedInAsAdmin(req);

  if (isAdmin !== false) {
    try {
      const {
        name,
        email,
        phoneNumber,
        id,
        address1,
        address2,
        address3,
        role,
        password,
      } = await req.json();
      await connectToDB();

      var crypto = require("crypto");
      var vcode = crypto.randomBytes(20).toString("hex");

      const newUser = new User({
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        NIC: id,
        address1: address1,
        address2: address2,
        address3: address3,
        role: role,
        emailVerification: vcode,
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
        { status: 200 }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ message: "Failed to create new user" }),
      { status: 500 }
    );
  }
};
