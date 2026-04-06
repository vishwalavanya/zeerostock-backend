# ZeeroStock Inventory Search API

## Tech Stack
- Node.js + Express
- In-memory data (15 inventory items)

## Setup & Run

### Install dependencies
npm install

### Run locally
npm run dev

### Run in production
npm start

## API Endpoint

### GET /search

Search inventory with optional filters.

| Param      | Type   | Description                    |
|------------|--------|--------------------------------|
| q          | string | Product name (partial match)   |
| category   | string | Filter by category             |
| minPrice   | number | Minimum price filter           |
| maxPrice   | number | Maximum price filter           |

### Example Requests

# Get all inventory
GET /search

# Search by name
GET /search?q=cable

# Search with all filters
GET /search?q=cable&category=electronics&minPrice=100&maxPrice=500

### Example Response
{
  "count": 2,
  "results": [
    { "id": 1, "name": "USB Cable", "category": "Electronics", "price": 150, "quantity": 50 },
    { "id": 5, "name": "HDMI Cable", "category": "Electronics", "price": 250, "quantity": 80 }
  ]
}

## Search Logic
Filters are applied using JavaScript's `.filter()` method on an in-memory array.
Search is case-insensitive using `.toLowerCase()`.
All filters are combined with AND logic — item must satisfy every provided filter.
Invalid price range (minPrice > maxPrice) returns a 400 error.

## Performance Improvement for Large Datasets
For large datasets, I would integrate a search engine like **Elasticsearch** or use
a SQL/NoSQL database with proper indexing on `name` and `category` columns.
On the frontend, debounce would be added to avoid excessive API calls on every keystroke.
