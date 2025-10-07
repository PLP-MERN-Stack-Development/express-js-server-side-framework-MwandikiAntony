function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  if (typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Price must be a non-negative number' });
  }
  if (typeof category !== 'string' || category.trim() === '') {
    return res.status(400).json({ error: 'Category is required and must be a non-empty string' });
  }
  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'inStock must be a boolean' });
  }
  next();
}

module.exports = validateProduct;
