import express from 'express'
const router = express.Router();
import { testController } from '../controllers/userController.js';
import {updateController,deleteController,userListingController,getUserController} from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyUser.js';
// Routes for Testing
router.get("/test",testController)

router.post("/update/:id",verifyUser,updateController);

router.delete("/delete/:id",verifyUser,deleteController);
// For Signup We have different Route

// For getting the listings of the User
router.get('/listings/:id',verifyUser,userListingController);

router.get('/:id',verifyUser,getUserController);
export default router;