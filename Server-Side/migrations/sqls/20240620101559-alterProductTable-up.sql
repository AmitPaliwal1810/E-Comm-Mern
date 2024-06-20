/* Replace with your SQL commands */
ALTER TABLE
    products RENAME COLUMN createat TO created_at;

ALTER TABLE
    products RENAME COLUMN archivedat TO archived_at;

ALTER TABLE
    products RENAME COLUMN stockcount TO stock_count;