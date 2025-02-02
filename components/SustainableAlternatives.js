import React, { useState } from "react";
import styles from "./SustainableAlternatives.module.css";

const ProductImage = ({ src, alt }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-md">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-8 h-8 object-cover rounded-md"
      onError={handleImageError}
    />
  );
};

const SustainableCard = ({ alternative }) => (
  <div
    className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 w-full ${styles.card}`}
    onClick={() => window.open(alternative.product.product_link, "_blank")}
  >
    <div className="p-2.5 flex items-start space-x-2">
      {/* Left side - Image */}
      <div className="flex-shrink-0">
        <div
          className={`w-12 h-12 rounded-md overflow-hidden ${styles.imageWrapper}`}
        >
          <ProductImage
            src={alternative.product.image_url}
            alt={alternative.product.name}
          />
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex-1 min-w-0">
        {/* Product Title & Price */}
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-xs text-gray-900 truncate pr-2">
            {alternative.product.name}
          </h3>
          <p className="text-xs font-semibold text-green-600 whitespace-nowrap">
            ₹{alternative.product.price}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 my-0.5">
          {alternative.product.description}
        </p>

        {/* View Button */}
        <button
          className={`text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full 
            hover:bg-green-100 transition-colors flex items-center gap-0.5 mt-1 ${styles.viewButton}`}
          onClick={(e) => {
            e.stopPropagation();
            window.open(alternative.product.product_link, "_blank");
          }}
        >
          View Product
          <svg
            className={`w-2.5 h-2.5 ${styles.arrowIcon}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const SustainableAlternatives = ({ alternatives }) => {
  if (!alternatives?.length) return null;

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-900">Sustainable</h2>
        <span className="text-[10px] text-gray-500">
          {alternatives.length} found
        </span>
      </div>
      <div className="space-y-1.5">
        {alternatives.slice(0, 2).map((alternative) => (
          <SustainableCard key={alternative.id} alternative={alternative} />
        ))}
      </div>
    </div>
  );
};

export default SustainableAlternatives;
