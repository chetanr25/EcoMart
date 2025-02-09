import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createProduct = async (productData) => {
  try {
    const firestoreData = {
      "company-head": {
        "company-name": productData["company-head"]["company-name"],
        "owner-email": productData["company-head"]["owner-email"],
        "owner-name": productData["company-head"]["owner-name"],
        "phone-no": productData["company-head"]["phone-no"],
      },
      certification: productData.certification,
      product: {
        name: productData.product.name,
        category: productData.product.category,
        description: productData.product.description,
        brand: productData.product.brand,
        price: productData.product.price,
        product_link: productData.product.product_link,
        image_url: productData.product.image_url,
      },
      tags: productData.tags,
      status: "disapproved",
      createdAt: serverTimestamp(),
    };

    const collectionRef = collection(db, "eco-products");
    const docRef = await addDoc(collectionRef, firestoreData);

    return {
      success: true,
      productId: docRef.id,
      message: "Product created successfully",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error.message || "Failed to create product",
    };
  }
};
