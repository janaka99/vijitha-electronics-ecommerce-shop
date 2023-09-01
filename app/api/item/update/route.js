import { connectToDB } from "@utils/database";
import Item from "@models/item";
import { storage } from "@utils/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL, deleteObject } from "firebase/storage";
import { IsLoggedIn } from "@middlewares";

export async function POST(req, next) {
  const loggedUser = await IsLoggedIn(req);
  if (loggedUser !== false) {
    try {
      const data = await req.formData();
      console.log(data);
      const [detailskey, detailsValue] = Array.from(data.entries())[0];
      const productDetails = JSON.parse(detailsValue);
      //Validate user entered details
      const product = validateUserDetails(productDetails);
      if (product === false) {
        return new Response("Something went wrong try again later", {
          status: 400,
        });
      }

      //see if the user updating the product's image
      if (Array.from(data.entries())[1]) {
        const [fileskey, filesValue] = Array.from(data.entries())[1];

        //fetch data from that saved Product to delete the image from firebase storage
        const savedProduct = await Item.findById(productDetails.id);
        console.log(savedProduct);
        //create storage reference to current image details
        const toDeleteStorageRef = ref(storage, savedProduct.imageId);

        //generate unique name from the image
        var crypto = require("crypto");
        var vcode = crypto.randomBytes(20).toString("hex");

        //create storage reference for the new image
        const newStorageRef = ref(storage, `files/${vcode}.png`);

        //upload new image to firebase storage
        const buffer = Buffer.from(await filesValue.arrayBuffer());
        const snapshot = await uploadBytesResumable(newStorageRef, buffer);

        //check wether the upload is successful or not
        if (snapshot.state === "success") {
          //if Suucess, get the new image details
          const newImageURL = await getDownloadURL(snapshot.ref);
          const newImagePath = snapshot.ref.fullPath;

          try {
            await Item.findByIdAndUpdate(productDetails.id, {
              name: productDetails.name,
              qty: productDetails.qty,
              description: productDetails.description,
              src: newImageURL,
              imageId: newImagePath,
              price: productDetails.price,
              updatedBy: loggedUser._id,
              category: productDetails.category,
            });
          } catch (error) {
            console.log("error1 ", error);
            //if got error while updating delete the newly updated image and return
            await deleteObject(newStorageRef);
            return new Response(
              JSON.stringify({
                message: "Something went wrong try again later",
              }),
              {
                status: 400,
              }
            );
          }
          //if no errors delete old image from firebase and return sucess
          await deleteObject(toDeleteStorageRef);
          return new Response(
            JSON.stringify({ message: "Category updated successfully" }),
            {
              status: 200,
            }
          );
        }
      } else {
        try {
          console.log(productDetails);
          //update the product details
          await Item.findByIdAndUpdate(productDetails.id, {
            name: productDetails.name,
            qty: productDetails.qty,
            description: productDetails.description,
            price: productDetails.price,
            updatedBy: loggedUser._id,
            category: productDetails.category,
          });
          //return success response
          return new Response(
            JSON.stringify({ message: "Category updated successfully" }),
            {
              status: 200,
            }
          );
        } catch (error) {
          console.log("error2 ", error);
          //if found any error while uploading return error
          return new Response(
            JSON.stringify({ message: "Something went wrong try again later" }),
            {
              status: 400,
            }
          );
        }
      }
    } catch (error) {
      //if dound any error return error response
      console.log("error3 ", error);
      return new Response(
        JSON.stringify({ message: "Something went wrong try again later" }),
        {
          status: 400,
        }
      );
    }
  } else {
    //if logged user has no authority to update product return error response
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
  if (productDetails.name === "") {
    error = true;
  }
  if (productDetails.price === 0) {
    error = true;
  } else if (typeof Number(productDetails.price) == NaN) {
    error = true;
  }
  if (productDetails.description === "") {
    error = true;
  }
  if (typeof Number(productDetails.stock) == NaN) {
    error = true;
  }

  if (productDetails.category == null || productDetails.category == "") {
    error = true;
  }
  if (error) {
    return false;
  }
  return productDetails;
};
