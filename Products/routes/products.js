const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const products = require('../data/products');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../errors/customErrors');

// GET /api/products?category=&page=&limit= - List products with optional filtering and pagination
router.get('/', (req, res) => {
  let filteredProducts = products;
  const { category, page = 1, limit = 10 } = req.query;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    page: Number(page),
    limit: Number(limit),
    total: filteredProducts.length,
    data: paginatedProducts,
  });
});

// GET /api/products/:id - Get a product by ID
router.get('/:id', (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST /api/products - Create new product
router.post('/', auth, validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update existing product
router.put('/:id', auth, validateProduct, (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));

  const { name, description, price, category, inStock } = req.body;

  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.inStock = inStock;

  res.json(product);
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', auth, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  products.splice(index, 1);
  res.status(204).send();
});

// GET /api/products/search?q= - Search products by name
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );
  res.json(results);
});

// GET /api/products/stats - Get product counts by category
router.get('/stats', (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
});

module.exports = router;
