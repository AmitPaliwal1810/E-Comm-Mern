import { GetUserDetails, LoginUser, RegisterUser } from "../controllers";
import { auth } from "../middlewares";

const express = require("express");

export const userRoutes = express.Router();

userRoutes.use(auth);

userRoutes.get("/user-details", GetUserDetails);
