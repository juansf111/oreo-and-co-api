import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Generates JWT token for users
export const generateToken = (payload) => {
 return jwt.sign(
   payload,
   JWT_SECRET,
   { 
     expiresIn: JWT_EXPIRES_IN,
     issuer: 'oreo-and-co-api'
   }
 );
};

// Verifies and decodes JWT token
export const verifyToken = (token) => {
 try {
   return jwt.verify(token, JWT_SECRET);
 } catch (error) {
   if (error.name === 'TokenExpiredError') {
     throw new Error('Token has expired');
   } else if (error.name === 'JsonWebTokenError') {
     throw new Error('Invalid token');
   }
   throw error;
 }
};

// Extracts token from Authorization header
export const extractTokenFromHeader = (authHeader) => {
 if (!authHeader || !authHeader.startsWith('Bearer ')) {
   return null;
 }
 return authHeader.substring(7);
};