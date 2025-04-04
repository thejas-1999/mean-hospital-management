import Doctor from "../models/doctorModel.js";

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find({});
  res.status(200).json(doctors);
};

const addDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (!name || !specialization) {
      return res
        .status(400)
        .json({ error: "Name and specialization are required" });
    }

    const doctor = await Doctor.create({ name, specialization });

    res.status(201).json({
      id: doctor._id,
      name: doctor.name,
      specialization: doctor.specialization,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (!name && !specialization) {
      return res
        .status(400)
        .json({ error: "Provide at least one field to update" });
    }

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (name) doctor.name = name;
    if (specialization) doctor.specialization = specialization;

    const updatedDoctor = await doctor.save();

    res.status(200).json({
      _id: updatedDoctor._id,
      name: updatedDoctor.name,
      specialization: updatedDoctor.specialization,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    await Doctor.deleteOne({ _id: doctor._id });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getDoctors, addDoctor, updateDoctor, deleteDoctor };
