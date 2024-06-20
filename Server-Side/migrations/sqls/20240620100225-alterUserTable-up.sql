/* Replace with your SQL commands */
ALTER TABLE
    users RENAME COLUMN createat TO created_at;

ALTER TABLE
    users RENAME COLUMN archivedat TO archived_at;