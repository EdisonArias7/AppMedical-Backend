const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AppointmentModel = new Schema ({
    id_appointment: {type: Number, required: true, unique:true},
    hora_appointment: {type: String, required: true},
    fecha_appointment: {type: String, required: true},
    id_patient: {type: Number, required:true},
    id_doctor: {type: Number, required: true},
    consultorio_appointment: {type: String, required: true}
}, {
    
});

module.exports=mongoose.model('Appointment',AppointmentModel);