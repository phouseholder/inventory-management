"use client";

import { useGetProductsQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { PageHeader, CRUDModal } from "../(components)";
import { useProductCRUD } from "../products/useProductCRUD";

const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Product Name",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    flex: 1,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    flex: 1,
    type: "number",
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { newProduct, handleCreateProduct } = useProductCRUD();

  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductsQuery(searchTerm);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Inventory"
        createText="Create Product"
        createOnClick={() => setIsCreateOpen(true)}
        searchPlaceholder="Search products..."
        searchTerm={searchTerm}
        searchOnChange={(e) => setSearchTerm(e.target.value)}
      />

      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />

      <CRUDModal
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateProduct}
        isOpen={isCreateOpen}
        data={newProduct}
        fieldType="product"
      />
    </div>
  );
};

export default Inventory;
