const db = require("../database.js");

async function getOrgNames(req, res) {
  const [result] = await db.execute(
    "SELECT id,organization_name FROM organizations"
  );
  res.send(result);
}
async function getBranchNames(req, res) {
  const organization_id=req.params.id;
  const [result] = await db.execute(
    "SELECT id,location_name FROM branch_locations where organization_id=?",[organization_id]
  );
  res.send(result);
}

async function getEmpNames(req, res) {
  const organization_id=req.params.id;
  const [result] = await db.execute(
    "SELECT id,full_name FROM users WHERE organization_id=?",[organization_id]
  );
  res.send(result);
}
module.exports = { getOrgNames,getBranchNames,getEmpNames};
