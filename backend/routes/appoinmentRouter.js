import express from "express";
import {
  addAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../controllers/appoinmentController.js";
const router = express.Router();

router.route("/getAppointments").get(getAppointments);
router.route("/addAppointment").post(addAppointment);
router.route("/updateAppointment").put(updateAppointment);
router.route("/deleteAppointment").delete(deleteAppointment);

export default router;
