import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // File has been successfully uploaded
       
        // Remove the locally saved temporary file
        // fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        // Remove the locally saved temporary file as the upload operation failed
        fs.unlinkSync(localFilePath);
        console.log("Error uploading to Cloudinary:", error);
        return null; // Return null to indicate failure
    }
};

export { uploadOnCloudinary };
