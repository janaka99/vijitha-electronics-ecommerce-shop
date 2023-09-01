import { connectToDB } from "@utils/database";
import User from "@models/user";

import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const user = await IsLoggedIn(req);

  if (user !== false) {
    try {
      const { name, phoneNumber, nic, address1, address2, address3, id } =
        await req.json();
      await connectToDB();
      if (user._id.toString() === id.toString()) {
        await User.findByIdAndUpdate(id, {
          name: name,
          phoneNumber: phoneNumber,
          NIC: nic,
          address1: address1,
          address2: address2,
          address3: address3,
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
          { status: 400 }
        );
      }
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: "Something went wrong" }), {
        status: 400,
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
