import Appointment from "../models/appoinmentModel.js";
import Patient from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";

// Create Appointment
const addAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;

    if (!patientId || !doctorId || !date) {
      return res
        .status(400)
        .json({ error: "Patient, Doctor, and Date are required" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
    });

    res.status(201).json({
      _id: appointment._id,
      patient: {
        _id: patient._id,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
      },
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        specialization: doctor.specialization,
      },
      date: appointment.date,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all Appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("patient", "name age gender")
      .populate("doctor", "name specialization");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Appointment (Change Patient, Doctor, or Date)
const updateAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    if (patientId) {
      const patient = await Patient.findById(patientId);
      if (!patient) return res.status(404).json({ error: "Patient not found" });
      appointment.patient = patientId;
    }

    if (doctorId) {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) return res.status(404).json({ error: "Doctor not found" });
      appointment.doctor = doctorId;
    }

    if (date) appointment.date = date;

    const updatedAppointment = await appointment.save();

    res.status(200).json({
      _id: updatedAppointment._id,
      patient: updatedAppointment.patient,
      doctor: updatedAppointment.doctor,
      date: updatedAppointment.date,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    await Appointment.deleteOne({ _id: appointment._id });

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
