import mysql from "mysql";

export const db = mysql.createConnection({
  host: "groupomaniamysql.cajwv1x06s8c.eu-west-3.rds.amazonaws.com",
  user: "admin",
  password: "1QcK4AcH5td2xxyfsEw7",
  database: "groupomania",
});

// Check connection
db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});
