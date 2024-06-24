import {
  AddProduct,
  UpdateProduct,
  UploadProductImage,
} from "../../controllers/adminController";
import { auth } from "../../middlewares";
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


const express = require("express");

export const productOperationRoutes = express.Router();

productOperationRoutes.use(auth);

productOperationRoutes.post("/add-product", AddProduct);
productOperationRoutes.post("/update-product", UpdateProduct);
productOperationRoutes.post("/upload-product-image", upload.single('image') ,UploadProductImage);
