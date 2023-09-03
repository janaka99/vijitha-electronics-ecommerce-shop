import { connectToDB } from "@utils/database";
import { IsLoggedIn } from "@middlewares";
import User from "@models/user";

export async function GET(req, res) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      const user = await User.findOne(loggedUser._id);

      if (!user) {
        return new Response(
          JSON.stringify({ message: "Something went wrong " }),
          {
            status: 401,
          }
        );
      }

      return new Response(JSON.stringify({ user }), {
        status: 200,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 401,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 401,
    });
  }
}
