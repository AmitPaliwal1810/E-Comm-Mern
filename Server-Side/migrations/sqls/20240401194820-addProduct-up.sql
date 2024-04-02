/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "desc" VARCHAR(255) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    archivedAt TIMESTAMP DEFAULT NULL,
    price NUMERIC DEFAULT 0,
    stockCount NUMERIC DEFAULT 0
);