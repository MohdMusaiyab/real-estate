import express from 'express'
const router = express.Router();
import { testController } from '../controllers/userController.js';
router.get("/test",testController)
export default router;