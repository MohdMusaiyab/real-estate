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
export const deleteListingController = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send({
        success: false,
        message: "Listing Not Found",
      });
    }
    if (req.user.id !== listing.userRef) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Listing Deleted Successfully",
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
