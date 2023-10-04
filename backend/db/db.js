const mysql = require("mysql");

const connectDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connectDB.connect((error) => {
  if (error) throw error;
  console.log("Connected to the database.");
});

module.exports = connectDB;
