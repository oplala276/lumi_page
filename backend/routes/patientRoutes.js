import { Router } from "express";
const router = Router();
import upload from "../middleware/upload.js";
import { createPatient, getPatients } from "../controllers/patientController.js";
import { getPatientById, deletePatient } from "../controllers/patientController.js";

router.post("/add", upload.single("file"), createPatient);

router.get("/:id", getPatientById);
router.delete("/:id", deletePatient);

router.get("/", getPatients);

export default router;
