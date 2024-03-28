import { NextFunction, Request, Response } from "express";
import { salt, sceretKey } from "../Utlis";
import { pool } from "../database/config/connection";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//* ========================================== RegisterUser ===========================================

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role } = req.body;

  const hashPassword = bcrypt.hashSync(password, salt);
  const insertQuery = `INSERT INTO users (name , email, password, role) VALUES ($1, $2, $3, $4) RETURNING id`;
  try {
    const { rows } = await pool.query(insertQuery, [
      name,
      email,
      hashPassword,
      role,
    ]);
    res.status(201).json({
      message: "Registered Successfully",
    });
  } catch (error) {
    next(error);
  }
};

//* ============================================ LoginUser ====================================================

export const LoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  const loginQuery = `SELECT id , name , email, password FROM users WHERE email=$1`;
  try {
    const { rows } = await pool.query(loginQuery, [email]);
    if (rows.length === 0) {
      res.status(401).json({
        messgae: "no-user found",
      });
    } else {
      bcrypt.compare(password, rows[0].password, (_: any, result: any) => {
        if (result) {
          const payload = {
            id: rows[0].id,
            expiryTime: "1h",
          };
          jwt.sign(payload, sceretKey, (err: Error, token: string) => {
            if (err) {
              return res.status(500).json({
                messgae: "Internal Server Error",
                error: err,
              });
            }
            res.status(200).json({
              token: token,
            });
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
