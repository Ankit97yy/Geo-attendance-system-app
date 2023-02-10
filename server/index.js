const express = require('express')
const cors = require('cors')
const authRoutes=require('./routes/auth.js')
const con=require('../server/database.js')


const app = express()
app.use(express.json())
app.use(cors());
app.use('/auth',authRoutes);

con.connect((err) => {
    if (err)
        console.log("error connecting database");
    else
        console.log("database connect hol")
});
app.listen(3001, () => console.log("3001 ot huni asu....."))
