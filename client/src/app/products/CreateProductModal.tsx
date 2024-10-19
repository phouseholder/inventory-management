import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import { Product } from "@/models";

type ICreateProductModal = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: Omit<Product, "productId">) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: ICreateProductModal) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelStyles = "block text-sm font-medium text-gray-700";
  const inputStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h1 className="text-2xl font-semibold text-gray-700">
          Create New Product
        </h1>
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="Name" className={labelStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputStyles}
            required
          />

          <label htmlFor="Price" className={labelStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            value={formData.price}
            className={inputStyles}
            required
          />

          <label htmlFor="stockQuantity" className={labelStyles}>
            Price
          </label>
          <input
            type="number"
            name="stockQuantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputStyles}
            required
          />

          <label htmlFor="rating" className={labelStyles}>
            Price
          </label>
          <input
            type="number"
            name="rating"
            onChange={handleChange}
            value={formData.rating}
            className={inputStyles}
            required
          />

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
