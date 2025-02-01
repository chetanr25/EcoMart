import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

export const getAllProducts = async () => {
  try {
    const collectionRef = collection(db, 'eco-products');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      success: true,
      products,
      message: 'Products fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      products: [],
      error: error.message || 'Failed to fetch products'
    };
  }
};

export const getProductsByStatus = async(status = 'disapproved') => {
    try {
      const collectionRef = collection(db, 'eco-products');
      const q = query(
        collectionRef, 
        where('status', '==', status)
      );
      
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return {
        success: true,
        products,
        message: `Products with status ${status} fetched successfully`
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        products: [],
        error: error.message || 'Failed to fetch products'
      };
    }
}; 