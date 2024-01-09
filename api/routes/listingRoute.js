import express from "express";
import { createListingController } from "../controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.post('/create',verifyUser,createListingController);

export default router;