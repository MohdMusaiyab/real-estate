import express from "express";
import { createListingController,deleteListingController ,updateListingController,getSingleListingController} from "../controllers/listingController.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.post('/create',verifyUser,createListingController);


router.delete('/delete/:id',verifyUser,deleteListingController)

// For Updating / Editing the Listing
router.post('/update/:id',verifyUser,updateListingController)

// Getting a single LIsting
router.get('/get-listing/:id',getSingleListingController);
export default router;