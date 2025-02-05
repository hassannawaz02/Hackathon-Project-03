"use client";

import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import TopHeader from "./TopHeader";
import { NavigationMenuDemo } from "./navigationMenu";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state: any) => state.cart);

  return (
    <div className="fixed z-10 top-0 w-full">
      <TopHeader />
      <header className="text-gray-600 body-font bg-white shadow-md">
        <div className="container mx-auto flex p-3 justify-between items-center px-4 sm:px-6 md:px-8">
          {/* Logo */}
          <h1 className="sm:text-2xl text-xl font-bold text-gray-900">
            SHOP.Co
          </h1>

          {/* Navigation Links for Desktop */}
          <nav className="hidden md:flex md:ml-1 md:mr-10 flex-wrap items-center text-base justify-center space-x-5">
            <Link href={``}>
              <NavigationMenuDemo />
            </Link>
            <Link className="hover:text-gray-900" href={`/top-sell`}>
              On Sale
            </Link>
            <Link className="hover:text-gray-900" href={"/product"}>
              New Arrivals
            </Link>
            <Link className="hover:text-gray-900" href={"/brands"}>
              Brands
            </Link>
          </nav>

          {/* Icons and Search */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Hidden on small screens) */}
            <div className="relative hidden md:block">
              <AiOutlineSearch
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for products..."
                className="bg-gray-100 rounded-lg px-4 py-2 w-[200px] sm:w-[300px] lg:w-[577px] focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* Cart and Profile Icons */}
            <Link href={"/cart"} className="relative">
              <IoCartOutline className="text-4xl " />
              {cart.length > 0 && (
                <span className="absolute top-[-5px] bg-red-400  rounded-full text-white w-[20px] h-[20px] flex justify-center items-center p-1 text-sm right-0">
                  {cart.length}
                </span>
              )}{" "}
            </Link>
            <Link href="/auth">
              <CgProfile
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
                size={24}
              />
            </Link>

            {/* Hamburger Menu Icon for Mobile */}
            <button
              className="text-gray-600 md:hidden flex items-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <nav className="fixed top-0 right-0 bg-white w-64 h-full flex flex-col items-center p-4 space-y-4 shadow-lg transition-transform duration-300">
              <button
                className="self-end text-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                ✖
              </button>
              <Link href="/" className="flex items-center">
                Shop <RiArrowDropDownLine className="text-2xl" />
              </Link>
              <Link href={"/top-sell"} className="hover:text-gray-900">
                On Sale
              </Link>
              <Link href={"/product"} className="hover:text-gray-900">
                New Arrivals
              </Link>
              <Link href={"/brand"} className="hover:text-gray-900">
                Brands
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
