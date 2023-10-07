import { connectToDB } from "@utils/database";
import User from "@models/user";
import { IsLoggedIn } from "@middlewares";

export const POST = async (req, res) => {
  const isloggedIn = await IsLoggedIn(req);

  if (isloggedIn !== false) {
    try {
      const {
        name,
        address1,
        address2,
        city,
        state,
        postalCode,
        country,
        contact,
      } = await req.json();
      await connectToDB();

      if (
        name === "" ||
        name === undefined ||
        address1 === "" ||
        address1 === undefined ||
        address2 === "" ||
        address2 === undefined ||
        city === "" ||
        city === undefined ||
        state === "" ||
        state === undefined ||
        country === "" ||
        country === undefined ||
        postalCode === "" ||
        postalCode === undefined ||
        contact === "" ||
        contact === undefined
      ) {
        return new Response(JSON.stringify({ error: "Fill All The Fields" }), {
          status: 400,
        });
      }

      const newShippingAddress = {
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        contact: contact,
      };
      console.log(newShippingAddress);
      await User.findOneAndUpdate(
        { _id: isloggedIn._id },
        {
          $push: {
            shippingAddress: newShippingAddress,
          },
        }
      );

      return new Response(
        JSON.stringify({
          message: "Successfully registered new Shipping Address",
        }),
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
  } else {
    return new Response(JSON.stringify({ message: "You need to logged In!" }), {
      status: 500,
    });
  }
};
