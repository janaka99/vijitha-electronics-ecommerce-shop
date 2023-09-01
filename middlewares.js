import { getToken } from "next-auth/jwt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function IsLoggedInAsAdmin(req, next) {
  try {
    const decoded = await getToken({ req });
    if (decoded == null || decoded == undefined) {
      return false;
    } else {
      if (decoded.email != null) {
        await connectToDB();
        const user = await User.findOne({
          $and: [
            { email: decoded.email },
            { $or: [{ role: "manager" }, { role: "admin" }] },
          ],
        });
        if (!user) {
          return false;
        } else {
          return user;
        }
      } else {
        return false;
      }
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function IsLoggedIn(req, next) {
  try {
    const decoded = await getToken({ req });
    if (decoded == null || decoded == undefined) {
      return false;
    } else {
      if (decoded.email != null) {
        await connectToDB();
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
          return false;
        } else {
          return user;
        }
      } else {
        return false;
      }
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}
