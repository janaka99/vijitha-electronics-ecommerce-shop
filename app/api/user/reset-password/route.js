import User from "@models/user";
import { connectToDB } from "@utils/database";
import { passResetSuccess } from "@utils/mailService";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    let { token, password } = await req.json();
    token = token.toString();
    if (token == "" || token == null || token === undefined) {
      return new Response(JSON.stringify({ message: "Invalid Token" }), {
        status: 400,
      });
    }
    if (password == "" || password.length <= 8) {
      return new Response(
        JSON.stringify({ message: "Invalid Password, Check You Password!" }),
        { status: 400 }
      );
    }
    await connectToDB();

    let user = await User.findOne({
      $and: [
        { "passResetCode.code": { $exists: true } },
        { "passResetCode.code": token },
        { "passResetCode.expireDate": { $gt: Date.now() } },
      ],
    });

    if (user) {
      let newHashedPass = await bcrypt.hash(password.toString(), 10);
      user.passResetCode = {
        code: undefined,
        expireDate: undefined,
      };
      user.password = newHashedPass;

      await user.save();

      await passResetSuccess(user.email);
      // console.log(user);
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
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 400,
    });
  }
};
