// 1. Static Data Array
let products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
    { id: 4, name: "Product 4", price: 400 },
    { id: 5, name: "Product 5", price: 500 },
];

// 2. Logic for GET (All)
exports.getAllProducts = (req, res) => {
    res.json(products);
};

// 3. Logic for GET (Single)
exports.getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
};

// 4. Logic for POST (Create)
exports.createProduct = (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

// 5. Logic for PUT (Update)
exports.updateProduct = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    res.json(product);
};

// 6. Logic for DELETE
exports.deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Product not found" });
    
    products.splice(index, 1);
    res.json({ message: "Product deleted successfully" });
};