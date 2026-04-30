Assignment: Build Frontend Authentication & Protected Routes (React and  Node) 
Objective 
Create a React frontend for your Product API with authentication, protected  routes, and token-based access using localStorage. 
Requirements 
1. Setup React App 
• Create a new React project  
• Clean folder structure  
• Use:  
o useState 
o useEffect 
o Context API 
o React Router 
2. Pages to Create 
Auth Pages 
• /register 
• /login 
Protected Pages 
• /products → View all products  
• /add-product → Add new product  
• /edit-product/:id → Edit product 
3. Authentication Flow 
Register 
• Create a form:  
o Name  
o Email  
o Password  
• Call: POST /auth/register • On success → redirect to login  
Login 
• Create login form:  
o Email  
o Password  
• Call: POST /auth/login 
On Success: 
• Save token in localStorage localStorage.setItem("token", token) • Redirect to /products 
Logout 
• Remove token: 
localStorage.removeItem("token")
• Redirect to /login 
4. Auth Context (Important) 
Create an AuthContext to manage: 
• Logged-in state  
• Token  
• Login function  
• Logout function  
Responsibilities: 
• Store token in state  
• Sync with localStorage  
• Provide auth data to entire app  
5. Protected Routes 
Create a component: 
ProtectedRoute 
Behavior: 
• Check if token exists in localStorage or context  • If NOT:  
o Redirect to /login 
• If YES:  
o Allow access  
 Protect these routes:
• /products 
• /add-product 
• /edit-product/:id 
6. Products Integration 
Connect frontend with your backend APIs: Fetch Products 
• Endpoint: GET /products 
Add Product 
• Endpoint: POST /products 
Update Product 
• Endpoint: PUT /products/:id Delete Product 
• Endpoint: DELETE /products/:id 
7. Send Token in Requests 
For protected APIs, send token in headers: Authorization: Bearer <token> 
 Example: 
fetch(url, { 
 headers: { 
 Authorization: `Bearer ${token}`  } 
})
8. UI Requirements (Keep it Simple) • Forms for login/register  
• Products list  
• Buttons:  
o Add  
o Edit  
o Delete  
o Logout  
• Basic validation (required fields)  • Show error messages from API  • Redirect user if token expires  • Persist login on page refresh  • Show loading states  
Suggested Folder Structure 
project-root/ 
│ 
├── backend/ 
│ ├── app.js 
│ ├── package.json 
│ ├── .env 
│ │
│ └── src/ 
│ ├── config/ 
│ │ └── db.js 
│ │ 
│ ├── controllers/ 
│ │ ├── authController.js │ │ └── productController.js │ │ 
│ ├── routes/ 
│ │ ├── authRoutes.js │ │ └── productRoutes.js │ │ 
│ ├── middlewares/ │ │ └── authMiddleware.js │ │ 
│ ├── models/ 
│ │ ├── User.js 
│ │ └── Product.js 
│ │ 
│ └── utils/ 
│ └── generateToken.js │ 
│
├── frontend/ 
│ ├── package.json 
│ ├── index.html 
│ │ 
│ └── src/ 
│ ├── components/ │ │ └── ProtectedRoute.jsx │ │ 
│ ├── context/ 
│ │ └── AuthContext.jsx │ │ 
│ ├── pages/ 
│ │ ├── Login.jsx 
│ │ ├── Register.jsx │ │ ├── Products.jsx │ │ ├── AddProduct.jsx │ │ └── EditProduct.jsx │ │ 
│ ├── services/ 
│ │ └── api.js 
│ │ 
│ ├── App.jsx 
│ └── main.jsx
│ 
│ 
├── .gitignore 
├── README.md 
Expected Behavior 
• User registers → logs in  
• Token saved in localStorage  
• Cannot access protected routes without login  • After login → access granted  
• All product APIs work with authentication  
Submission Guidelines 
• Push code to GitHub (public repo) and share link • Deploy the project (Vercel / Netlify)  
• Include screenshots:  
o Register page  
o Login page  
o Products page  
o Protected route redirect 
