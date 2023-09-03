import { connectToDB } from "@utils/database";
import User from "@models/user";

import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const user = await IsLoggedIn(req);

  if (user !== false) {
    try {
      const { address1, address2, address3 } = await req.json();
      if (
        address1 == undefined ||
        address1 == null ||
        address1 == "" ||
        address2 == undefined ||
        address2 == null ||
        address2 == ""
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

      await User.findByIdAndUpdate(user._id, {
        address1: address1,
        address2: address2,
        address3: address3,
      });

      return new Response(
        JSON.stringify({ message: "Successfully Updated Your Address" }),
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
