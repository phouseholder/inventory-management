"use client";

import { useGetProductsQuery } from "@/state/api";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { PageHeader, Rating, CRUDModal } from "../(components)";
import { Product } from "@/models";
import Image from "next/image";
import { useProductCRUD } from "./useProductCRUD";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productEdit, setProductEdit] = useState<Product>();
  const [productDelete, setProductDelete] = useState<Product>();
  const {
    newProduct,
    handleCreateProduct,
    handleDeleteProduct,
    handleUpdateProduct,
  } = useProductCRUD();

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const handleEditOpen = (product: Product) => {
    setProductEdit(product);
    setIsEditOpen(true);
  };

  const handleDeleteOpen = (product: Product) => {
    setProductDelete(product);
    setIsDeleteOpen(true);
  };

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
    <div className="mx-auto pb-5 w-full">
      <PageHeader
        title="Products"
        createText="Create Product"
        createOnClick={() => setIsCreateOpen(true)}
        searchPlaceholder="Search products..."
        searchTerm={searchTerm}
        searchOnChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="border bg-white shadow-lg rounded-md p-4 max-w-full w-full mx-auto border-none"
            >
              <div className="flex flex-row items-center relative">
                <div className="flex absolute top-0 right-0">
                  <Pencil
                    className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer mr-2"
                    onClick={() => handleEditOpen(product)}
                  />
                  <Trash
                    className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDeleteOpen(product)}
                  />
                </div>
                <div className="w-[100] h-[100]">
                  <Image
                    src={`https://s3-ph-inventorymanagement.s3.us-east-2.amazonaws.com/product4.png`}
                    alt={product.name}
                    className="rounded-2xl"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col ml-5">
                  <h3 className="text-lg text-gray-900 font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-gray-800">${product.price.toFixed(2)}</p>
                  <div className="text-sm text-gray-600 mt-1">
                    Stock: {product.stockQuantity}
                  </div>
                  {product.rating && (
                    <div className="flex items-center mt-2">
                      <Rating rating={product.rating} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CRUDModal
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateProduct}
        isOpen={isCreateOpen}
        data={newProduct}
        fieldType="product"
      />

      {productEdit && (
        <CRUDModal
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleUpdateProduct}
          isOpen={isEditOpen}
          data={productEdit}
          fieldType="product"
          isEdit
        />
      )}

      {productDelete && (
        <CRUDModal
          data={productDelete}
          onClose={() => setIsDeleteOpen(false)}
          onSubmit={handleDeleteProduct}
          isOpen={isDeleteOpen}
          fieldType="product"
          isDelete
        />
      )}
    </div>
  );
};

export default Products;
