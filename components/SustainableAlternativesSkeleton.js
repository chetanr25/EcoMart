import React from "react";
import styles from "./SustainableAlternatives.module.css";

const SustainableAlternativesSkeleton = () => (
  <div className="px-6 py-4">
    <div className="flex items-center justify-between mb-3">
      <div className={`h-5 w-32 rounded ${styles.skeleton}`}></div>
      <div className={`h-4 w-16 rounded ${styles.skeleton}`}></div>
    </div>
    <div className="space-y-2">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 w-full"
        >
          <div className="flex space-x-3">
            {/* Image Skeleton */}
            <div
              className={`w-16 h-16 rounded-lg flex-shrink-0 ${styles.skeleton}`}
            ></div>

            {/* Content Skeleton */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div className={`h-4 w-32 rounded ${styles.skeleton}`}></div>
                <div className={`h-4 w-16 rounded ${styles.skeleton}`}></div>
              </div>
              <div className={`h-8 rounded mb-1 ${styles.skeleton}`}></div>
              <div className={`h-6 w-24 rounded-full ${styles.skeleton}`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SustainableAlternativesSkeleton;
