// Shared SELECT for products: joins brand + category and returns prices as numbers.
export const PRODUCT_SELECT = `
  SELECT
    p.id, p.sku, p.name, p.slug, p.description,
    p.price::float8            AS price,
    p.compare_at_price::float8 AS compare_at_price,
    p.stock_quantity, p.is_featured,
    p.image_url, p.thumbnail_url, p.image_credit, p.image_credit_url,
    json_build_object('id', b.id, 'name', b.name) AS brand,
    json_build_object('id', c.id, 'name', c.name, 'slug', c.slug) AS category
  FROM products p
  JOIN brands b             ON b.id = p.brand_id
  JOIN product_categories c ON c.id = p.category_id
`
