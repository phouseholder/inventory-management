"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import {
  Bell,
  Menu,
  Moon,
  PlusCircle,
  Settings,
  Sun,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Popover } from "@mui/material";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between items-center w-full mb-7">
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
        {/* <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div> */}
      </div>

      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <button
              aria-describedby="notifications"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Bell className="cursor-pointer text-gray-500" size={24} />
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
                3
              </span>
            </button>
            <Popover
              id="notifications"
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="flex flex-col">
                <div className="p-5 bg-gray-50">
                  <div className="flex items-center mb-2">
                    <PlusCircle className="w-4 h-4 mr-2 text-green-700" />
                    <h2 className="text-lg font-bold text-gray-700">
                      New Product Added
                    </h2>
                  </div>
                  <p className="text-gray-500">Product X was just added</p>
                </div>
                <hr />
                <div className="p-5 bg-gray-50">
                  <div className="flex items-center mb-2">
                    <PlusCircle className="w-4 h-4 mr-2 text-green-700" />
                    <h2 className="text-lg font-bold text-gray-700">
                      New User Joined
                    </h2>
                  </div>
                  <p className="text-gray-500">
                    John Doe has registered an account
                  </p>
                </div>
                <hr />
                <div className="p-5 bg-gray-50">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 mr-2 text-green-700" />
                    <h2 className="text-lg font-bold text-gray-700">
                      Monthly Sales Reached
                    </h2>
                  </div>
                  <p className="text-gray-500">
                    Monthly Sales Quota has been met
                  </p>
                </div>
              </div>
            </Popover>
          </div>
          <hr className="w-0 h-7 border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9">
              <Image
                src="https://s3-ph-inventorymanagement.s3.us-east-2.amazonaws.com/profile.jpg"
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full h-full object-cover"
              />
            </div>
            <span className="font-semibold">Parker H</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
