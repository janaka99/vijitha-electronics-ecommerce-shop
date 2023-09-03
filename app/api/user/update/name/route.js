import { connectToDB } from "@utils/database";
import User from "@models/user";

import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const user = await IsLoggedIn(req);

  if (user !== false) {
    try {
      const { name } = await req.json();
      if (name == undefined || name == null || name == "") {
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

      await User.findByIdAndUpdate(user._id, {
        name: name,
      });

      return new Response(
        JSON.stringify({ message: "Successfully Updated Your Name" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      let msg = "Something went wrong";
      console.error(error.code);
      if (error.code === 11000) {
        msg = "User name already taken";
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
