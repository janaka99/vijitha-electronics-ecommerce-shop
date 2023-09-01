import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "thewebreader",
  api_key: "626376744895686",
  api_secret: "dqVlc8myBEMxUYhMnZz59rq5_L8",
});

const uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.UploadStream.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

export { cloudinary, uploads };
