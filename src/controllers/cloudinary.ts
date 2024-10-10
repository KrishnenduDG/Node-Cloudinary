import { Request, Response } from "express";
import { failureLabel, successLabel } from "../constants";
import { uploadFileUsingMulter } from "../service/cloudinary";

/**
 *
 * @param req
 * @param res
 *
 * Route function to handle Single File upload using Cloudinary
 */
export const handleUploadSingleFileToCloudinary = async (
  req: Request,
  res: Response
) => {
  const logoBuffer = req.file?.buffer;
  try {
    const fileUploadUrl = await uploadFileUsingMulter(logoBuffer);

    res.status(200).json({
      status: successLabel,
      message: "File upload successful",
      url: fileUploadUrl,
    });
  } catch (error: any) {
    console.log(error.message);

    res.status(500).json({
      status: failureLabel,
      message: "File upload failed",
    });
  }
};

/**
 *
 * @param req
 * @param res
 *
 * Route function to handle Multiple File uploads using Cloudinary
 */
export const handleUploadMultipleFilesToCloudinary = async (
  req: Request,
  res: Response
) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const videoBuffer = files.video[0].buffer;
  const imagesBuffer = files.images.map((img) => img.buffer);

  try {
    // Uploading the Video
    const videoLink = await uploadFileUsingMulter(videoBuffer);
    console.log(videoLink);

    // Uploading the Images
    const imageLinks = await Promise.all(
      imagesBuffer.map(async (buf) => await uploadFileUsingMulter(buf))
    );

    res.status(200).json({
      status: successLabel,
      message: "File upload successful",
      videoLink,
      imageLinks,
    });
  } catch (error) {
    res.status(500).json({
      status: failureLabel,
      message: "File upload failed",
    });
  }
};
