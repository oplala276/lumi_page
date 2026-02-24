import express from "express";
const router = express.Router();
import { loginAdmin } from "../controllers/authController.js";
import { changePassword } from "../controllers/authController.js";

router.post("/login", loginAdmin);
router.post("/change-password", changePassword);

export default router;
