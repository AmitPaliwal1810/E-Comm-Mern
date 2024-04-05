import { NextFunction, Response } from "express";
import { ExtenedRequest } from "../../commonInterfaces";
import { pool } from "../../database/config/connection";

export const getAllProducts = async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const { page, limit } = req.query;
    const getProductQuery = `SELECT id, name , "desc", createAt from products LIMIT $1 OFFSET $2`;
    try {
        const { rows } = await pool.query(getProductQuery, [limit ?? 10, page ?? 0])

        res.status(200).json({
            products: rows
        })
    } catch (error) {
        next(error)
    }
}

export const buyProducts = async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const { productId, quantity } = req.body;
    const { user_id } = req

    const insertUserOrderQuery = `INSERT INTO userOrders (user_id , product_id)  VALUES ($1, $2)`
    const getProductDetailsQuery = `SELECT stockcount FROM products WHERE id=$1`
    const updateProductQuantityQuery = `UPDATE products SET stockcount=$1 WHERE id=$2`

    try {
        const { rows } = await pool.query(getProductDetailsQuery, [productId])
        if (rows.length) {
            const qty = parseInt(rows[0].stockcount) - quantity;
            await pool.query(updateProductQuantityQuery, [qty, productId])
            await pool.query(insertUserOrderQuery, [user_id, productId])
            res.status(200).json({
                message: 'buy successfully'
            })
        } else {
            res.status(400).json({
                error: 'no-product found'
            })
        }
    } catch (error) {
        next(error)
    }
}