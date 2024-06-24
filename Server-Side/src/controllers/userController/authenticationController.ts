import { NextFunction, Request, Response } from "express";
import { salt, sceretKey } from "../../Utlis";
import { pool } from "../../database/config/connection";

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
  const insertQuery = `INSERT INTO users (name , email, password, role) VALUES ($1, $2, $3, $4)`;
  try {
    await pool.query(insertQuery, [name, email, hashPassword, role]);

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
  // const hashPassword = bcrypt.hashSync(password, salt);
  const loginQuery = `SELECT id , name , email, password, role FROM users WHERE email=$1`;
  const updateSession = `INSERT INTO session (user_id) VALUES ($1) RETURNING id, created_at`;
  try {
    const { rows } = await pool.query(loginQuery, [email]);

    if (rows.length === 0) {
      res.status(401).json({
        messgae: "no-user found",
      });
    } else {
      const respose = await pool.query(updateSession, [rows[0].id]);
      bcrypt.compare(password, rows[0].password, (_: any, result: any) => {
        if (result) {
          const payload = {
            id: rows[0].id,
            expiryTime: 2,
            role: rows[0].role,
            sessionId: respose.rows[0].id,
            expiryTiming: respose.rows[0].create_at,
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
              sessionId: respose.rows[0].id,
            });
          });
        } else {
          return res.status(500).json({
            message: "email & password doesn't match",
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

//* ================================= Logout ============================================

export const LogoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id, sessionId } = req.body;
  const logoutQuery = `UPDATE session SET archived_at=$1 WHERE user_id=$2 AND id=$3`;

  try {
    await pool.query(logoutQuery, [new Date(), user_id, sessionId]);
    res.status(401).json({
      message: "logged out",
    });
  } catch (error) {
    next(error);
  }
};
