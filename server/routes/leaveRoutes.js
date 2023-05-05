const {getApprovedLeaves,getPendingLeaves, getLeaves,getFulfiledRequests,getPendingLeave,requestLeave,updateLeave, rejectLeave, ongoingLeave, getRemainingLeaves, getAllLeaves, approveLeave, getAllLeavesOfAnEmployee}= require('../controllers/leaveController')


const express= require('express');
const giveAccessTo = require('../middleware/giveAccessTo');

const router=express.Router()

router.get('/getApprovedLeaves',getApprovedLeaves);
router.get('/getPendingLeaves',getPendingLeaves);
router.get('/getLeaves/:emp_id',giveAccessTo("admin"),getLeaves);
router.get('/getFulfilledRequests/:emp_id',giveAccessTo("admin"),getFulfiledRequests);
router.get('/getPendingLeave/:emp_id',giveAccessTo("admin"),getPendingLeave);
router.get('/getOngoingLeave',ongoingLeave)
router.get('/getAllLeaves',giveAccessTo("admin"),getAllLeaves)
router.get('/getAllLeavesOfAnEmployee',getAllLeavesOfAnEmployee)
router.get('/getRemainingLeaves/:emp_id',getRemainingLeaves);
router.post('/requestLeave',requestLeave)
router.put('/updateLeave',giveAccessTo("admin"),updateLeave)
router.put('/rejectLeave/:id',giveAccessTo("admin"),rejectLeave)
router.put('/approveLeave/:id',giveAccessTo("admin"),approveLeave)

module.exports=router