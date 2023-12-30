import express from 'express'
const router = express.Router();
import { testController } from '../controllers/userController.js';

// Routes for Testing
router.get("/test",testController)

// For Signup We have different Route
export default router;