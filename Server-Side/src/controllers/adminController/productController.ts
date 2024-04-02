import { NextFunction, Response } from 'express'
import { ExtenedRequest } from '../../commonInterfaces';
import { pool } from '../../database/config/connection';

//* ============================Add Product ========================================

export const AddProduct = async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const { name, desc, price, stockcount } = req.body;
    const { user_role } = req
    console.log({user_role})
    const productInsertQuery = `INSERT INO products (name , desc , price , stockcount) VALUES ($1,$2,$3,$4)`

    try {
        if (user_role !== "admin") {
            res.status(401).json({
                message: 'unauthorized'
            })
        }
        const { rows } = await pool.query(productInsertQuery, [name, desc, price, stockcount])
        if (rows.length === 0) {
            res.status(500).json({
                message: 'unable to register product'
            })
        }
        res.status(201).json({
            message: 'product registered successfully'
        })
    } catch (error) {
        next(error)
    }

}