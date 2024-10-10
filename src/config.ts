import { v2 as cloudinary } from "cloudinary";
import multer, { memoryStorage } from "multer";

const PORT = process.env.PORT;

/**
 * Getting the Multer Upload Instance with memoryStorage to get the file buffer without saving
 */
const multerUpload = multer({ storage: memoryStorage() });

/**
 * Customising the Cloudinary Instance
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary, multerUpload, PORT };
