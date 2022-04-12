const express =  require('express');
const createDoctor=require('../controllers/doctorController')
const getDoctorById=require('../controllers/doctorController')
const getDoctors=require('../controllers/doctorController')
const editDoctor=require('../controllers/doctorController')
const deleteDoctor=require('../controllers/doctorController')

const router = express.Router();

//post routes
//router.post('/add-patient', patientController.createPatient);

//get routes

router.get('/:_id',function(req,res){
    getDoctorById.getPbyId(req,res);
});

router.get('/',function(req,res){
    getDoctors.getP(req,res);
});

//post routes
router.post('/add-doctor', function(req, res){
    console.log(req);
    createDoctor.create(req,res);
  });

//put routes
router.put('/:_id',function(req,res){
    editDoctor.edit(req,res);
});

//delete routes
router.delete('/:_id',function(req,res){
    deleteDoctor.delete(req,res);
})

module.exports = router;