import { LoginUser, RegisterUser } from "../../controllers";

const express = require("express");

export const authenticationRoutes = express.Router();

authenticationRoutes.post("/register", RegisterUser);
authenticationRoutes.post("/login", LoginUser);