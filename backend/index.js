import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import doctorRoutes from "./routes/doctorRoute.js";
import patientRoutes from "./routes/patientRouter.js";
import appointmentRoutes from "./routes/appoinmentRouter.js";

const app = express();
const port = process.env.PORT || 8000;
const mongoUrl = process.env.MONGO_URL;
app.use(express.json());

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log(`server is connected to mongodb`);
    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`failed to connect : ${err}`);
  });
