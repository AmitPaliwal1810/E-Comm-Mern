import { NextFunction, Response, Request } from "express";
import { ImageUploadRequest } from "../../commonInterfaces";
import { v2 as cloudinary } from "cloudinary";
import { cloudinary_API_Key, cloudinary_API_Sceret } from "../../Utlis";

export const UploadProductImage = async (
  req: ImageUploadRequest,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;

  cloudinary.config({
    cloud_name: "ecommerece",
    api_key: cloudinary_API_Key,
    api_secret: cloudinary_API_Sceret,
  });

  if (!file) {
    return res.status(500).json({
      message: "image-invalid",
    });
  }

  try {
    await cloudinary.uploader
      .upload(file.path, {
        public_id: file.originalname,
      })
      .catch((error) => {
        console.log(error);
      });

    res.status(201).json({
      message: "uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};
