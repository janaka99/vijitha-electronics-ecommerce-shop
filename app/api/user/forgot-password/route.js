import User from "@models/user";
import { connectToDB } from "@utils/database";
import { sendPasswordVerificationEmail } from "@utils/mailService";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    if (email == "") {
      return new Response(
        JSON.stringify({ message: "Please enter a valid email" }),
        { status: 400 }
      );
    }
    await connectToDB();

    let user = await User.findOne({
      email: email.toLowerCase(),
      isVerified: true,
    });

    if (user) {
      var crypto = require("crypto");
      var code = crypto.randomBytes(20).toString("hex");

      let hashedPass = await bcrypt.hash(code.toString(), 10);

      user.passResetCode = {
        code: hashedPass,
        expireDate: Date.now() + 3600000,
      };

      console.log(hashedPass);

      await user.save();

      await sendPasswordVerificationEmail(user.email, user.passResetCode.code);
      return new Response(JSON.stringify({ message: "Successfull " }), {
        status: 200,
      });
    }
    return new Response(
      JSON.stringify({ message: "Please enter a valid email" }),
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
  }
};
