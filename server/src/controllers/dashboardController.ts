import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
        const popularProducts = await prisma.product.findMany({
            take: 15,
            orderBy: {
                stockQuantity: "desc"
            }
        })
        const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        })
        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        })
        const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        })
        const expenseCategorySummaryRaw = await prisma.expenseCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        })
        const expenseCategory = expenseCategorySummaryRaw.map(
            (item) => ({
                ...item,
                amount: item.amount.toString()
            })
        )

        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseCategory
        });
    } catch(error) {
        res.status(500).json(error);
    }
}