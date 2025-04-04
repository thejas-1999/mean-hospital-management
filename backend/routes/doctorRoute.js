import express from "express";

import {
  addDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

//view all doctor list

router.route("/getDoctors").get(getDoctors);

//insert one doctor
router.route("/addDoctor").post(addDoctor);

//update Doctor
router.route("/updateDoctor/:id").put(updateDoctor);

//deleteDoctor
router.route("/deleteDoctor/:id").delete(deleteDoctor);
export default router;
