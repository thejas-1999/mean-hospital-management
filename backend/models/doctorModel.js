import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      enum: [
        "Cardiologist",
        "Dermatologist",
        "Neurologist",
        "Pediatrician",
        "Ophthalmologist",
      ],
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
