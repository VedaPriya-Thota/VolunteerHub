const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// simple test query instead of getConnection
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("❌ Database connection failed:");
    console.error(err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

module.exports = db.promise();