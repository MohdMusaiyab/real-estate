import express from "express";
import { signupController ,signInController} from "../controllers/authController.js";
const router = express.Router();
// For Sign Up
router.post("/signup", signupController);

// For Sign In
router.post("/signin", signInController);
export default router;
