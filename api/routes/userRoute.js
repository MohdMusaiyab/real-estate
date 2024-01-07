import express from 'express'
const router = express.Router();
import { testController } from '../controllers/userController.js';
import {updateController,deleteController} from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyUser.js';
// Routes for Testing
router.get("/test",testController)

router.post("/update/:id",verifyUser,updateController);

router.delete("/delete/:id",verifyUser,deleteController);
// For Signup We have different Route
export default router;