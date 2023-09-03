import { connectToDB } from "@utils/database";
import User from "@models/user";

import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const user = await IsLoggedIn(req);

  if (user !== false) {
    try {
      const { phone_number } = await req.json();
      if (
        phone_number == undefined ||
        phone_number == null ||
        phone_number == ""
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
      if (typeof Number(phone_number) == NaN) {
        return new Response(
          JSON.stringify({
            message: "Contact Should Be Numbers",
          }),
          {
            status: 400,
          }
        );
      }
      await connectToDB();

      await User.findByIdAndUpdate(user._id, {
        phoneNumber: phone_number,
      });

      return new Response(
        JSON.stringify({ message: "Successfully Updated Your Contact Number" }),
        {
          status: 200,
        }
      );
    } catch (error) {
      let msg = "Something went wrong";
      if (error.code === 11000) {
        msg = "Phone Number already registered";
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
