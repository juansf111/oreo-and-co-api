import { 
 collection, 
 doc, 
 getDoc, 
 getDocs, 
 addDoc, 
 query, 
 where, 
 limit 
} from 'firebase/firestore';

import { db } from '../config/firebase.config.js';
const COLLECTION_NAME = 'users';

// Handles user database operations
class UserModel {
 // Creates a new user without storing password
 async create(userData) {
   try {
     const { password, ...userDataWithoutPassword } = userData;
     
     const docRef = await addDoc(
       collection(db, COLLECTION_NAME), 
       {
         ...userDataWithoutPassword,
         createdAt: new Date().toISOString()
       }
     );
     
     return {
       id: docRef.id,
       ...userDataWithoutPassword
     };
   } catch (error) {
     throw new Error(`Error creating user: ${error.message}`);
   }
 }
 
 // Finds user by email
 async findByEmail(email) {
   try {
     const q = query(
       collection(db, COLLECTION_NAME), 
       where('email', '==', email),
       limit(1)
     );
     
     const snapshot = await getDocs(q);
     
     if (snapshot.empty) {
       return null;
     }
     
     const userDoc = snapshot.docs[0];
     return {
       id: userDoc.id,
       ...userDoc.data()
     };
   } catch (error) {
     throw new Error(`Error finding user: ${error.message}`);
   }
 }
 
 // Finds user by ID
 async findById(userId) {
   try {
     const docRef = doc(db, COLLECTION_NAME, userId);
     const docSnap = await getDoc(docRef);
     
     if (!docSnap.exists()) {
       return null;
     }
     
     return {
       id: docSnap.id,
       ...docSnap.data()
     };
   } catch (error) {
     throw new Error(`Error finding user: ${error.message}`);
   }
 }
 
 // Checks admin credentials from env
 async validateCredentials(email, password) {
   try {
     if (
       email === process.env.ADMIN_EMAIL && 
       password === process.env.ADMIN_PASSWORD
     ) {
       return {
         id: 'admin-001',
         email: email,
         name: 'Admin User',
         role: 'admin'
       };
     }

     return null;
   } catch (error) {
     throw new Error(`Error validating credentials: ${error.message}`);
   }
 }
}

export default new UserModel();