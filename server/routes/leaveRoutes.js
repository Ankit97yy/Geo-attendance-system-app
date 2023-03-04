const {getApprovedLeaves,getPendingLeaves, getLeaves,requestLeave,updateLeave}= require('../controllers/leaveController')


const express= require('express')

const router=express.Router()

router.get('/getApprovedLeaves',getApprovedLeaves);
router.get('/getPendingLeaves',getPendingLeaves);
router.get('/getLeaves/:emp_id',getLeaves);
router.post('/requestLeave',requestLeave)
router.put('/updateLeave',updateLeave)

module.exports=router