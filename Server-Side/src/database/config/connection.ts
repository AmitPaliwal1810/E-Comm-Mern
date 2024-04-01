const { Pool } = require("pg/lib");

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "e-comm",
  port: 5433,
});
