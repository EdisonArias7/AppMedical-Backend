const Patient = require("../models/Patient.js");

const createPatient = async (req, res) => {
  console.log("Try to create patient");
  console.log(req.body);
  console.log("***********");
  const {
    id_patient,
    name_patient,
    lastname_patient,
    sexo_patient,
    telefono_patient,
    direccion_patient,
  } = req.body;

  try {
    const patient = new Patient({
      id_patient,
      name_patient,
      lastname_patient,
      sexo_patient,
      telefono_patient,
      direccion_patient,
    });
    console.log("patient", patient);
    await patient.save();
    return res.status(200).send({
      status: "ok",
      patient,
    });
  } catch (error) {
    return res.send({
      status: "error 400",
      message: `The patient could not be registered possible causes are insufficient or duplicate data.`,
    });
  }
};

const getPatientById = async (req, res) => {
  const id = req.params._id;
  console.log("id tomado" + id);
  try {
    const patient = await Patient.findById({ _id: id });
    console.log("patient by id" + patient);
    if (!patient)
      return res.status(400).send({
        status: "error",
        message: "Patient does not exist",
      });
    return res.status(200).send({
      status: "ok",
      message: "Patient found",
      patient,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "The server cannot process the request",
    });
  }
};

const getPatients = async (req, res) => {
  const patients = await Patient.find();
  res.status(200).send({
    status: "ok",
    patients,
  });
};

const editPatient = async (req, res) => {
  console.log("patient", req.body);
  const id = req.params._id;
  try {
    const data = req.body;
    const patientEdit = await Patient.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!patientEdit)
      return res.status(400).send({
        status: "error",
        message: "Patient cannot be modified",
      });
    return res.status(200).send({
      status: "ok",
      message: "Patient modified",
      patientEdit,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "The server cannot process the request",
    });
    //next();
  }
};

const deletePatient = async (req, res, next) => {
  const id = req.params._id;
  try {
      const patient = await Patient.findByIdAndDelete({ _id: id });
      if (!patient) return res.status(400).send({
          status: 'error',
          message: 'Patient could not be removed'
      });
      return res.status(200).send({
          status: 'ok',
          message: 'Patient was deleted',
          patient
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
  create: createPatient,
  getPbyId: getPatientById,
  getP: getPatients,
  edit: editPatient,
  delete: deletePatient
};
