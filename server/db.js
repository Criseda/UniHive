require('dotenv').config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER || "unihive",
  password: process.env.DB_PASSWORD || "unihiveftw",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "unihive",
});
//the backend will connect to the database with these details

module.exports = pool;
