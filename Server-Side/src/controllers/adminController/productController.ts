import { NextFunction, Response } from 'express'
import { ExtenedRequest } from '../../commonInterfaces';
import { pool } from '../../database/config/connection';


//* ================================== Admin Unauthorized Check =======================================

const AdminUnauthorizedCheck = (user_role: string, res: Response) => {
    if (user_role !== "admin") {
        res.status(401).json({
            message: 'unauthorized'
        })
    }
}

//* ============================Add Product ========================================

export const AddProduct = async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const { name, desc, price, stockcount } = req.body;
    const { user_role } = req
    console.log({ user_role })
    const productInsertQuery = `INSERT INTO products (name,"desc",price,stockcount) VALUES ($1,$2,$3,$4) RETURNING id `

    try {
        AdminUnauthorizedCheck(user_role, res)
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

//* ============================ Update Product Details ==============================

export const UpdateProduct = async (req: ExtenedRequest, res: Response, next: NextFunction) => {
    const { id, name, desc, price, stockcount } = req.body;
    const { user_role } = req;
    const productUpdateQuery = `UPDATE products SET name=$1 , "desc"=$2 , price=$3 , stockCount=$4 WHERE id=$5`
    try {
        AdminUnauthorizedCheck(user_role, res)
        const { rows } = await pool.query(productUpdateQuery, [name, desc, price, stockcount, id])
        res.status(201).json({
            message: 'Product Updated Successfully'
        })
    } catch (error) {
        next(error)
    }
}
