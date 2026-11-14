# app

- `client/` — React 19 + Vite + Chakra UI + Tailwind v4
- `server/` — Express 5 + PostgreSQL

## Getting started

```bash
pnpm install
pnpm dev
```

Server DB credentials go in `server/.env`

## API (read-only)

| Endpoint                                 | Description                        |
| ---------------------------------------- | ---------------------------------- |
| `GET /api/products`                      | All products                       |
| `GET /api/products?category=electronics` | Products in one category (by slug) |
| `GET /api/products/:id`                  | One product                        |
| `GET /api/brands`                        | All brands                         |
| `GET /api/brands/:id`                    | One brand                          |
| `GET /api/categories`                    | All categories                     |
| `GET /api/categories/:slug`              | One category                       |

Each product looks like:

```json
{
  "id": 6,
  "sku": "SKU-1006",
  "name": "4K Webcam Pro",
  "slug": "4k-webcam-pro",
  "description": "...",
  "price": 89,
  "compare_at_price": null,
  "stock_quantity": 70,
  "is_featured": false,
  "image_url": "...",
  "thumbnail_url": "...",
  "image_credit": "...",
  "image_credit_url": "...",
  "brand": { "id": 12, "name": "Lumio" },
  "category": { "id": 3, "name": "Electronics", "slug": "electronics" }
}
```
