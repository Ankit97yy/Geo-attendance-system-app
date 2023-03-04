const {getEmployee,deleteEmployee,updateEmployee,getEmployees,addEmployee}= require('../controllers/empController')

const express=require('express')

const router=express.Router();

router.get('/getEmployees',getEmployees)
router.get('/getEmployee',getEmployee)
router.post('/addEmployee',addEmployee)
router.delete('/deleteEmployee/:id',deleteEmployee)
router.put('/updateEmployee/:id',updateEmployee)

module.exports=router;