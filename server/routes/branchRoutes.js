const {addBranch,deleteBranch,updateBranch,getBranches}= require('../controllers/branchController')

const express=require('express')
const router=express.Router();

router.post('/addLocation',addBranch);
router.delete('/deleteLocation/:id',deleteBranch);
router.get('/getBranches',getBranches);
router.put('/updateBranch',updateBranch);

module.exports=router;