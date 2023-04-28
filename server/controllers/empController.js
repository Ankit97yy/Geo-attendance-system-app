const { boolean } = require("yup");
const db = require("../database");
const { getDateTime } = require("../dateTimeFunctions");

async function getEmployees(req, res) {
  try {
    const [result] = await db.execute(
      "SELECT employees.id,branch_location_id,full_name,email,branch_locations.location_name FROM employees JOIN branch_locations ON employees.branch_location_id=branch_locations.id"
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function getEmployee(req, res) {
  try {
    const emp_id = req.params.id;
    const [result] = await db.execute(
      "SELECT employees.id,branch_location_id,full_name,email,branch_locations.location_name FROM employees JOIN branch_locations ON employees.branch_location_id=branch_locations.id WHERE employees.id= ?",[emp_id]
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
      const { createHash } = require("../hashFunction");
      const hash = await createHash(req.body.password);
      const values = [
        req.body.branch_location_id,
        req.body.full_name,
        req.body.email,
        hash,
        req.body.is_admin,
        // req.id,
        42
      ];

      const [result] = await db.execute(
        "INSERT INTO employees(branch_location_id,full_name,email,password,is_admin,created_user,created_time) VALUES (?,?,?,?,?,?,?)",
        [...values, getDateTime()]
      );

      await db.execute('INSERT INTO remaining_leaves (emp_id,annual_leaves,sick_leaves,casual_leaves) VALUES (?,?,?,?)',[result.insertId,3,3,2]);
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteEmployee(req, res) {
  try {
    //! first check whether employee is an admin
    const emp_id = req.params.id;
    const [checkAdmin] = await db.execute(
      'SELECT id FROM employees WHERE is_admin="yes"'
    );
    const is_admin = Boolean(checkAdmin.find((item) => item.id.toString() === emp_id));
    if (is_admin && checkAdmin.length === 1)
      return res.status(403).json({ message: "can not delete the only admin" });
    const [result] = await db.execute("DELETE FROM employees WHERE id=?", [
      emp_id,
    ]);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const attributes = req.body;
    delete attributes.location_name;
    const key = Object.keys(attributes);
    const value = Object.values(attributes);

    if(key[0]==="is_admin" && value[0]==='no'){
      const [checkAdmin] = await db.execute(
        'SELECT id FROM employees WHERE is_admin="yes"'
      );
      const is_admin = Boolean(checkAdmin.find((item) => item.id.toString() === emp_id));
      if (is_admin && checkAdmin.length === 1)
        return res.status(403).json({ message: "can not delete the only admin" });
    }
    const placeholders = `${key[0]}="${
      value[0]
    }", updated_time="${getDateTime()}"`;
    const [result] = await db.execute(
      `UPDATE employees SET ${placeholders} WHERE id=${id}`
    );
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
