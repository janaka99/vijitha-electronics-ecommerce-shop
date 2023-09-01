import { IsLoggedIn } from "@middlewares";
import Category from "@models/category";
import { connectToDB } from "@utils/database";

export async function POST(req, res) {
  //check the if the user is logged and has authority to delete a product
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      const { title, categoryId } = await req.json();

      //check if the title and category id is empty or not
      if (
        title === undefined ||
        title === null ||
        title === "" ||
        categoryId === undefined ||
        categoryId === null ||
        categoryId === null ||
        categoryId === "" ||
        categoryId === 0
      ) {
        //if empty, then return error message
        return new Response(
          JSON.stringify({ message: "Something went wrong " }),
          {
            status: 500,
          }
        );
      } else {
        connectToDB();
        //if not then update the category
        await Category.findByIdAndUpdate(categoryId, {
          name: title,
        });

        //return success message
        return new Response(
          JSON.stringify({ message: "Category updated successfully" }),
          {
            status: 200,
          }
        );
      }
    } catch (err) {
      if (err.code && err.code === 11000) {
        return new Response(
          JSON.stringify({ message: "Category already exists" }),
          {
            status: 500,
          }
        );
      }
      console.error(err);

      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
      // res.status(500).json({ message: "success" });
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
