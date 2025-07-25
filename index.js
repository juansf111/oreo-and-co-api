import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import productsRoutes from './src/routes/products.routes.js';
import { notFoundHandler, errorHandler } from './src/middlewares/error.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
 origin: '*',
 methods: ['GET', 'POST', 'PUT', 'DELETE'],
 allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'Oreo & Co API',
    description: 'Welcome to the Oreo & Co pet clothing store API',
    version: '1.0.0',
    author: 'Juan Sebastian Fajardo',
    endpoints: {
      health: '/health',
      auth: '/auth/login',
      products: '/api/products'
    },
    documentation: 'https://github.com/yourusername/oreo-and-co-api'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
 res.json({ 
   status: 'OK', 
   message: 'Oreo & Co API is running',
   timestamp: new Date().toISOString()
 });
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/products', productsRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
 console.log(`Oreo & Co API is running on port ${PORT}`);
 console.log(`Health check: http://localhost:${PORT}/health`);
 console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});