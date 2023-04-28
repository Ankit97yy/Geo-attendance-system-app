const Jwt= require('jsonwebtoken');
require('dotenv').config()

function verifyToken(req, res, next){
        let authHeader = req.headers.authorization;
    
        if (!authHeader)  return res.status(401).send("no auth")
    
        let token=authHeader && authHeader.split(' ')[1]
        Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err) return res.sendStatus(403)
            req.id = decoded.id;
            req.branch_location_id=decoded.branchId
            req.role=decoded.role
            next();
        });
   
}
module.exports={verifyToken}