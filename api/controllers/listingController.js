import Listing from "../models/listingModel.js";

export const createListingController = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).send({
      success: true,
      message: "Listing Created Successfully",
      listing,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};
