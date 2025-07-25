import ProductModel from '../models/product.model.js';

// Business logic for product operations
class ProductsService {
 // Gets all products with optional filters
 async getAllProducts(filters = {}) {
   try {
     const products = await ProductModel.findAll(filters);
     return products;
   } catch (error) {
     throw error;
   }
 }
 
 // Gets a single product by ID
 async getProductById(productId) {
   try {
     if (!productId || typeof productId !== 'string') {
       const error = new Error('Invalid product ID');
       error.status = 400;
       throw error;
     }
     
     const product = await ProductModel.findById(productId);
     
     if (!product) {
       const error = new Error('Product not found');
       error.status = 404;
       throw error;
     }
     
     return product;
   } catch (error) {
     throw error;
   }
 }
 
 // Creates a new product
 async createProduct(productData) {
   try {
     const errors = this.validateProductData(productData);
     if (errors.length > 0) {
       const error = new Error(`Validation errors: ${errors.join(', ')}`);
       error.status = 400;
       throw error;
     }
     
     const newProduct = {
       name: productData.name,
       description: productData.description,
       price: parseFloat(productData.price),
       category: productData.category,
       size: productData.size || 'medium',
       material: productData.material || 'cotton',
       inStock: productData.inStock !== undefined ? productData.inStock : true,
       images: productData.images || [],
       tags: productData.tags || [],
       difficulty: productData.difficulty || 'beginner'
     };
     
     const createdProduct = await ProductModel.create(newProduct);
     return createdProduct;
   } catch (error) {
     throw error;
   }
 }
 
 // Deletes a product
 async deleteProduct(productId) {
   try {
     await this.getProductById(productId);
     await ProductModel.delete(productId);
     
     return { 
       message: 'Product deleted successfully',
       productId 
     };
   } catch (error) {
     throw error;
   }
 }

 // Validates required product fields
 validateProductData(productData) {
   const errors = [];
   
   if (!productData.name || productData.name.trim() === '') {
     errors.push('Product name is required');
   }
   
   if (!productData.price || isNaN(productData.price) || productData.price <= 0) {
     errors.push('Valid price is required');
   }
   
   if (!productData.category || productData.category.trim() === '') {
     errors.push('Category is required');
   }
   
   return errors;
 }
}

export default new ProductsService();