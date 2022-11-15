import mysql from "mysql";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.HOST,
  user: "admin",
  password: process.env.PASSWORD,
  database: process.env.DB,
});

// Check connection
db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});
