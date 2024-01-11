import express from "express";
import { createListingController,deleteListingController } from "../controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.post('/create',verifyUser,createListingController);


router.delete('/delete/:id',verifyUser,deleteListingController)
export default router;