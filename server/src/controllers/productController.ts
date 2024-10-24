import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        })
        res.json(products);
    } catch(error) {
        res.status(500).json(error);
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = await prisma.product.create({
            data: {
                productId, 
                name, 
                price, 
                rating, 
                stockQuantity
            }
        })
        res.status(201).json(product);
    } catch(error) {
        res.status(500).json(error);
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = await prisma.product.update({
            where: {
                productId
            },
            data: {
                name, 
                price, 
                rating,
                stockQuantity
            },
        })
        res.status(201).json(product);
    } catch(error) {
        res.status(500).json(error);
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.body;
        const product = await prisma.product.delete({
            where: {
                productId
            },
        })
        res.status(201).json(product);
    } catch(error) {
        res.status(500).json(error);
    }
}