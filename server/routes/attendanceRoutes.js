const {getAttendance,deleteAttendance,getAttendances,addAttendance} = require('../controllers/attendanceController')

const express=require('express')

const router=express.Router()

router.get('/getAttendance/:id',getAttendance);
router.get('/getAttendances',getAttendances);
router.delete('/deleteAttendance',deleteAttendance)
router.post('/addAttendance',addAttendance)

module.exports=router