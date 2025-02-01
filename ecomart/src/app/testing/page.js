"use client"

import { getProductsByStatus } from "@/api/products/fetch";
import { useState } from "react";

export default function TestingPage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const getProductsByStatusFunction = async () => {
        try {
            const result = await getProductsByStatus('disapproved');
            console.log(result);
            if (result.success) {
                setProducts(result.products);
                setError(null);
            } else {
                setError(result.error);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(error.message);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Testing Page</h1>
            <button 
                onClick={getProductsByStatusFunction}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Fetch Disapproved Products
            </button>

            {error && (
                <div className="text-red-500 mt-4">
                    Error: {error}
                </div>
            )}

            {products.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Products:</h2>
                    {products.map(product => (
                        <div key={product.id} className="border p-4 mb-2 rounded">
                            <h3 className="font-bold">{product.product?.name}</h3>
                            <p>Status: {product.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
