const {getApprovedLeaves,getPendingLeaves, getLeaves,getFullfiledRequests,getPendingLeave,requestLeave,updateLeave, rejectLeave, ongoingLeave, getRemainingLeaves}= require('../controllers/leaveController')


const express= require('express');
const giveAccessTo = require('../middleware/giveAccessTo');

const router=express.Router()

router.get('/getApprovedLeaves',getApprovedLeaves);
router.get('/getPendingLeaves',getPendingLeaves);
router.get('/getLeaves/:emp_id',giveAccessTo("admin"),getLeaves);
router.get('/getFullfilledRequests/:emp_id',giveAccessTo("admin"),getFullfiledRequests);
router.get('/getPendingLeave/:emp_id',giveAccessTo("admin"),getPendingLeave);
router.get('/getOngoingLeave',ongoingLeave)
router.get('/getRemainingLeaves/:emp_id',getRemainingLeaves);
router.post('/requestLeave',requestLeave)
router.put('/updateLeave',giveAccessTo("admin"),updateLeave)
router.put('/rejectLeave/:id',giveAccessTo("admin"),rejectLeave)

module.exports=router