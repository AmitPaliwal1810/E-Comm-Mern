import { NextFunction, Request, Response } from "express";
import { sceretKey } from "../Utlis";
import { ExtenedRequest } from "../commonInterfaces";
import { pool } from "../database/config/connection";

const jwt = require("jsonwebtoken");


const tokenValidity = (expiryTime: number, created_at: number) => {
  const currentTime = new Date();
  const unixTime = Math.floor(currentTime.getTime() / 1000);
  const diffInHours = Math.abs(unixTime - created_at) / 3600;
  return Boolean(expiryTime > diffInHours)
};

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
      if (!tokenValidity(2, decodedToken.iat)) {
        const tokenExpiryQuery = `UPDATE session SET archived_at = ($1) WHERE id=$2`
        const { rows } = await pool.query(tokenExpiryQuery, [new Date(), decodedToken.sessionId])
        return res.status(401).json({
          message: 'Session not found or token expired'
        })
      }
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
