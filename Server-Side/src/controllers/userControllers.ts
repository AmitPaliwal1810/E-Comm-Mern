import { NextFunction, Request, Response } from "express";
import { salt } from "../Utlis";
import { pool } from "../database/config/connection";

const bcrypt = require("bcrypt");

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
