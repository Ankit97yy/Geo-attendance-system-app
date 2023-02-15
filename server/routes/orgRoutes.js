const express=require('express');
const { getOrgNames,getBranchNames } = require('../controllers/orgController.js');

const router=express.Router();

router.get('/getOrgNames',getOrgNames)
router.get('/getBranchNames/:id',getBranchNames)

module.exports=router