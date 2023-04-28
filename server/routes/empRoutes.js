const {getEmployee,deleteEmployee,updateEmployee,getEmployees,addEmployee}= require('../controllers/empController')

const express=require('express');
const giveAccessTo = require('../middleware/giveAccessTo');

const router=express.Router();

router.get('/getEmployees',giveAccessTo("admin"),getEmployees)
router.get('/getEmployee/:id',giveAccessTo("admin"),getEmployee)
router.post('/addEmployee',giveAccessTo("admin"),addEmployee)
router.delete('/deleteEmployee/:id',giveAccessTo("admin"),deleteEmployee)
router.put('/updateEmployee/:id',giveAccessTo("admin"),updateEmployee)

module.exports=router;