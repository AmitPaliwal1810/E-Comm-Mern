import { AddProduct, UpdateProduct } from "../../controllers/adminController"
import { auth } from "../../middlewares"

const express = require("express")

export const productOperationRoutes = express.Router()

productOperationRoutes.use(auth)

productOperationRoutes.post('/add-product', AddProduct)
productOperationRoutes.post('/update-product', UpdateProduct)