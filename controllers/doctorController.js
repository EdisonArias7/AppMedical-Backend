const Doctor = require("../models/Doctor.js");

const createDoctor = async (req, res) => {
  console.log("Try to create doctor");
  console.log(req.body);
  console.log("***********");
  const {
    id_doctor,
    name_doctor,
    lastname_doctor,
    cedula_doctor,
    telefono_doctor,
    direccion_doctor,
  } = req.body;

  try {
    const doctor = new Doctor({
        id_doctor,
        name_doctor,
        lastname_doctor,
        cedula_doctor,
        telefono_doctor,
        direccion_doctor,
    });
    console.log("doctor", doctor);
    await doctor.save();
    return res.status(200).send({
      status: "ok",
      doctor,
    });
  } catch (error) {
    return res.send({
      status: "error 400",
      message: `The doctor could not be registered possible causes are insufficient or duplicate data.`,
    });
  }
};

const getDoctorById = async (req, res) => {
  const id = req.params._id;
  console.log("id tomado" + id);
  try {
    const doctor = await Doctor.findById({ _id: id });
    console.log("doctor by id" + doctor);
    if (!doctor)
      return res.status(400).send({
        status: "error",
        message: "Doctor does not exist",
      });
    return res.status(200).send({
      status: "ok",
      message: "Doctor found",
      doctor,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "The server cannot process the request",
    });
  }
};

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).send({
    status: "ok",
    doctors,
  });
};

const editDoctor = async (req, res) => {
  console.log("doctor", req.body);
  const id = req.params._id;
  try {
    const data = req.body;
    const doctorEdit = await Doctor.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!doctorEdit)
      return res.status(400).send({
        status: "error",
        message: "Doctor cannot be modified",
      });
    return res.status(200).send({
      status: "ok",
      message: "Patient modified",
      doctorEdit,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "The server cannot process the request",
    });
    //next();
  }
};

const deleteDoctor = async (req, res, next) => {
  const id = req.params._id;
  try {
      const doctor = await Doctor.findByIdAndDelete({ _id: id });
      if (!doctor) return res.status(400).send({
          status: 'error',
          message: 'Doctor could not be removed'
      });
      return res.status(200).send({
          status: 'ok',
          message: 'Doctor was deleted',
          doctor
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
  create: createDoctor,
  getPbyId: getDoctorById,
  getP: getDoctors,
  edit: editDoctor,
  delete: deleteDoctor
};
