# Product API - Express.js Week 2 Assignment

## Setup

1. Run `npm install express body-parser uuid dotenv`
2. Create a `.env` file based on `.env.example` and add your API key
3. Run the server: `node server.js`

## API Endpoints

- `GET /` - Welcome message
- `GET /api/products` - List products, supports `category`, `page`, `limit` query params
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (requires `x-api-key` header)
- `PUT /api/products/:id` - Update product (requires `x-api-key` header)
- `DELETE /api/products/:id` - Delete product (requires `x-api-key` header)
- `GET /api/products/search?q=` - Search products by name
- `GET /api/products/stats` - Product count by category

## Authentication

For `POST`, `PUT`, and `DELETE` routes, include header:

