import express from "express";
import { signupController ,signInController,googleController} from "../controllers/authController.js";
const router = express.Router();
// For Sign Up
router.post("/signup", signupController);

// For Sign In
router.post("/signin", signInController);

// For google
router.post("/google", googleController);
export default router;
