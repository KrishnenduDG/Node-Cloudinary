import streamifier from "streamifier";
import { cloudinary } from "../config";

// export const uploadFileUsingMulter = async (fileBuffer: any) => {
//   try {
//     if (!fileBuffer) throw new Error("File empty..");

//     // const uploadResult = await cloudinary.uploader.upload_stream(fileBuffer, {
//     //   folder: "hypepitch",
//     // });

//     const cldUploadStream = cloudinary.uploader.upload_stream({
//       folder: "hypepitch",
//     });

//     streamifier.createReadStream(fileBuffer).pipe(cldUploadStream);
//     console.log("File is uploaded on cloudinary", uploadResult.secure_url);
//     return uploadResult.secure_url;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export const uploadFileUsingMulter = (fileBuffer: any) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) reject("File Buffer empty");

    // Creating the Stream with proper configs
    const cldUploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "hypepitch",
        resource_type: "auto",
      },
      (error: any, result: any) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );

    // Joining the Stream with Request File
    streamifier.createReadStream(fileBuffer).pipe(cldUploadStream);
  });
};
