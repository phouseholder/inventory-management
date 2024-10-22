import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Product } from "@/models";

type ICRUDModal = {
  data: any;
  fieldType: "product" | "user";
  isDelete?: boolean;
  isEdit?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
};

const CRUDModal = ({
  data,
  fieldType,
  isDelete = false,
  isEdit = false,
  isOpen,
  onClose,
  onSubmit,
}: ICRUDModal) => {
  const [formData, setformData] = useState<any>(data);

  const inputs = fields[fieldType];

  //reset the data anytime the modal is reopened
  useEffect(() => setformData(data), [isOpen]);

  const renderFields = () => {
    if (isDelete)
      return (
        <div className="mt-5 mb-5 justify-start">
          <p className="text-gray-500">
            Are you sure you want to delete{" "}
            <span className="font-bold">{data.name}</span>?
          </p>
        </div>
      );
    return isEdit
      ? inputs.map(({ name, type, label }) => (
          <>
            <label htmlFor="Name" className={labelStyles}>
              {label}
            </label>
            <input
              type={type}
              name={name}
              onChange={handleChange}
              defaultValue={data[name]}
              className={inputStyles}
              required
            />
          </>
        ))
      : inputs.map(({ name, type, label }) => (
          <>
            <label htmlFor="Name" className={labelStyles}>
              {label}
            </label>
            <input
              type={type}
              name={name}
              onChange={handleChange}
              value={formData[name]}
              className={inputStyles}
              required
            />
          </>
        ));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelStyles = "mb-1 block text-sm font-medium text-gray-700";
  const inputStyles =
    "block bg-white w-full mb-3 p-2 border-gray-300 border-2 focus:border-gray-500 focus:border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md bg-white">
        <h1 className="text-2xl font-semibold text-gray-700">
          {`${isDelete ? "Delete" : isEdit ? "Edit" : "Create New"} Product`}
        </h1>
        <form onSubmit={handleSubmit} className="mt-5">
          {renderFields()}
          <div className="flex flex-row items-center mt-4 justify-end">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 font-bold text-gray-700 rounded hover:bg-gray-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`ml-2 px-4 py-2 bg-${
                isDelete ? "red" : "blue"
              }-500 text-white rounded hover:bg-${
                isDelete ? "red" : "blue"
              }-700`}
            >
              {isDelete ? "Delete" : isEdit ? "Edit" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const fields = {
  product: [
    { name: "name", type: "text", label: "Product Name" },
    { name: "price", type: "number", label: "Price" },
    { name: "stockQuantity", type: "number", label: "Stock Quantity" },
    { name: "rating", type: "number", label: "Rating" },
  ],
  user: [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "text", label: "Email" },
  ],
};

export default CRUDModal;
