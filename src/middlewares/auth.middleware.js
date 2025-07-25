import { verifyToken, extractTokenFromHeader } from '../utils/jwt.utils.js';

// Validates JWT tokens on protected routes
export const authenticateToken = (req, res, next) => {
 try {
   const authHeader = req.headers['authorization'];
   const token = extractTokenFromHeader(authHeader);
   
   if (!token) {
     return res.status(401).json({
       success: false,
       error: {
         message: 'Access token required',
         status: 401
       }
     });
   }
   
   const decoded = verifyToken(token);
   req.user = decoded;
   next();
 } catch (error) {
   return res.status(403).json({
     success: false,
     error: {
       message: error.message || 'Invalid or expired token',
       status: 403
     }
   });
 }
};

// Restricts access to admin users only
export const requireAdmin = (req, res, next) => {
 if (!req.user || req.user.role !== 'admin') {
   return res.status(403).json({
     success: false,
     error: {
       message: 'Admin access required',
       status: 403
     }
   });
 }
 
 next();
};