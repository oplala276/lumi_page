import express from "express";
import { searchDoctors } from "../controllers/searchDoctors.js";
import {
  addDoctorPrescription,
  // getPatientPrescriptions,
getPatientWithPrescriptions
} from "../controllers/doctorPrescriptionController.js";

const router = express.Router();

router.post("/patient/:patientId/prescription", addDoctorPrescription);
// router.get("/patient/:patientId/prescription", getPatientPrescriptions);
router.get("/patient/:id/getprescriptions", getPatientWithPrescriptions);

router.get("/doctors/search", searchDoctors);
export default router;
