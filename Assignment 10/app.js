const express = require('express');
const app = express();
const productRoutes = require('./src/routes/productRoutes');

// This allows the app to read JSON data from requests
app.use(express.json());

// Set up the routes
app.use('/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});