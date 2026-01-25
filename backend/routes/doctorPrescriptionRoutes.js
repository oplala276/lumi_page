import express from "express";
import {
  addDoctorPrescription,
  // getPatientPrescriptions,
getPatientWithPrescriptions
} from "../controllers/doctorPrescriptionController.js";

const router = express.Router();

router.post("/patient/:patientId/prescription", addDoctorPrescription);
// router.get("/patient/:patientId/prescription", getPatientPrescriptions);
router.get("/patient/:id/details", getPatientWithPrescriptions);

export default router;
