import AuthService from '../services/auth.service.js';

// Handles authentication endpoints
class AuthController {
 // POST /auth/login - Returns JWT token
 async login(req, res, next) {
   try {
     const { email, password } = req.body;
     
     const authResult = await AuthService.login(email, password);
     
     res.status(200).json({
       success: true,
       message: 'Login successful',
       data: {
         user: authResult.user,
         token: authResult.token,
         tokenType: authResult.tokenType
       }
     });
   } catch (error) {
     next(error);
   }
 }
}

export default new AuthController();