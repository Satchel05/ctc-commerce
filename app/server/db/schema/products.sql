CREATE TABLE products (
    id               SERIAL PRIMARY KEY,
    sku              TEXT NOT NULL UNIQUE,
    name             TEXT NOT NULL,
    slug             TEXT NOT NULL UNIQUE,
    description      TEXT NOT NULL,
    brand_id         INTEGER NOT NULL REFERENCES brands (id),
    category_id      INTEGER NOT NULL REFERENCES product_categories (id),
    price            NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(10, 2),
    stock_quantity   INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    is_featured      BOOLEAN NOT NULL DEFAULT false,
    image_url        TEXT NOT NULL,
    thumbnail_url    TEXT NOT NULL,
    image_credit     TEXT,
    image_credit_url TEXT,
    CHECK (compare_at_price IS NULL OR compare_at_price > price)
);

CREATE INDEX idx_products_brand    ON products (brand_id);
CREATE INDEX idx_products_category ON products (category_id);
