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
            req.id,
        ]
      const[result]= await db.execute('INSERT INTO branch_locations(latitude,longitude,location_name,created_user,created_time) VALUES (?,?,?,?,?)',[...values,getDateTime()])
      res.send("done add")
        
    } catch (error) {
        console.log(error)
    }
}

async function deleteBranch(req,res){
    try {
        const branch_id=req.params.id;
        const [checkAdmin]= await db.execute('SELECT branch_location_id FROM employees WHERE is_admin="yes"')
       checkAdmin.sort((a,b)=>a.branch_location_id-b.branch_location_id)
       if(checkAdmin[0].branch_location_id===checkAdmin[checkAdmin.length-1].branch_location) return res.status(401).json({data:"can not delete a branch that has admin"})
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
module.exports={addBranch,deleteBranch,updateBranch,getBranches}