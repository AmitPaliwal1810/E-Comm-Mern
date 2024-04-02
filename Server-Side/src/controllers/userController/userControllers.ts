import { NextFunction, Request, Response } from "express";
import { pool } from "../../database/config/connection";
import { ExtenedRequest } from "../../commonInterfaces";

//* ============================================ GetUserDetails ====================================================

export const GetUserDetails = async (
  req: ExtenedRequest,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req;
  const UserDetailsQuery = `SELECT id, name, email FROM users WHERE id=$1`;
  try {
    const { rows } = await pool.query(UserDetailsQuery, [user_id]);
    res.status(200).json({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      role: rows[0].role,
    });
  } catch (error) {
    next(error);
  }
};