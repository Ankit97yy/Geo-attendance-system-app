const {addBranch,deleteBranch,updateBranch,getBranches}= require('../controllers/branchController')

const express=require('express');
const giveAccessTo = require('../middleware/giveAccessTo');
const router=express.Router();

router.post('/addBranch',giveAccessTo("admin"),addBranch);
router.delete('/deleteBranch/:id',giveAccessTo("admin"),deleteBranch);
router.get('/getBranches',giveAccessTo("admin"),getBranches);
router.put('/updateBranch/:id',giveAccessTo("admin"),updateBranch);

module.exports=router;