
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PatientModel = new Schema ({
    id_patient: {type: Number, required: true,unique:true},
    name_patient: {type: String, required: true},
    lastname_patient: {type: String, required: true},
    sexo_patient: {type: String, required:true},
    telefono_patient: {type: Number, required: true},
    direccion_patient: {type: String, required: false}
}, {
    
});

module.exports=mongoose.model('Patient',PatientModel);