import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const query = {
            where: {
                OR: [
                    {
                        userId: {
                            contains: search
                        }
                    },
                    {
                        name: {
                            contains: search
                        }
                    },
                    {
                        email: {
                            contains: search
                        }
                    },
                ]
            }
        }

        const users = await prisma.user.findMany(search ? query : undefined)
        res.json(users);
    } catch(error) {
        res.status(500).json(error);
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, name, email } = req.body;
        const user = await prisma.user.create({
            data: {
                userId, 
                name, 
                email
            }
        })
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json(error);
    }
}