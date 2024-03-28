import { RegisterUser } from "../controllers";

const express = require("express");

export const userRoutes = express.Router();

userRoutes.post("/user/register", RegisterUser);
