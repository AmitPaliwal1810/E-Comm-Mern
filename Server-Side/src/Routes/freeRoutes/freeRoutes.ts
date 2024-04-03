import { getAllProducts } from "../../controllers"

const express = require("express")

export const freeRoutes = express.Router()

freeRoutes.get('/products', getAllProducts)