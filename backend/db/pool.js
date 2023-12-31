const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  ssl: {
    minVersion: "TLSv1",
    rejectUnauthorized: false // so it works with local DB container selfsigned certs too
  }
});

const promisePool = pool.promise();

module.exports = { pool, promisePool };
