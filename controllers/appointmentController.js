const Appointment = require("../models/Appointment.js");

const createAppointment = async (req, res) => {
  console.log("Try to create appointment");
  console.log(req.body);
  console.log("***********");
  const {
    id_appointment,
    hora_appointment,
    fecha_appointment,
    id_patient,
    id_doctor,
    consultorio_appointment,
  } = req.body;

  try {
    const appointment = new Appointment({
        id_appointment,
        hora_appointment,
        fecha_appointment,
        id_patient,
        id_doctor,
        consultorio_appointment,
    });
    console.log("appointment", appointment);
    await appointment.save();
    return res.status(200).send({
      status: "ok",
      appointment,
    });
  } catch (error) {
    return res.send({
      status: "error 400",
      message: `The appointment could not be registered possible causes are insufficient or duplicate data.`,
    });
  }
};

const getAppointmentById = async (req, res) => {
  const id = req.params._id;
  console.log("id tomado" + id);
  try {
    const appointment = await Appointment.findById({ _id: id });
    console.log("appointment by id" + appointment);
    if (!appointment)
      return res.status(400).send({
        status: "error",
        message: "Appointment does not exist",
      });
    return res.status(200).send({
      status: "ok",
      message: "Appointment found",
      appointment,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "The server cannot process the request",
    });
  }
};

const getAppointments = async (req, res) => {
  const appointments = await Appointment.find();
  res.status(200).send({
    status: "ok",
    appointments,
  });
};

const editAppointment = async (req, res) => {
  console.log("appointment", req.body);
  const id = req.params._id;
  try {
    const data = req.body;
    const appointmentEdit = await Appointment.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!appointmentEdit)
      return res.status(400).send({
        status: "error",
        message: "Appointment cannot be modified",
      });
    return res.status(200).send({
      status: "ok",
      message: "Appointment modified",
      appointmentEdit,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "The server cannot process the request",
    });
    //next();
  }
};

const deleteAppointment = async (req, res, next) => {
  const id = req.params._id;
  try {
      const appointment = await Appointment.findByIdAndDelete({ _id: id });
      if (!appointment) return res.status(400).send({
          status: 'error',
          message: 'Appointment could not be removed'
      });
      return res.status(200).send({
          status: 'ok',
          message: 'Appointment was deleted',
          appointment
      });
  } catch (err) {
      res.status(400).send({
          status: 'error',
          message: 'The server cannot process the request'
      });
      next();
  }
};

module.exports = {
  create: createAppointment,
  getPbyId: getAppointmentById,
  getP: getAppointments,
  edit: editAppointment,
  delete: deleteAppointment
};
