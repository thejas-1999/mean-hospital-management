import Patient from "../models/patientModel.js";

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    if (!name || !age || !gender) {
      return res
        .status(400)
        .json({ error: "Name, age, and gender are required" });
    }

    const patient = await Patient.create({ name, age, gender });

    res.status(201).json({
      id: patient._id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
    });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    if (!name && !age && !gender) {
      return res
        .status(400)
        .json({ error: "Provide at least one field to update" });
    }

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (name) patient.name = name;
    if (age) patient.age = age;
    if (gender) patient.gender = gender;

    const updatedPatient = await patient.save();

    res.status(200).json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      age: updatedPatient.age,
      gender: updatedPatient.gender,
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    await Patient.deleteOne({ _id: patient._id });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getPatients, addPatient, updatePatient, deletePatient };
