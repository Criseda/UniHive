const Pool = require("pg").Pool;

const pool = new Pool({
  user: "unihive",
  password: "unihiveftw",
  host: "localhost",
  port: 5432,
  database: "unihive",
});
//the backend will connect to the database with these details

module.exports = pool;
