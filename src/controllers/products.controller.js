import productsService from '../services/products.service.js';

// Handles product CRUD operations
class ProductsController {
 // GET /api/products
 async getAllProducts(req, res, next) {
   try {
     const filters = {
       category: req.query.category,
       inStock: req.query.inStock === 'true' ? true : 
                req.query.inStock === 'false' ? false : undefined
     };
     
     const products = await productsService.getAllProducts(filters);
     
     res.status(200).json({
       success: true,
       count: products.length,
       data: products
     });
   } catch (error) {
     next(error);
   }
 }
 
 // GET /api/products/:id
 async getProductById(req, res, next) {
   try {
     const { id } = req.params;
     
     const product = await productsService.getProductById(id);
     
     res.status(200).json({
       success: true,
       data: product
     });
   } catch (error) {
     next(error);
   }
 }
 
 // POST /api/products/create
 async createProduct(req, res, next) {
   try {
     const productData = req.body;
     
     const newProduct = await productsService.createProduct(productData);
     
     res.status(201).json({
       success: true,
       message: 'Product created successfully',
       data: newProduct
     });
   } catch (error) {
     next(error);
   }
 }
 
 // DELETE /api/products/:id
 async deleteProduct(req, res, next) {
   try {
     const { id } = req.params;
     
     const result = await productsService.deleteProduct(id);
     
     res.status(200).json({
       success: true,
       message: result.message
     });
   } catch (error) {
     next(error);
   }
 }
}

export default new ProductsController();