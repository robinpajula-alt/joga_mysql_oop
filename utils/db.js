const mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty",
  database: "joga_mysql",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to joga_mysql db");
});

module.exports = con;