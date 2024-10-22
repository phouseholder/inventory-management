import { PlusCircle, SearchIcon } from "lucide-react";
import React, { ChangeEvent } from "react";

type IPageHeader = {
  title: string;
  createText: string;
  createOnClick: () => void;
  searchPlaceholder: string;
  searchTerm: string;
  searchOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PageHeader = ({
  title,
  createText,
  createOnClick,
  searchPlaceholder,
  searchTerm,
  searchOnChange,
}: IPageHeader) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={createOnClick}
        >
          <PlusCircle className="w-5 h-5 mr-2 !text-gray-200" /> {createText}
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder={searchPlaceholder}
            type="text"
            value={searchTerm}
            onChange={searchOnChange}
          />
        </div>
      </div>
    </>
  );
};

export default PageHeader;
