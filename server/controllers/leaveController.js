const db=require('../database')
const {getDateTime}= require('../dateTimeFunctions')

async function getPendingLeaves(req,res){
    try {
        const[result]= await db.execute('SELECT * FROM leaves_request WHERE status=pending');
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}


async function getApprovedLeaves(req,res){
    try {
        const[result]=await db.query('SELECT * FROM leaves_request WHERE status=approved');
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

async function getLeaves(req,res){
    try {
        const emp_id=req.params.emp_id;
        const [result]=await db.execute('SELECT * FROM leave_request WHERE employee_id=?',[emp_id])
        if(result.length>0){
            res.send(result)
        }
        else{
            res.send("no request")
        }
    } catch (error) {
        console.log(error)
    }
}

async function requestLeave(req,res){
    try {
        //first check whether leaver are remaining.........
        
        const values=[req.body.employee_id,req.body.branch_id,req.body.reason,req.body.start,req.body.end,"pending",getDateTime()]
        const [result]=await db.execute('INSERT INTO leave_request(employee_id,branch_id,reason,start,end,status,created_time) VALUES(?,?,?,?,?,?,?)',[values])
    } catch (error) {
        console.log(error)
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
module.exports={getApprovedLeaves,getPendingLeaves,getLeaves,requestLeave,updateLeave}