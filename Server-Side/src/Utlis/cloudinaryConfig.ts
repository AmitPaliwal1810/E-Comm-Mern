import { v2 as cloudinary } from "cloudinary";
import { cloudinary_API_Key, cloudinary_API_Sceret } from "./constant";

cloudinary.config({
  cloud_name: "ecommerece",
  api_key: cloudinary_API_Key,
  api_secret: cloudinary_API_Sceret,
});
