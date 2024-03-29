const { createHash, verifyHash } = require("../hashFunction.js");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../database.js");
const { getDateTime } = require("../dateTimeFunctions.js");

// async function registerUser(req, res) {
//   const {
//     name,
//     email,
//     password,
//     latitude,
//     longitude,
//     location_name,
//     is_admin,
//   } = req.body;
//   console.log(
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
//     req.body
//   );
//   const [result] = await db.execute(
//     "select `email` from `employees` where `email`=?",
//     [email]
//   );
//   if (result.length > 0) {
//     console.log("exist");
//     res.send({ userExist: true });
//   } else {
//     try {
//       const [branchResult] = await db.execute(
//         "INSERT INTO branch_locations(latitude,longitude,location_name,created_time) VALUES(?,?,?,?)",
//         [longitude, latitude, location_name, getDateTime()]
//       );

//       const hashed = await createHash(password);
//       const [user] = await db.execute(
//         "INSERT INTO employees (full_name, email, password,branch_location_id,is_admin,created_time) values(?,?,?,?,?,?)",
//         [name, email, hashed, branchResult.insertId, is_admin, getDateTime()]
//       );

//       res.send({ success: true });
//     } catch (error) {
//       console.log(error);
//       res.send({ message: "enter correct details" });
//     }
//   }
// }

async function loginUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const [checkUser] = await db.execute(
      "select employees.id,full_name,branch_location_id,latitude,location_name,longitude,password,is_admin,profile_picture from employees JOIN branch_locations ON employees.branch_location_id=branch_locations.id where email=?",
      [email]
    );
    if (checkUser.length === 0)
      return res.status(401).json({ user: false, password: false });
    const isVerified = await verifyHash(checkUser[0].password, password);
    if (!isVerified)
      return res.status(401).json({ password: false, user: true });
    const accessToken = Jwt.sign(
      {
        id: checkUser[0].id,
        branchId: checkUser[0].branch_location_id,
        role: checkUser[0].is_admin,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.send({
      id: checkUser[0].id,
      name: checkUser[0].full_name,
      accessToken: accessToken,
      latitude: checkUser[0].latitude,
      longitude: checkUser[0].longitude,
      branchName: checkUser[0].location_name,
      admin: checkUser[0].is_admin,
      profile_picture: checkUser[0].profile_picture,
    });
  } catch (error) {
    console.log("database ot nuhumal", error);
  }
}
module.exports = { loginUser };
