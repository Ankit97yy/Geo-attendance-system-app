const {getEmployee,deleteEmployee,updateEmployee,getEmployees,addEmployee, getLoggedInEmployee, profilePicture, generateReport, changeEmail, changePassword, savePushToken}= require('../controllers/empController')

const express=require('express');
const giveAccessTo = require('../middleware/giveAccessTo');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/ankit/codes/geo_attendance_system_app/server/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  const upload = multer({ storage: storage });

const router=express.Router();

router.get('/getEmployees',giveAccessTo("admin"),getEmployees)
router.get('/getEmployee/:id',giveAccessTo("admin"),getEmployee)
router.get('/getLoggedInEmployee',getLoggedInEmployee)
router.post('/getReport',generateReport)
router.post('/addEmployee',giveAccessTo("admin"),upload.single('profilePicture'),addEmployee)
router.post('/profilePicture',upload.single('profilePicture'),profilePicture)
router.post('/savePushToken',savePushToken)
router.delete('/deleteEmployee/:id',giveAccessTo("admin"),deleteEmployee)
router.put('/updateEmployee/:id',giveAccessTo("admin"),updateEmployee)
router.patch('/changeEmail',changeEmail)
router.patch('/changePassword',changePassword)

module.exports=router;