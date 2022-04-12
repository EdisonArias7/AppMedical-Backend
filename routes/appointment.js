const express =  require('express');
const createAppointment=require('../controllers/appointmentController')
const getAppointmentById=require('../controllers/appointmentController')
const getAppointments=require('../controllers/appointmentController')
const editAppointment=require('../controllers/appointmentController')
const deleteAppointment=require('../controllers/appointmentController')

const router = express.Router();

//post routes
//router.post('/add-patient', patientController.createPatient);

//get routes

router.get('/:_id',function(req,res){
    getAppointmentById.getPbyId(req,res);
});

router.get('/',function(req,res){
    getAppointments.getP(req,res);
});

//post routes
router.post('/add-appointment', function(req, res){
    console.log(req);
    createAppointment.create(req,res);
  });

//put routes
router.put('/:_id',function(req,res){
    editAppointment.edit(req,res);
});

//delete routes
router.delete('/:_id',function(req,res){
    deleteAppointment.delete(req,res);
})

module.exports = router;