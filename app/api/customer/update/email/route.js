import { connectToDB } from "@utils/database";
import User from "@models/user";

import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const user = await IsLoggedIn(req);

  if (user !== false) {
    try {
      const { email, id } = await req.json();
      await connectToDB();
      if (user._id.toString() === id.toString()) {
        var crypto = require("crypto");
        var vcode = crypto.randomBytes(20).toString("hex");

        await User.findByIdAndUpdate(id, {
          email: email,
          emailVerification: vcode,
          isVerified: false,
        });

        return new Response(
          JSON.stringify({ message: "Successfully Updated" }),
          {
            status: 200,
          }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "You don't have permission" }),
          { status: 200 }
        );
      }
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 200,
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
