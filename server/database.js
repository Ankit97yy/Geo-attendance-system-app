const mysql = require('mysql')

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "mariamaria",
    database: "test"
})


module.exports=con