import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const createProduct = async (productData) => {
  try {
    const collectionRef = collection(db, 'eco-products');
    const docRef = await addDoc(collectionRef, {
      ...productData,
      status: 'disapproved',
      createdAt: serverTimestamp()
    });

    return {
      success: true,
      productId: docRef.id,
      message: 'Product created successfully'
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: error.message || 'Failed to create product'
    };
  }
}; 