const db = require("../database");

async function getEmployees(req, res) {
  try {
    const [result] = await db.execute("SELECT * FROM employees");
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function getEmployee(req, res) {
  try {
    const emp_id = req.params.id;
    const [result] = await db.execute(
      "SELECT * FROM employees WHERE id= emp_id"
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function addEmployee(req, res) {
  try {
    const [email] = await db.execute("SELECT * FROM employees WHERE email=?", [
      req.body.email,
    ]);
    if (email.length > 0) {
      res.send("employee exist");
    } else {
      const crypto = require("crypto");
      const { createHash } = require("../hashFunction");
      const { getDateTime, getDateTime } = require("../dateTimeFunctions");
      const password = crypto.randomBytes(10).toString("hex");
      console.log(password);
      const hash = await createHash(password);
      const values = [
        req.body.branch_location_id,
        req.body.full_name,
        req.body.email,
        hash,
        req.body.is_admin,
        req.body.created_user,
      ];
      console.log(hash);
      const [result] = await db.execute(
        "INSERT INTO employees(branch_location_id,full_name,email,password,is_admin,created_user,created_time) VALUES (?,?,?,?,?,?,?)",
        [...values, getDateTime()]
      );
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteEmployee(req, res) {
  try {
    const emp_id = req.params.id;
    const [result] = await db.execute("DROP FROM employees WHERE id=emp_id");
    res.send;
  } catch (error) {}
}

async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const attributes = req.body;
    const keys = Object.keys(attributes);
    const values = Object.values(attributes);
    const placeholders = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE employees SET ${placeholders} updated_time=? WHERE id = ?`;
    const params = [...values, getDateTime(), id];
    const [result] = await db.execute(query, params);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployees,
  addEmployee,
};
