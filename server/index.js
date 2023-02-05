const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors());
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "mariamaria",
    database: "test"
})
con.connect((err) => {
    if (err)
        console.log("error connecting database");
    else
        console.log("database connect hol")
});
app.get('/home', (req, res) => {
    res.send("hello")
})

app.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name, email, password);
    con.query('select email from users where email=?', [email], (err, result) => {
        if (result.length > 0) {
            res.send({ userExist: true })
        }
        else {
            con.query('insert into users values(?,?,?)', [name, email, password], (err, result) => {
                if (result) {
                    res.send(result);
                }
                if(err) {
                    // res.send({message:"enter correct details"})
                    console.log("database ot nuhumal");
                }
            })
        }
    })

})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query('select email from users where email=? and password=?', [email, password], (err, result) => {
        if (result.length > 0) {
            res.send({ canLogIn: true })
        }
        else {res.send({ canLogIn: false })
    }
        if (err) {
            // res.send({message:"enter correct details"})
            console.log("database ot nuhumal");
        }
    })
})
app.listen(3001, () => console.log("3001 ot huni asu....."))

