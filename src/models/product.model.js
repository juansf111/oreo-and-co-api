import { 
 collection, 
 doc, 
 getDoc, 
 getDocs, 
 addDoc, 
 deleteDoc,
 query,
 where,
 orderBy,
 serverTimestamp 
} from 'firebase/firestore';

import { db } from '../config/firebase.config.js';

const COLLECTION_NAME = 'products';

// Handles product database operations
class ProductModel {
 // Creates a new product
 async create(productData) {
   try {
     const productWithTimestamp = {
       ...productData,
       createdAt: serverTimestamp(),
       updatedAt: serverTimestamp()
     };
     
     const docRef = await addDoc(
       collection(db, COLLECTION_NAME), 
       productWithTimestamp
     );
     
     return {
       id: docRef.id,
       ...productWithTimestamp
     };
   } catch (error) {
     throw new Error(`Error creating product: ${error.message}`);
   }
 }
 
 // Gets all products with optional filters
 async findAll(filters = {}) {
   try {
     let productsQuery = collection(db, COLLECTION_NAME);
     
     if (filters.category) {
       productsQuery = query(productsQuery, where('category', '==', filters.category));
     }
     
     if (filters.inStock !== undefined) {
       productsQuery = query(productsQuery, where('inStock', '==', filters.inStock));
     }
     
     productsQuery = query(productsQuery, orderBy('createdAt', 'desc'));
     
     const snapshot = await getDocs(productsQuery);
     
     const products = [];
     snapshot.forEach((doc) => {
       products.push({
         id: doc.id,
         ...doc.data()
       });
     });
     
     return products;
   } catch (error) {
     throw new Error(`Error fetching products: ${error.message}`);
   }
 }
 
 // Gets a product by ID
 async findById(productId) {
   try {
     const docRef = doc(db, COLLECTION_NAME, productId);
     const docSnap = await getDoc(docRef);
     
     if (!docSnap.exists()) {
       return null;
     }
     
     return {
       id: docSnap.id,
       ...docSnap.data()
     };
   } catch (error) {
     throw new Error(`Error fetching product: ${error.message}`);
   }
 }
 
 // Deletes a product
 async delete(productId) {
   try {
     const docRef = doc(db, COLLECTION_NAME, productId);
     await deleteDoc(docRef);
     return true;
   } catch (error) {
     throw new Error(`Error deleting product: ${error.message}`);
   }
 }
}

export default new ProductModel();