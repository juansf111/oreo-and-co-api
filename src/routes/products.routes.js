import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

// All routes require authentication

// GET /api/products
router.get('/', authenticateToken, ProductsController.getAllProducts);

// GET /api/products/:id
router.get('/:id', authenticateToken, ProductsController.getProductById);

// POST /api/products/create
router.post('/create', authenticateToken, ProductsController.createProduct);

// DELETE /api/products/delete/:id
router.delete('/delete/:id', authenticateToken, ProductsController.deleteProduct);

export default router;