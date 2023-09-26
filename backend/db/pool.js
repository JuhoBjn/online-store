const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD
})

module.exports = pool;
