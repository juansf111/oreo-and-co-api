# Oreo & Co API

A REST API built with Node.js and Express for the Talento Tech Node.js course final project. This API simulates a pet clothing store backend system.

## Project Overview

This is a learning project that demonstrates:
- REST API design principles
- Authentication using JWT
- Firebase integration
- Express.js middleware usage
- Environment configuration
- Error handling patterns

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase
- **Authentication**: JSON Web Tokens (JWT)
- **Additional Tools**:
  - cors: For handling Cross-Origin Resource Sharing
  - dotenv: For environment variable management

## Project Structure

```
oreo-and-co-api/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Express middlewares
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Helper functions
├── .env               # Environment variables (not in repo)
├── .gitignore
├── index.js          # Application entry point
└── package.json
```

## API Endpoints

- **Authentication**
  - `POST /auth/login` - Admin login

- **Products**
  - `GET /api/products` - Get all products
  - `GET /api/products/:id` - Get single product
  - `POST /api/products/create` - Create product
  - `DELETE /api/products/delete/:id` - Delete product

## Product Data Structure

Products have the following fields:

| Field | Type | 
|-------|------|
| name | string |
| description |
| price | number |
| category | string |
| size | string |
| material | string |
| inStock | boolean |
| images | array |
| tags | array |
| difficulty | string |
| createdAt | timestamp | 
| updatedAt | timestamp |

### Example Product Object
```json
{
  "id": "FC2UbwKy9bJgvjwJZKAO",
  "name": "Winter Dog Sweater",
  "description": "Warm and cozy sweater for cold days",
  "price": 29.99,
  "category": "clothing",
  "size": "medium",
  "material": "wool",
  "inStock": true,
  "images": [
    "https://example.com/sweater1.jpg",
    "https://example.com/sweater2.jpg"
  ],
  "tags": ["winter", "warm", "dog", "sweater"],
  "difficulty": "beginner",
  "createdAt": "2024-01-24T12:00:00Z",
  "updatedAt": "2024-01-24T12:00:00Z"
}
```

## Learning Highlights

- Implementation of JWT authentication
- RESTful API design
- Firebase database integration
- Middleware creation for error handling
- Environment configuration management

## Student Information

- **Name**: Juan Sebastian Fajardo
- **Course**: Node.js - Talento Tech
- **Year**: 2024

## Note

This is an educational project created as part of a learning journey in backend development with Node.js.

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory with the following structure:

```plaintext
# Copy from .env.example and fill with your values
PORT=3000
JWT_SECRET=your-jwt-secret-here
...
```

For security reasons, the actual `.env` file is not included in the repository. Use `.env.example` as a template.
