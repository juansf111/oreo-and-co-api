import UserModel from '../models/user.model.js';
import { generateToken } from '../utils/jwt.utils.js';

// Handles authentication logic
class AuthService {
 // Authenticates user and returns JWT token
 async login(email, password) {
   try {
     if (!email || !password) {
       const error = new Error('Email and password are required');
       error.status = 400;
       throw error;
     }
     
     const user = await UserModel.validateCredentials(email, password);
     
     if (!user) {
       const error = new Error('Invalid email or password');
       error.status = 401;
       throw error;
     }
     
     const token = generateToken({
       id: user.id,
       email: user.email,
       name: user.name,
       role: user.role || 'user'
     });
     
     return {
       user: {
         id: user.id,
         email: user.email,
         name: user.name,
         role: user.role
       },
       token: token,
       tokenType: 'Bearer'
     };
   } catch (error) {
     throw error;
   }
 }
}

export default new AuthService();