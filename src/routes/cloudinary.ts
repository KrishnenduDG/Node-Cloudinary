import { Router } from "express";
import { multerUpload } from "../config";
import {
  handleUploadMultipleFilesToCloudinary,
  handleUploadSingleFileToCloudinary,
} from "../controllers/cloudinary";

const cloudinaryRouter = Router();

// Cloudinary Config for multiple uploads
const cloudinaryMultipleUploadConfig = multerUpload.fields([
  { name: "video", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

cloudinaryRouter
  .post(
    "/single",
    multerUpload.single("logo"),
    handleUploadSingleFileToCloudinary
  )
  .post(
    "/multiple",
    cloudinaryMultipleUploadConfig,
    handleUploadMultipleFilesToCloudinary
  );

export default cloudinaryRouter;
