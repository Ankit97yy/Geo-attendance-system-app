const {addBranch,deleteBranch,updateBranch,getBranches, setTime, setRadius, getBranch}= require('../controllers/branchController')

const express=require('express');
const giveAccessTo = require('../middleware/giveAccessTo');
const router=express.Router();

router.post('/addBranch',giveAccessTo("admin"),addBranch);
router.post('/setTime',giveAccessTo("admin"),setTime);
router.post('/setRadius',giveAccessTo("admin"),setRadius);
router.delete('/deleteBranch/:id',giveAccessTo("admin"),deleteBranch);
router.get('/getBranches',giveAccessTo("admin"),getBranches);
router.get('/getBranch',getBranch);
router.put('/updateBranch/:id',giveAccessTo("admin"),updateBranch);

module.exports=router;