import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import userRoutes from './routes/authRoutes.js'
import patientRoutes from './routes/patientRoutes.js'
import doctorPrescriptionRoutes from './routes/doctorPrescriptionRoutes.js'
import { getPatientWithPrescriptions } from './controllers/doctorPrescriptionController.js';
import { fileURLToPath } from "url";
import path from "path";
import appointmentRoutes from './routes/appointmentRoutes.js'


dotenv.config();
connectDB();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use(cors());
app.use(json());
app.use('/auth', userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/patient", patientRoutes);
app.use("/api", doctorPrescriptionRoutes);
app.use("/api/appointment", appointmentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));