import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

/*
|--------------------------------------------------------------------------
| Upload Image
|--------------------------------------------------------------------------
*/

export const uploadImage = (
  buffer,
  folder = "portfolio"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return reject(error);
        }

        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

/*
|--------------------------------------------------------------------------
| Upload PDF
|--------------------------------------------------------------------------
*/

export const uploadPdf = (
  buffer,
  originalFilename,
  folder = "portfolio"
) => {
  return new Promise((resolve, reject) => {
    const fileName = originalFilename
      .replace(".pdf", "")
      .replace(/\s+/g, "_");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: fileName,
        format: "pdf",
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error(error);
          return reject(error);
        }

        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

/*
|--------------------------------------------------------------------------
| Delete Asset
|--------------------------------------------------------------------------
*/

export const deleteAsset = async (
  publicId,
  resourceType = "image"
) => {
  if (!publicId) return;

  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};

/*
|--------------------------------------------------------------------------
| Delete Helpers
|--------------------------------------------------------------------------
*/

export const deleteImage = async (publicId) => {
  return deleteAsset(publicId, "image");
};

export const deletePdf = async (publicId) => {
  return deleteAsset(publicId, "image");
};