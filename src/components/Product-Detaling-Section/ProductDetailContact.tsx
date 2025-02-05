import React from "react";
import {
  FaTshirt,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaWeightHanging,
  FaRecycle,
  FaTag,
  FaUserAlt,
  FaPalette,
} from "react-icons/fa";
export type SpecItem = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const specsData: SpecItem[] = [
  {
    label: "Material",
    value: "Organic Cotton Blend",
    icon: <FaTshirt className="text-xl text-indigo-600" />,
  },
  {
    label: "Care Instructions",
    value: "Machine wash cold, tumble dry low",
    icon: <FaInfoCircle className="text-xl text-green-600" />,
  },
  {
    label: "Design Feature",
    value: "Minimalist Printed Pattern",
    icon: <FaTag className="text-xl text-yellow-600" />,
  },
  {
    label: "Available Colors",
    value: "Charcoal Gray, Olive Green, Sky Blue",
    icon: <FaPalette className="text-xl text-purple-600" />,
  },
  {
    label: "Weight",
    value: "250g (Lightweight)",
    icon: <FaWeightHanging className="text-xl text-red-600" />,
  },
  {
    label: "Size Options",
    value: "XS, S, M, L, XL, XXL",
    icon: <FaUserAlt className="text-xl text-blue-600" />,
  },
  {
    label: "Eco-Friendly Packaging",
    value: "Biodegradable Materials",
    icon: <FaRecycle className="text-xl text-teal-600" />,
  },
  {
    label: "Country of Origin",
    value: "Made in Portugal",
    icon: <FaMapMarkerAlt className="text-xl text-orange-600" />,
  },
];

const ProductDetails = () => {
  return (
    <section className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-8">
      <h2 className="text-4xl font-semibold text-gray-900 text-center mb-8">
        Product Details
      </h2>
      <div className="space-y-6">
        {specsData.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-5 px-7 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Icon with Label */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{item.icon}</div>
              <p className="text-lg text-gray-700 font-medium">{item.label}</p>
            </div>

            {/* Value */}
            <p className="text-lg text-gray-900 font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Product Details Footer */}
      <div className="border-t pt-6 text-center">
        <p className="text-sm text-gray-500">
          All product details are carefully crafted to give you the best
          shopping experience. Enjoy shopping with us!
        </p>
      </div>
    </section>
  );
};

export default ProductDetails;
