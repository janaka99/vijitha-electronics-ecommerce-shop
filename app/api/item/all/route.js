import { IsLoggedIn } from "@middlewares";
import Category from "@models/category";
import Item from "@models/item";
import { connectToDB } from "@utils/database";
import { mongoDBSession } from "@utils/mongodbTransaction";

export async function GET(req, res) {
  //check the if the user is logged and has authority to delete a product
  // const loggedUser = await IsLoggedIn(req);
  // if (loggedUser !== false) {

  try {
    await connectToDB();
    //find all available products
    const rs = await Item.find({ status: "available" }).populate({
      path: "category",
      model: Category,
    });
    //return all the products
    return new Response(JSON.stringify(rs), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
  // } else {
  //   return new Response(JSON.stringify({ message: "Something went wrong " }), {
  //     status: 500,
  //   });
  // }
}
