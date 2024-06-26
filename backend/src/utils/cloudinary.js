import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export const destroyOnCloudinary = async (remotePath) => {
  try {
    if (!remotePath) return null;
    const regex = /[\w\.\$]+(?=.png|.jpg|.gif)/;
    let matches;
    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('[\\w\\.\\$]+(?=.png|.jpg|.gif)', '')
    if ((matches = regex.exec(remotePath)) !== null) {
      // The result can be accessed through the `m`-variable.
      // destroy the file on Cloudinary
      await cloudinary.uploader
        .destroy(matches[0])
        .then((result) => console.log(result));
    }
  } catch (error) {
    throw error;
  }
};
