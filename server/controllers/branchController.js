const db= require('../database')
const {getDateTime}= require('../dateTimeFunctions')




async function getBranches(req,res){
    try {
        const [result]= await db.execute('SELECT * FROM branch_locations')
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}
async function getBranch(req,res){
    try {
        const [result]= await db.execute('SELECT * FROM branch_locations WHERE id=?',[req.branch_location_id])
        res.send(result[0])
    } catch (error) {
        console.log(error)
    }
}
async function getEmployeeBranche(req,res){
    try {
        const [result]= await db.execute('SELECT * FROM branch_locations')
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

async function addBranch(req,res){
    try {
        const values=[
            req.body.latitude,
            req.body.longitude,
            req.body.location_name,
            req.body.start,
            req.body.end,
            req.body.radius,
            req.id,
        ]
      const[result]= await db.execute('INSERT INTO branch_locations(latitude,longitude,location_name,start_time,end_time,radius,created_user,created_time) VALUES (?,?,?,?,?,?,?,?)',[...values,getDateTime()])
      const message = {
        to: "ExponentPushToken[yaily9FjCf30hZIkBrSYsP]",
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
      };
    
      let msg=await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      res.send("done add")
        
    } catch (error) {
        console.log(error)
    }
}

async function deleteBranch(req,res){
    try {
        const branch_id=req.params.id;
        const [checkAdmin]= await db.execute('SELECT branch_location_id FROM employees WHERE is_admin="yes" AND branch_location_id <> ?',[branch_id])
       if(checkAdmin.length===0) return res.status(401).json({data:"can not delete the branch that has admin"})
        const[result]= await db.execute('DELETE FROM branch_locations WHERE id=?',[branch_id])
        res.send("done delete")
    } catch (error) {
        console.log(error)
    }
}

async function updateBranch(req, res) {
  try {
    const { id } = req.params;
    const attributes = req.body;
    const key = Object.keys(attributes);
    const value = Object.values(attributes);
    const placeholders = `${key[0]}="${value[0]}", updated_time="${getDateTime()}" ,updated_by=${req.id}`
    const [result] = await db.execute(`UPDATE branch_locations SET ${placeholders} WHERE id=${id}`);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function setTime(req,res){
  try {
    const [result]=await db.execute("UPDATE branch_locations SET start_time=?,end_time=? WHERE id=?",[req.body.inTime,req.body.outTime,req.body.branch])
    res.send(result)
  } catch (error) {
    console.log("🚀 ~ file: branchController.js:90 ~ setTime ~ error:", error)
    
  }
}
async function setRadius(req,res){
  try {
    const [result]= await db.execute("UPDATE branch_locations SET radius=? WHERE id=?",[req.body.radius,req.body.branch])
    res.send(result)
  } catch (error) {
    console.log("🚀 ~ file: branchController.js:90 ~ setTime ~ error:", error)
    
  }
}
module.exports={addBranch,deleteBranch,updateBranch,getBranches,setTime,setRadius,getBranch}