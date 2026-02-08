import express from "express";
import { createAppointment, getPatientAppointments, getAllAppointments } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/add", createAppointment);
router.get("/patient/:id", getPatientAppointments);
router.get("/all", getAllAppointments); 

export default router;
