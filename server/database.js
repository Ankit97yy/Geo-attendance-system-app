const mysql = require("mysql2/promise");

const con = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "mariamaria",
  database: "Geo_attendance_system",
  decimalNumbers:true
});

module.exports = con;
