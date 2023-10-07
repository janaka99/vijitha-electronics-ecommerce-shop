import { connectToDB } from "@utils/database";
import User from "@models/user";

import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const user = await IsLoggedIn(req);

  if (user !== false) {
    try {
      const { password } = await req.json();
      if (
        password == undefined ||
        password == null ||
        password == "" ||
        password.length <= 8
      ) {
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
      let newHashedPass = await bcrypt.hash(password.toString(), 10);

      await User.findByIdAndUpdate(user._id, {
        password: newHashedPass,
      });

      return new Response(
        JSON.stringify({ message: "Successfully Updated Your Password" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 401,
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 401,
    });
  }
};
