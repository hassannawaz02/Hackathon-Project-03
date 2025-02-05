"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { BreadcrumbCollapsed } from "@/components/Breadcrupm";
import Paginationpage from "@/components/Pagination";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  discountPercent?: number;
  new?: boolean;
  category: string;
  colors: string[];
  sizes: string[];
}

export default function Casualpage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{
    category: string;
    priceRange: [number, number];
    colors: string[];
    sizes: string[];
  }>({
    category: "",
    priceRange: [50, 200],
    colors: [],
    sizes: [],
  });

  useEffect(() => {
    async function fetchProducts() {
      const data = await client.fetch(`
        *[_type == "product"]{
          _id,
          name,
          price,
          description,
          image {
            asset -> {
              url
            }
          },
          discountPercent,
          new,
          category,
          colors,
          sizes
        }[1...12]
      `);
      setProducts(data);
      setFilteredProducts(data);
    }
    fetchProducts();
  }, []);

  let star = [
    <FaStar key={1} />,
    <FaStar key={2} />,
    <FaStar key={3} />,
    <FaStar key={4} />,
    <FaStar key={5} />,
  ];

  useEffect(() => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => filters.colors.includes(color))
      );
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (type: keyof typeof filters, value: any) => {
    if (type === "colors" || type === "sizes") {
      setFilters((prev) => ({
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value],
      }));
    } else if (type === "priceRange") {
      setFilters((prev) => ({
        ...prev,
        priceRange: value,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  return (
    <div className="mt-20 md:mt-28 lg:mt-32 max-w-screen-2xl pt-2 mx-auto">
      <BreadcrumbCollapsed />
      <div className="flex flex-col items-center md:flex-row p-5 justify-center md:items-start md:space-x-4 mt-5">
        <div className="w-full md:w-1/2 lg:w-1/4 bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="mb-6 border-b-[1px] border-black">
            <h4 className="font-medium mb-2">Categories</h4>
            <ul className="text-gray-600 space-y-1 mb-5">
              {["tshirt", "short", "jeans", "hoodie", "shirt"].map(
                (category) => (
                  <li
                    key={category}
                    className={`cursor-pointer ${
                      filters.category === category ? "font-bold" : ""
                    }`}
                    onClick={() => handleFilterChange("category", category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="mb-11 border-b-[1px] border-black pb-11">
            <h4 className="font-medium mb-2">Price</h4>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">
                ${filters.priceRange[0]}
              </span>
              <input
                type="range"
                className="w-full"
                min="50"
                max="200"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    filters.priceRange[0],
                    parseInt(e.target.value, 10),
                  ])
                }
              />
              <span className="text-gray-600 text-sm">
                ${filters.priceRange[1]}
              </span>
            </div>
          </div>
          <div className="mb-6 border-b-[1px] border-black pb-11">
            <h4 className="font-medium mb-2">Colors</h4>
            <div className="flex flex-wrap gap-2">
              {["Red", "Green", "Blue", "Orange", "Yellow", "Purple", "Pink", "White", "Black", "Cyan"].map(
                (color) => (
                  <div
                    key={color}
                    className={`w-[37px] h-[37px] active:outline rounded-full flex justify-center items-center`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleFilterChange("colors", color)}
                  ></div>
                )
              )}
            </div>
          </div>
          <div className="mb-6 border-b-[1px] border-black pb-11">
            <h4 className="font-medium mb-2">Sizes</h4>
            <div className="flex flex-wrap gap-2">
              {["M", "XXL", "XL", "L", "S"].map((size) => (
                <button
                  key={size}
                  className={`border px-2 py-1 rounded ${
                    filters.sizes.includes(size) ? "bg-black text-white" : ""
                  }`}
                  onClick={() => handleFilterChange("sizes", size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            className="w-full mt-6 bg-black text-white py-2 rounded-lg"
            onClick={() =>
              setFilters({
                category: "",
                priceRange: [50, 200],
                colors: [],
                sizes: [],
              })
            }
          >
            Reset Filters
          </button>
        </div>
        <div className="w-full md:w-[900px] 2xl:w-full h-full mt-3 md:mt-0 border-b">
          <div className="w-full h-full">
            <h1 className="text-[25px] font-bold relative pl-5">
              Casual
              <span className="text-sm font-bold flex items-center justify-center absolute right-10 top-2">
                Most Popular <RiArrowDropDownLine />
              </span>
            </h1>
            <div className="grid gap-3 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:p-0 place-items-center">
              {filteredProducts.map((data: any, index) => (
                <div className="mt-1" key={index}>
                  <Link href={`/product/${data._id}`}>
                    <div className="w-[160px] md:w-[240px] lg:w-[290px] h-[160px] md:h-[240px] lg:h-[290px] bg-[#F0EEED] rounded-[20px]">
                      <Image
                        src={urlFor(data.image).url()}
                        alt={data.name}
                        className="w-full h-full rounded-[20px]"
                        width={1000}
                        height={1000}
                      />
                    </div>
                  </Link>
                  <div>
                    <p className="text-sm md:text-lg mt-2 sm:font-bold">
                      {data.name}
                    </p>
                    <div className="flex text-yellow-400">
                      {star.map((icon, index) => (
                        <span key={index}>{icon}</span>
                      ))}
                    </div>
                    <p className="font-bold mt-1">
                      ${data.price}
                      {data.discountPercent > 0 && (
                        <span className="text-gray-400 font-bold line-through ml-2">
                          $
                          {(
                            (data.price * (100 - data.discountPercent)) /
                            100
                          ).toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Paginationpage />
    </div>
  );
}