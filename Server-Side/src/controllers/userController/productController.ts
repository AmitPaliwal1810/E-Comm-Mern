import { NextFunction, Response } from "express";
import { ExtenedRequest } from "../../commonInterfaces";
import { pool } from "../../database/config/connection";

export const getAllProducts = async(req: ExtenedRequest , res: Response, next: NextFunction) => {
    const getProductQuery = `SELECT id, name , "desc", createAt from products`;
    try {
        const {rows} = await pool.query(getProductQuery)
        res.status(200).json({
            products: rows
        })
    } catch (error) {
        next(error)
    }
}