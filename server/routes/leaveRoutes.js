const {getApprovedLeaves,getPendingLeaves, getLeaves,getFulfiledRequests,getPendingLeave,requestLeave,updateLeave, rejectLeave, getRemainingLeavesOfAnEmployee, getAllLeaves, approveLeave, getAllLeavesOfAnEmployee, ongoingLeaveOfAnEmployee, ongoingLeaves, getRemainingLeaves, getTotalAllowedLeaves, setTotalAllowedLeaves}= require('../controllers/leaveController')


const express= require('express');
const giveAccessTo = require('../middleware/giveAccessTo');

const router=express.Router()

router.get('/getApprovedLeaves',getApprovedLeaves);
router.get('/getPendingLeaves',getPendingLeaves);
router.get('/getLeaves/:emp_id',giveAccessTo("admin"),getLeaves);
router.get('/getFulfilledRequests/:emp_id',giveAccessTo("admin"),getFulfiledRequests);
router.get('/getPendingLeave/:emp_id',giveAccessTo("admin"),getPendingLeave);
router.get('/getOngoingLeaveOfAnEmployee',ongoingLeaveOfAnEmployee)
router.get('/getOngoingLeaves',ongoingLeaves)
router.get('/getAllLeaves',giveAccessTo("admin"),getAllLeaves)
router.get('/getAllLeavesOfAnEmployee',getAllLeavesOfAnEmployee)
router.get('/getRemainingLeaves/:emp_id',getRemainingLeavesOfAnEmployee);
router.get('/getRemainingLeaves/',getRemainingLeaves);
router.get('/getTotalAllowedLeaves/',getTotalAllowedLeaves);
router.post('/setTotalAllowedLeaves/',setTotalAllowedLeaves);
router.post('/requestLeave',requestLeave)
router.put('/updateLeave',giveAccessTo("admin"),updateLeave)
router.put('/rejectLeave/:id',giveAccessTo("admin"),rejectLeave)
router.put('/approveLeave/:id',giveAccessTo("admin"),approveLeave)

module.exports=router