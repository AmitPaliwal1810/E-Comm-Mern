import { getAllProducts } from "../../controllers"

const express = require("express")

export const publicRoutes = express.Router()

publicRoutes.get('/products', getAllProducts)