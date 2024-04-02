import { NextFunction, Request, Response } from "express";
import { sceretKey } from "../Utlis";
import { ExtenedRequest } from "../commonInterfaces";

const jwt = require("jsonwebtoken");

export const auth = async (
  req: ExtenedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("token");
  if (!token?.startsWith("Bearer")) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
  try {
    const tokenPart = token?.split(" ")[1];
    if (tokenPart) {
      const decodedToken = jwt.verify(tokenPart, sceretKey);
      req.user_id = decodedToken["id"];
      req.user_role = decodedToken["role"]
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    next(error);
  }
};
