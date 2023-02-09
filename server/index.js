const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const argon2 = require('argon2')

const app = express()
app.use(express.json())
app.use(cors());

async function Createhash(password) {
    try {
        const hash = await argon2.hash(password)
        return hash;
    } catch (error) {
        console.log(error);
    }
}

async function verifyHash(hash, password) {
    try {

        if (await argon2.verify(hash, password)) {

            return true;
        } else {
            return false;
        }

    } catch (err) {
        console.log(err);
    }
}

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

app.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const OrganizationName = req.body.OrganizationName;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    console.log(name, email, password,OrganizationName,latitude,longitude);

    con.query('select email from users where email=?', [email], (err, result) => {
        if (result.length > 0) {
            console.log("exist");
            res.send({ userExist: true })
        }
        else {
            Createhash(password).then(hashed => {
                con.query('insert into users values(?,?,?)', [name, email, hashed], (err, result) => {
                    if (result) {
                        // res.send({ success: true });
                        console.log("regis succ");
                    }
                    if (err) {
                        // res.send({message:"enter correct details"})
                        console.log("database ot nuhumal");
                    }
                })
            })
        }
    })

})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query('select password from users where email=?', [email], (err, result) => {
        if (result.length > 0) {
            verifyHash(result[0].password,password).then((verified) => {
                if (verified)
                    res.send({ canLogIn: true })
                else
                    res.send({ canLogIn: false })
                })
            }
        else {
            res.send({ canLogIn: false })
        }
        if (err) {
            // res.send({message:"enter correct details"})
            console.log("database ot nuhumal");
        }
        // console.log(result[0].password);
    })
})
app.listen(3001, () => console.log("3001 ot huni asu....."))

// import React from 'react';
// import { AsyncStorage } from 'react-native';

// // Store data
// await AsyncStorage.setItem('userToken', 'abc123');

// // Retrieve data
// const value = await AsyncStorage.getItem('userToken');
// console.log(value); // "abc123"

// // Remove data
// await AsyncStorage.removeItem('userToken');
