const db = require("../database");
const { getDateTime } = require("../dateTimeFunctions");
const { DateTime } = require("luxon");


async function getPendingLeaves(req, res) {
  try {
    const [result] = await db.execute(
      "SELECT leave_request.id,full_name,reason,start,end FROM leave_request JOIN employees ON leave_request.employee_id=employees.id  WHERE status=?",
      ["pending"]
    );

    res.send(result);
  } catch (error) {
  console.log("🚀 ~ file: leaveController.js:15 ~ getPendingLeaves ~ error:", error)
  }
}

async function getAllLeaves(req,res){
  try {
    const [result] = await db.execute('SELECT * FROM leave_request')
    res.send(result)
  } catch (error) {
    console.log("🚀 ~ file: leaveController.js:24 ~ getAllLeaves ~ error:", error)
  }
}
async function getAllLeavesOfAnEmployee(req,res){
  try {
    const [result] = await db.execute('SELECT leave_request.id,start,end,status,reason,leave_type FROM leave_request WHERE employee_id=? ORDER BY created_time desc',[req.id])
    res.send(result)
  } catch (error) {
    console.log("🚀 ~ file: leaveController.js:24 ~ getAllLeaves ~ error:", error)
  }
}
async function getPendingLeave(req, res) {
  try {
    const id= req.params.emp_id;
    const [result] = await db.execute(
      "SELECT leave_request.id,full_name,reason,start,end FROM leave_request JOIN employees ON leave_request.employee_id=employees.id WHERE status='pending' AND employee_id=?",
      [id]
    );

    res.send(result);
  } catch (error) {
  console.log("🚀 ~ file: leaveController.js:37 ~ getPendingLeave ~ error:", error)
  }
}
async function getFulfiledRequests(req, res) {
  try {
    const id= req.params.emp_id;
    const [result] = await db.execute(
      "SELECT leave_request.id,full_name,reason,start,end,status,leave_type FROM leave_request JOIN employees ON leave_request.employee_id=employees.id WHERE status <> 'pending' AND employee_id=?",
      [id]
    );

    res.send(result);
  } catch (error) {
  console.log("🚀 ~ file: leaveController.js:50 ~ getFullfiledRequests ~ error:", error)
  }
}

async function getApprovedLeaves(req, res) {
  try {
    const [result] = await db.query(
      "SELECT * FROM leave_request WHERE status=approved"
    );
    res.send(result);
  } catch (error) {
  console.log("🚀 ~ file: leaveController.js:61 ~ getApprovedLeaves ~ error:", error)
  }
}

async function getLeaves(req, res) {
  try {
    const emp_id = req.params.emp_id;
    const [result] = await db.execute(
      "SELECT * FROM leave_request WHERE employee_id=?",
      [emp_id]
    );
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("no request");
    }
  } catch (error) {
  console.log("🚀 ~ file: leaveController.js:78 ~ getLeaves ~ error:", error)
  }
}
async function getRemainingLeaves(req, res) {
  try {
    const emp_id = req.params.emp_id;
    const [result] = await db.execute(
      "SELECT annual,sick,casual FROM remaining_leaves WHERE emp_id=?",
      [emp_id]
    );
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send("no request");
    }
  } catch (error) {
  console.log("🚀 ~ file: leaveController.js:94 ~ getRemainingLeaves ~ error:", error)
  }
}

async function requestLeave(req, res) {
  try {

    const [remaining_leaves] = await db.execute(`SELECT ${req.body.type} from remaining_leaves WHERE emp_id=${req.id}`)
    const values = Object.values(remaining_leaves[0]);
    if(values[0]<=0) return res.status(403).json({message:'you have no remaining leaves'})
    
    const [result] = await db.execute(
      "INSERT INTO leave_request(employee_id,branch_id,reason,leave_type,start,end,status,created_time) VALUES(?,?,?,?,?,?,?,?)",
      [
        req.id,
        req.branch_location_id,
        req.body.reason,
        req.body.type,
        req.body.start,
        req.body.end,
        "pending",
        getDateTime(),
      ]
    );
    const placeholders =`${req.body.type}=${req.body.type}- 1`
    await db.execute(`UPDATE remaining_leaves SET ${placeholders} WHERE emp_id=${req.id}`)
    res.send("leave applied successfully");
  } catch (error) {
    console.log(error);
  }
}

async function updateLeave(req, res) {
  try {
    const { id } = req.params;
    const attributes = req.body;
    const keys = Object.keys(attributes);
    const values = Object.values(attributes);
    const placeholders = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE leave_request SET ${placeholders} updated_time=? WHERE employee_id = ?`;
    const params = [...values, getDateTime(), id];
    const [result] = await db.execute(query, params);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function rejectLeave(req, res) {
  try {
    const { id } = req.params;
    const [result] = await db.execute(
      'UPDATE leave_request SET status="rejected" WHERE id=?',
      [id]
      );
      res.sendStatus(200)
  } catch (error) {
    console.log(error);
  }
}
async function approveLeave(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.execute(
        'UPDATE leave_request SET status="approved" WHERE id=?',
        [id]
        );
        res.sendStatus(200)
    } catch (error) {
      console.log(error);
    }
  }

  async function ongoingLeave(req,res){
    try {
      const [time]=await db.execute("SELECT start,end FROM leave_request WHERE employee_id =? AND status ='approved'",[req.id])
    if(time.length>0){
    const currentDate=DateTime.now();
    const startDate=DateTime.fromJSDate(time[0].start);
    console.log("🚀 ~ file: leaveController.js:181 ~ ongoingLeave ~ startDate:", startDate)
    const endDate=DateTime.fromJSDate(time[0].end)
    if(currentDate>=startDate && currentDate<=endDate) return res.status(200).json({onLeave:true})
    else return res.status(200).json({onLeave:false})
    }
    else return res.status(200).json({onLeave:false})
    } catch (error) {
      console.log(error)
    }
  }
module.exports = {
  getApprovedLeaves,
  getPendingLeaves,
  getLeaves,
  getFulfiledRequests,
  getPendingLeave,
  requestLeave,
  updateLeave,
  approveLeave,
  rejectLeave,
  ongoingLeave,
  getRemainingLeaves,
  getAllLeaves,
  getAllLeavesOfAnEmployee
};
