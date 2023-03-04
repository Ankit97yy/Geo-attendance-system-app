const db = require("../database");
const { getTime,getDate } = require("../dateTimeFunctions");

async function addAttendance(req, res) {
  try {

    if (req.body.in) {
      const [result] = await db.execute(
        "INSERT INTO attendance(emp_id,branch_id,in_time,date,created_user,created_time)",[req.body.employee_id,req.body.branch_id,getTime(),getDate(),req.body.id,getTime()]
      );
      res.send("successfully added")
    } else {
      const [result] = await db.execute(
        "UPDATE attendance SET Out_time=? WHERE emp_id=? AND date=?",[getTime(),req.body.employee_id]
      );
      res.send("hol de")
    }
  } catch (error) {
    console.log(error)
  }
}

async function getAttendances(req, res) {
  try {
    const [result] = await db.execute("SELECT * FROM attendance");
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function getAttendance(req, res) {
  try {
    const employee_id = req.params.id;
    const [result] = await db.execute(
      "SELECT * FROM attendance WHERE employee_id=?",
      [employee_id]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function deleteAttendance(req, res) {
  try {
    const attendance_id = req.params.id;
    const [result] = await db.execute("DROP FROM attendance WHERE id=?", [
      attendance_id,
    ]);
    res.send("delete attendance done");
  } catch (error) {
    console.log(error);
  }
}

async function updateAttendance(req, res) {
  try {
    const { id } = req.params;
    const attributes = req.body;
    const keys = Object.keys(attributes);
    const values = Object.values(attributes);
    const placeholders = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE attendance SET ${placeholders} updated_time=? WHERE emp_id = ?`;
    const params = [...values, getDateTime(), id];
    const [result] = await db.execute(query, params);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getAttendance,
  deleteAttendance,
  getAttendances,
  updateAttendance,
  addAttendance
};
