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

async function addBranch(req,res){
    try {
        const values=[
            req.body.latitude,
            req.body.longitude,
            req.body.location_name,
            req.body.created_user,
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
    const keys = Object.keys(attributes);
    const values = Object.values(attributes);
    const placeholders = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE branch_location SET ${placeholders} updated_time=? WHERE id = ?`;
    const params = [...values, getDateTime(), id];
    const [result] = await db.execute(query, params);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}
module.exports={addBranch,deleteBranch,updateBranch,getBranches}