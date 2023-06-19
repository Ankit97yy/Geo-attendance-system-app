const db = require("../database");
const { DateTime } = require("luxon");
const cron = require("node-cron");
const { getTime, getDate, getDateTime } = require("../dateTimeFunctions");

// to check if attendance is already marked today
async function todayAttendanceOfAnEmployee(req, res) {
  try {
    const [result] = await db.execute(
      "SELECT in_time,out_time,status FROM attendance WHERE emp_id=? AND date=?",
      [req.id, getDate()]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function addAttendance(req, res) {
  try {
    const [check_attendance] = await db.execute(
      "SELECT in_time,out_time from attendance WHERE emp_id=? AND date=?",
      [req.id, getDate()]
    );
    console.log(
      "🚀 ~ file: attendanceController.js:24 ~ addAttendance ~ check_attendance:",
      check_attendance
    );

    if (check_attendance.length === 0) {
      let late_arrival = "";
      const [time] = await db.execute(
        "SELECT start_time FROM branch_locations WHERE id=?",
        [req.branch_location_id]
      );
      const tmp = DateTime.fromFormat(time[0].start_time, "HH:mm:ss");
      let temp = DateTime.now().diff(tmp, "minutes").minutes;
      temp=Math.floor(temp)
      if (temp < 5) late_arrival = "On time";
      else if (temp > 5) late_arrival = temp.toString() + " min";
      const [result] = await db.execute(
        "INSERT INTO attendance(emp_id,branch_id,in_time,status,late_arrival,date,created_time) VALUES(?,?,?,?,?,?,?)",
        [
          req.id,
          req.branch_location_id,
          getTime(),
          "present",
          late_arrival,
          getDate(),
          getDateTime(),
        ]
      );
      res.json({ attendance: true });
    } else if (check_attendance[0].out_time === null) {
      let early_departure = "";
      const [time] = await db.execute(
        "SELECT end_time FROM branch_locations WHERE id=?",
        [req.branch_location_id]
      );
      const tmp = DateTime.fromFormat(time[0].end_time, "HH:mm:ss");
      let temp = DateTime.now().diff(tmp, "minutes").minutes;
      temp=Math.floor(Math.abs(temp))
      if (temp < 5) early_departure = "On time";
      else if (temp > 5) early_departure = temp.toString() +" min";
      const [result] = await db.execute(
        "UPDATE attendance SET Out_time=?,early_departure=? WHERE emp_id=? AND date=?",
        [getTime(), early_departure, req.id, getDate()]
      );
      res.json({ attendance: true });
    } else {
      console.log("done for today");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllAttendances(req, res) {
  try {
    const [result] = await db.execute(
      "SELECT attendance.id,location_name,date,full_name,status,in_time,out_time,late_arrival,early_departure FROM attendance JOIN employees ON attendance.emp_id=employees.id JOIN branch_locations on employees.branch_location_id=branch_locations.id ORDER BY attendance.date DESC"
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function getAllAttendanceOfToday(req, res) {
  try {
    const [result] = await db.execute(
      "SELECT attendance.id,location_name,date,full_name,status,in_time,out_time FROM attendance JOIN employees ON attendance.emp_id=employees.id JOIN branch_locations on employees.branch_location_id=branch_locations.id WHERE date=?",
      [getDate()]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

//get attendance of the logged in employee
async function getAttendance(req, res) {
  try {
    const employee_id = req.id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const [result] = await db.execute(
      "SELECT id,date,status,in_time,out_time,late_arrival,early_departure FROM attendance WHERE emp_id=? AND date BETWEEN ? AND ? order by date desc",
      [employee_id, startDate, endDate]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}
async function getAttendanceOfAnEmployee(req, res) {
  try {
    const employee_id = req.params.id;
    const [result] = await db.execute(
      "SELECT attendance.id,location_name,date,full_name,status,in_time,out_time,late_arrival,early_departure FROM attendance JOIN employees ON attendance.emp_id=employees.id JOIN branch_locations on employees.branch_location_id=branch_locations.id WHERE emp_id=? ORDER BY attendance.date desc",
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
    const key = Object.keys(attributes);
    const value = Object.values(attributes);
    console.log(
      "🚀 ~ file: attendanceController.js:115 ~ updateAttendance ~ value:",
      value[0]
    );
    const placeholders = `${key[0]}="${
      value[0]
    }", updated_time="${getDateTime()}"`;
    console.log(
      "🚀 ~ file: attendanceController.js:118 ~ updateAttendance ~ placeholders:",
      placeholders
    );
    const [result] = await db.execute(
      `UPDATE attendance SET ${placeholders} WHERE id=${id}`
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
}

async function getWorkingHours(req, res) {
  try {
    const id = req.params.id;
    const startdate = req.query.startDate;
    const endDate = req.query.endDate;
    const [result] = await db.execute(
      "SELECT id,in_time,out_time,date FROM attendance WHERE emp_id=? AND date BETWEEN ? AND ? ORDER BY date asc",
      [id, startdate, endDate]
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

cron.schedule(
  "14 13 * * 1-6",
  async () => {
    try {
      const date = getDate();

      const query = `SELECT employees.id, branch_location_id FROM employees WHERE employees.id NOT IN (SELECT emp_id FROM attendance WHERE date = ?) AND employees.id NOT IN (SELECT employee_id FROM leave_request WHERE start <= ? AND end >= ?)`;

      const [emp_info] = await db.execute(query, [date, date, date]);

      emp_info.map(async (item) => {
        await db.execute(
          "INSERT INTO attendance(emp_id,branch_id,status,date) VALUES(?,?,?,?)",
          [item.id, item.branch_location_id, "absent", date]
        );
      });

      console.log(
        "🚀 ~ file: attendanceController.js:118 ~ cron.schedule ~ emp_info:",
        emp_info
      );
    } catch (error) {
      console.log(error);
    }
  },
  {
    timezone: "Asia/Kolkata", // Set the timezone to India (IST)
  }
);
module.exports = {
  getAttendance,
  deleteAttendance,
  getAllAttendances,
  updateAttendance,
  addAttendance,
  getAttendanceOfAnEmployee,
  getWorkingHours,
  todayAttendanceOfAnEmployee,
  getAllAttendanceOfToday,
};
