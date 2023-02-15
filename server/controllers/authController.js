const { createHash, verifyHash } = require("../hashFunction.js");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../database.js");

async function registerUser(req, res) {
  const {
    name,
    email,
    password,
    organizationName,
    latitude,
    longitude,
    start_time,
    end_time,
    location_name,
    branch_location_id,
    organization_id,
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
    "select `email` from `users` where `email`=?",
    [email]
  );
  if (result.length > 0) {
    console.log("exist");
    res.send({ userExist: true });
  } else {
    try {
      if(is_admin==="no"){
        const hashed = await createHash(password);
        const [user] = await db.execute(
          "INSERT INTO users (full_name, email, password,organization_id,branch_location_id,is_admin) values(?,?,?,?,?,?)",
          [
            name,
            email,
            hashed,
            organization_id,
            branch_location_id,
            is_admin,
          ]
        );
  
      }
      const [orgResult] = await db.execute(
        "INSERT INTO organizations(organization_name,start_time,end_time) VALUES(?,?,?)",
        [organizationName, start_time, end_time]
      );
      const [branchResult] = await db.execute(
        "INSERT INTO branch_locations(longitude,latitude,location_name,organization_id) VALUES(?,?,?,?)",
        [longitude, latitude, location_name, orgResult.insertId]
      );

      const hashed = await createHash(password);
      const [user] = await db.execute(
        "INSERT INTO users (full_name, email, password,organization_id,branch_location_id,is_admin) values(?,?,?,?,?,?)",
        [
          name,
          email,
          hashed,
          orgResult.insertId,
          branchResult.insertId,
          is_admin,
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
