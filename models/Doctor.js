const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DoctorModel = new Schema ({
    id_doctor: {type: Number, required: true,unique:true},
    name_doctor: {type: String, required: true},
    lastname_doctor: {type: String, required: true},
    cedula_doctor: {type: Number, required:true,unique:true},
    telefono_doctor: {type: Number, required: true},
    direccion_doctor: {type: String, required: false}
}, {
    
});

module.exports=mongoose.model('Doctor',DoctorModel);