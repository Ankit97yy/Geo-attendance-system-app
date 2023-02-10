const Jwt= require('jsonwebtoken');
require('dotenv').config()

export function verifyToken(req, res, next){
    try {
        let authHeader = req.headers("authorization");
    
        if (!authHeader) {
            return send("Access Denied");
        }
    
        let token=authHeader && authHeader.split(' ')[1]
        const verified = Jwt.verify(token, process.env.JWT_SECRET,);
        console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        
    }
}