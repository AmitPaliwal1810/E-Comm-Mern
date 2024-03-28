CREATE TYPE roles AS ENUM ('user', 'seller', 'admin');

CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'user',
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    archivedAt TIMESTAMP DEFAULT NULL
);