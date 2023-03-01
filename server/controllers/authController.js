const { createHash, verifyHash } = require("../hashFunction.js");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../database.js");

function getDateTime(){
  const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hour = String(now.getHours()).padStart(2, '0');
const minute = String(now.getMinutes()).padStart(2, '0');
const second = String(now.getSeconds()).padStart(2, '0');
return`${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

async function registerUser(req, res) {
  const {
    name,
    email,
    password,
    latitude,
    longitude,
    location_name,
    is_admin,
  } = req.body;
  console.log(
    // name,
    // email,
    // password,
    // organizationName,
    // latitude,
    // longitude,
    // start_time,
    // end_time,
    // location_name,
    // branch_location_id
    req.body
  );
  const [result] = await db.execute(
    "select `email` from `employees` where `email`=?",
    [email]
  );
  if (result.length > 0) {
    console.log("exist");
    res.send({ userExist: true });
  } else {
    try {
      const [branchResult] = await db.execute(
        "INSERT INTO branch_locations(latitude,longitude,location_name,created_time) VALUES(?,?,?,?)",
        [longitude, latitude, location_name,getDateTime()]
      );

      const hashed = await createHash(password);
      const [user] = await db.execute(
        "INSERT INTO employees (full_name, email, password,branch_location_id,is_admin,created_time) values(?,?,?,?,?,?)",
        [
          name,
          email,
          hashed,
          branchResult.insertId,
          is_admin,
          getDateTime()
        ]
      );

      res.send({ success: true });
    } catch (error) {
      console.log(error);
      res.send({ message: "enter correct details" });
    }
  }
}

async function loginUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const [checkUser] = await db.execute(
      "select name,password from users where email=?",
      [email]
    );
    if (checkUser.length > 0) {
      console.log(checkUser);
      const isVerified = await verifyHash(checkUser[0].password, password);
      if (isVerified) {
        const accessToken = Jwt.sign(
          { id: checkUser[0].id },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.send({ canLogIn: true, accessToken: accessToken });
      } else res.send({ canLogIn: false });
    } else {
      res.send({ canLogIn: false });
    }
  } catch (error) {
    console.log("database ot nuhumal", error);
  }
}
module.exports = { loginUser, registerUser };
