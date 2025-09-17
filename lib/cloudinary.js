// lib/cloudinaryUpload.js
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file, folder = "myapp/uploads") {
  if (!file) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: "auto", unique_filename: true },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url); 
        }
      )
      .end(buffer);
  });
}
