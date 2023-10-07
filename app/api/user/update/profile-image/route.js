import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";

import { storage } from "@utils/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL, deleteObject } from "firebase/storage";
import { IsLoggedIn } from "@middlewares";
import User from "@models/user";

export async function POST(req) {
  const user = await IsLoggedIn(req);
  if (user !== false) {
    try {
      const data = await req.formData();
      let file = data.get("file");

      if (!file) {
        return NextResponse.json({ success: false }, { status: 400 });
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      let filename = file.name.split(" "); // Split the string into an array of words
      filename = filename.join("");

      //generate unique name for profile image
      var crypto = require("crypto");
      var uniqueName = crypto.randomBytes(20).toString("hex");

      //file name
      filename = uniqueName.concat(filename);

      //set firebase storage reference to save the product image
      const storageRef = ref(storage, `files/${uniqueName + filename}`);

      //save profile image to firebase storage
      const snapshot = await uploadBytesResumable(storageRef, buffer);

      //check wether profile image was uploaded
      if (snapshot.state === "success") {
        //get the image url
        const imageUrl = await getDownloadURL(snapshot.ref);

        // get the image path
        const imagePath = snapshot.ref.fullPath;

        try {
          await connectToDB();

          let userToUpdate = await User.findOne({ _id: user._id });

          if (userToUpdate.imageId) {
            //set firebase storage reference to delete previous image
            const imageToDelete = ref(storage, userToUpdate.imageId);
            await deleteObject(imageToDelete);
          }

          await User.findOneAndUpdate(
            { _id: user._id },
            {
              src: imageUrl,
              imageId: imagePath,
            }
          );

          return NextResponse.json({ success: true }, { status: 200 });
        } catch (error) {
          console.log(error);
          return NextResponse.json({ success: false }, { status: 400 });
        }
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
