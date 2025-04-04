import express from "express";
import {
  addPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from "../controllers/patientController.js";
const router = express.Router();

//view patients
router.route("/getPatients").get(getPatients);

//add patients
router.route("/addPatient").post(addPatient);

//update Patient
router.route("/updatePatient/:id").put(updatePatient);

//deletePatient
router.route("/deletePatient/:id").delete(deletePatient);
export default router;
