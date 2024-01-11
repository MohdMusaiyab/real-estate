import express from "express";
import { createListingController,deleteListingController ,updateListingController} from "../controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.post('/create',verifyUser,createListingController);


router.delete('/delete/:id',verifyUser,deleteListingController)

// For Updating / Editing the Listing
router.post('/update/:id',verifyUser,updateListingController)
export default router;