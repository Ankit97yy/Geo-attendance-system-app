const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes.js')
const orgRoutes= require('./routes/orgRoutes')
const empRoutes= require('./routes/empRoutes')
const attendanceRoutes=require('./routes/attendanceRoutes')
const leaveRoutes= require('./routes/leaveRoutes')
const branchRoutes=require('./routes/branchRoutes')


const app = express()
app.use(express.json())
app.use(cors());


app.use('/auth', authRoutes);
app.use('/org',orgRoutes);
app.use('/employee',empRoutes);
app.use('/attendance',attendanceRoutes);
app.use('/leave',leaveRoutes);
app.use('/branch',branchRoutes);


app.listen(3001, () => {
    console.log("3001 ot huni asu.....")
})

