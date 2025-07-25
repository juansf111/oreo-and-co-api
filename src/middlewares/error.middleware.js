// Handles 404 errors
export const notFoundHandler = (req, res, next) => {
 const error = new Error(`Route not found: ${req.originalUrl}`);
 error.status = 404;
 next(error);
};

// Global error handler
export const errorHandler = (err, req, res, next) => {
 console.error('Error:', {
   message: err.message,
   stack: err.stack,
   timestamp: new Date().toISOString()
 });

 const statusCode = err.status || err.statusCode || 500;
 const errorResponse = {
   success: false,
   error: {
     message: err.message || 'Internal server error',
     status: statusCode
   }
 };

 // Include stack trace in dev mode
 if (process.env.NODE_ENV === 'development') {
   errorResponse.error.stack = err.stack;
 }
 
 res.status(statusCode).json(errorResponse);
};