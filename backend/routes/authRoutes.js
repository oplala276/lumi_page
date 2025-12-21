import express from "express";
const router = express.Router();
import { loginAdmin } from "../controllers/authController.js";

router.post("/login", loginAdmin);

export default router;
