import { connectToDB } from "@utils/database";
import Item from "@models/item";
import { storage } from "@utils/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL, deleteObject } from "firebase/storage";
import { IsLoggedIn } from "@middlewares";

export async function POST(req, next) {
  //check the if the user is logged and has authority to add new product
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      //get all the data from request body
      const data = await req.formData();

      //extract product details
      const [detailskey, detailsValue] = Array.from(data.entries())[0];

      //extract product image file
      const [fileskey, filesValue] = Array.from(data.entries())[1];

      //generate unique name for product image
      var crypto = require("crypto");
      var vcode = crypto.randomBytes(20).toString("hex");

      //check the uploded image file is in valid format
      const isFile = typeof filesValue === "object";

      //check if there is a product image
      if (isFile) {
        //buffer the product image
        const buffer = Buffer.from(await filesValue.arrayBuffer());

        //set firebase storage reference to save the product image
        const storageRef = ref(storage, `files/${vcode}.png`);

        //save product image to firebase storage
        const snapshot = await uploadBytesResumable(storageRef, buffer);

        //check wether product image was successfully uploaded
        if (snapshot.state === "success") {
          //if yes get the image url to save in database
          const imageURL = await getDownloadURL(snapshot.ref);
          4;

          //get the image path to save in database
          const imagePath = snapshot.ref.fullPath;

          //get product details to readable format
          const productDetails = JSON.parse(detailsValue);

          //validate product details
          const product = validateUserDetails(productDetails);

          //check if validation fails
          if (product === false) {
            //if validation fails, then delete the uploaded product image
            await deleteObject(storageRef);
            //return error response
            return new Response("Something went wrong try again later", {
              status: 400,
            });
          }
          //if validation succeeds, then create new product object
          const newProduct = new Item({
            name: productDetails.name,
            qty: productDetails.qty,
            description: productDetails.description,
            src: imageURL,
            imageId: imagePath,
            price: productDetails.price,
            ethPrice: productDetails.ethPrice,
            addedBy: loggedUser._id,
            updatedBy: loggedUser._id,
            category: productDetails.category,
            ethPrice: productDetails.ethPrice,
          });
          try {
            //save new product
            await newProduct.save();

            //return success response
            return new Response(
              JSON.stringify({ message: "Successfully added Item" }),
              {
                status: 200,
              }
            );
          } catch (error) {
            //if catch any errors  while saving product, then delete the uploaded image
            await deleteObject(storageRef);

            //return error response
            return new Response(
              JSON.stringify({
                message: "Something went wrong try again later",
              }),
              {
                status: 400,
              }
            );
          }
        } else {
          // return error response if catch any errors
          return new Response(
            JSON.stringify({ status: "Image upload failed " }),
            { status: 400 }
          );
        }
      }
      // return error response if catch any errors
      return new Response("Something went wrong try again later", {
        status: 400,
      });
    } catch (error) {
      // return error response if catch any errors
      return new Response("Something went wrong try again later", {
        status: 400,
      });
    }
  } else {
    //if logged user has no authority to add new product return error response
    return new Response(
      JSON.stringify({ message: "Something went wrong try again later" }),
      {
        status: 400,
      }
    );
  }
}

const validateUserDetails = (productDetails) => {
  let error = false;
  console.log(productDetails);
  if (productDetails.name === "") {
    error = true;
  }
  if (productDetails.price === 0) {
    error = true;
  } else if (typeof Number(productDetails.price) == NaN) {
    error = true;
  }
  if (productDetails.ethPrice === 0) {
    error = true;
  } else if (typeof Number(productDetails.ethPrice) == NaN) {
    error = true;
  }
  if (productDetails.description === "") {
    error = true;
  }
  if (typeof Number(productDetails.stock) == NaN) {
    error = true;
  }

  if (productDetails.category == null || productDetails.category == "") {
    setCategoryError("Select a category");
    error = true;
  }

  if (error) {
    return false;
  }
  return productDetails;
};
