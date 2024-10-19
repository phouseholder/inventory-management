import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Product, SalesSummary, PurchaseSummary, ExpenseSummary, ExpenseCategory } from '@/models'

export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseCategory: ExpenseCategory[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products", "Users"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search) => ({ 
                url: "/products", 
                params: search ? { search } : {}
            }),
            providesTags: ["Products"]
        }),
        createProduct: build.mutation<Product, Omit<Product, 'productId'>>({
            query: (newProduct) => ({ 
                url: "/products", 
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["Products"]
        }),
        getUsers: build.query<User[], string | void>({
            query: (search) => ({ 
                url: "/users", 
                params: search ? { search } : {}
            }),
            providesTags: ["Users"]
        }),
    })
})

export const {
    useGetDashboardMetricsQuery,
    useGetProductsQuery,
    useCreateProductMutation,
    useGetUsersQuery,
} = api