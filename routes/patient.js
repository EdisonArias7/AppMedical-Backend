const express =  require('express');
const createPatient=require('../controllers/patientController')
const getPatientById=require('../controllers/patientController')
const getPatients=require('../controllers/patientController')
const editPatient=require('../controllers/patientController')
const deletePatient=require('../controllers/patientController')

const router = express.Router();

//post routes
//router.post('/add-patient', patientController.createPatient);

//get routes

router.get('/:_id',function(req,res){
    getPatientById.getPbyId(req,res);
});

router.get('/',function(req,res){
    getPatients.getP(req,res);
});

//post routes
router.post('/add-patient', function(req, res){
    console.log(req);
    createPatient.create(req,res);
  });

//put routes
router.put('/:_id',function(req,res){
    editPatient.edit(req,res);
});

//delete routes
router.delete('/:_id',function(req,res){
    deletePatient.delete(req,res);
})

module.exports = router;