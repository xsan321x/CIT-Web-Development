const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Product API is running' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is missing in .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log('MongoDB connected');

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
      } else {
        console.error('Server failed to start:', error.message);
      }

      process.exit(1);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
