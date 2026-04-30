# Assignment 13 – Authentication & Protected Product API

## Overview

This project extends the previous Product CRUD API by adding user authentication and route protection using JWT.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt
* jsonwebtoken

## Project Structure

project-root/
├── app.js
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js

## User Model

Fields:

* name: String (required)
* email: String (required, unique)
* password: String (required, hashed)

## Authentication APIs

### Register User

POST /auth/register

* Validates input
* Hashes password using bcrypt
* Stores user in database

### Login User

POST /auth/login

* Validates credentials
* Compares password using bcrypt
* Returns JWT token on success

## JWT Implementation

* Token contains user ID
* Expiration set to 1 day
* Secret stored in environment variable

## Authentication Middleware

File: src/middlewares/authMiddleware.js

Responsibilities:

* Extract token from header:
  Authorization: Bearer <token>
* Verify token
* Decode user data
* Attach user to req.user
* Return 401 if invalid or missing

## Protected Routes

### Protected:

* POST /api/products
* PUT /api/products/:id
* DELETE /api/products/:id

### Public:

* GET /api/products
* GET /api/products/:id

## Expected Behavior

* User registers → stored in database
* User logs in → receives JWT token
* Protected routes:

  * Without token → 401 Unauthorized
  * With valid token → Access granted

## Error Handling

* try/catch used in all controllers
* Status codes:

  * 200 → success
  * 201 → created
  * 400 → bad request
  * 401 → unauthorized
  * 404 → not found
  * 500 → server error

## Testing Steps

1. Register a user
2. Login and copy JWT token
3. Add token in headers:
   Authorization: Bearer <token>
4. Test:

   * Create product (should work)
   * Update product (should work)
   * Delete product (should work)
5. Test without token:

   * Should return 401 Unauthorized

## How to Run

1. Install dependencies:
   npm install

2. Create .env file:
   MONGO_URI=your_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000

3. Start server:
   npm start

## Notes

* Authentication added without breaking existing CRUD APIs
* Code kept simple and readable
* No unnecessary libraries used
