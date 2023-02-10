const {createHash, verifyHash}=require('../hashFunction.js')
const Jwt= require('jsonwebtoken');
require('dotenv').config()
const con=require('../database.js')
function registerUser(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const OrganizationName = req.body.OrganizationName;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    console.log(name, email, password, OrganizationName, latitude, longitude);
    con.query('select email from users where email=?', [email], (err, result) => {
        if (result.length > 0) {
            console.log("exist");
            res.send({ userExist: true })
        }
        else {
            createHash(password).then(hashed => {
                con.query('insert into users values(?,?,?)', [name, email, hashed], (err, result) => {
                    if (result) {
                        res.send({ success: true });
                    }
                    if (err) {
                        res.send({message:"enter correct details"})
                    }
                })
            })
        }
    })
}

function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    con.query('select name,password from users where email=?', [email], (err, result) => {
        if (result.length>0) {
            console.log(result);
            verifyHash(result[0].password, password).then((verified) => {
                if (verified) {
                    const accessToken = Jwt.sign({ id: result[0].id }, process.env.ACCESS_TOKEN_SECRET)
                    res.json({ canLogIn: true,accessToken:accessToken })
                }
                else
                    res.send({ canLogIn: false })
            })
        
        // console.log(result[0].password);
        }
        else {
            res.send({ canLogIn: false })
        }
        if (err) {
            // res.send({message:"enter correct details"})
            console.log("database ot nuhumal",err);
        }
        // console.log(result[0].password);
    })
}
module.exports={loginUser,registerUser}