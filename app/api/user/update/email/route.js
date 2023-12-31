import { connectToDB } from "@utils/database";
import User from "@models/user";

import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const user = await IsLoggedIn(req);

  if (user !== false) {
    try {
      const { email } = await req.json();
      if (email == undefined || email == null || email == "") {
        return new Response(
          JSON.stringify({
            message: "Check Your form again before submit again!",
          }),
          {
            status: 400,
          }
        );
      }
      await connectToDB();
      var crypto = require("crypto");
      var vcode = crypto.randomBytes(20).toString("hex");

      await User.findByIdAndUpdate(user._id, {
        email: email,
        emailVerification: vcode,
        isVerified: false,
      });

      return new Response(
        JSON.stringify({ message: "Successfully Updated Your Email" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      let msg = "Something went wrong";
      console.error(error.code);
      if (error.code === 11000) {
        msg = "Email is already registered";
      }
      return new Response(JSON.stringify({ message: msg }), {
        status: 401,
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 401,
    });
  }
};
