"use client";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/state/api";
import { Pencil, PlusCircle, SearchIcon, Trash } from "lucide-react";
import { useState } from "react";
import { Rating } from "../(components)";
import ProductCRUDModal from "./ProductCRUDModal";
import { Product } from "@/models";
import Image from "next/image";
import { v4 } from "uuid";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productEdit, setProductEdit] = useState<Product>();
  const [productDelete, setProductDelete] = useState<Product>();

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const newProduct: Product = {
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  };

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleEditOpen = (product: Product) => {
    setProductEdit(product);
    setIsEditOpen(true);
  };

  const handleDeleteOpen = (product: Product) => {
    setProductDelete(product);
    setIsDeleteOpen(true);
  };

  const handleDeleteProduct = async (productData: Product) => {
    await deleteProduct(productData);
  };

  const handleUpdateProduct = async (productData: Product) => {
    await updateProduct(productData);
  };

  const handleCreateProduct = async (
    productData: Omit<Product, "productId">
  ) => {
    await createProduct(productData);
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
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Products</h1>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsCreateOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2 !text-gray-200" /> Create Product
        </button>
      </div>

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

      <ProductCRUDModal
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateProduct}
        isOpen={isCreateOpen}
        data={newProduct}
      />

      {productEdit && (
        <ProductCRUDModal
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleUpdateProduct}
          isOpen={isEditOpen}
          data={productEdit}
          isEdit
        />
      )}

      {productDelete && (
        <ProductCRUDModal
          data={productDelete}
          onClose={() => setIsDeleteOpen(false)}
          onSubmit={handleDeleteProduct}
          isOpen={isDeleteOpen}
          isDelete
        />
      )}
    </div>
  );
};

export default Products;
