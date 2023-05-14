const {getAttendance,deleteAttendance,getAllAttendances,addAttendance,updateAttendance,getAttendanceOfAnEmployee, getWorkingHours, todayAttendanceOfAnEmployee, getAllAttendanceOfToday} = require('../controllers/attendanceController')
const giveAccessTo = require('../middleware/giveAccessTo');

const express=require('express');
// const { verifyToken } = require('../middleware/verifyToken');

const router=express.Router()

router.get('/getAttendance/',getAttendance);
router.get('/getAttendanceOfAnEmployee/:id',giveAccessTo('admin'),getAttendanceOfAnEmployee);
router.get('/getAllAttendances',giveAccessTo('admin'),getAllAttendances);
router.get('/getWorkingHours/:id',giveAccessTo('admin'),getWorkingHours);
router.get("/getTodayAttendanceOfAnEmployee",todayAttendanceOfAnEmployee)
router.get("/getAllAttendanceOfToday",giveAccessTo('admin'),getAllAttendanceOfToday);
router.delete('/deleteAttendance',giveAccessTo('admin'),deleteAttendance)
router.post('/addAttendance',addAttendance)
router.put('/updateAttendance/:id',giveAccessTo('admin'),updateAttendance)

module.exports=router
