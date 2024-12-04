const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employee_db",
  password: "suresh_SK25", // Replace with your password
  port: 5432,
});

module.exports = pool;
