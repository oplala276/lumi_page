import { Router } from "express";
const router = Router();
// import upload from "../middleware/multer.js";
import upload from "../middleware/upload.js";
import { createPatient, getPatients } from "../controllers/patientController.js";
import { getPatientById, deletePatient, checkPatientId} from "../controllers/patientController.js";

router.post("/add", upload.single("photo"), createPatient);

router.get("/:id/details", getPatientById);
router.delete("/:id", deletePatient);
// routes/patientRoutes.js
router.get("/check/:patientId", checkPatientId);

router.get("/", getPatients);

export default router;
