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
export const updateListingController = async (req, res) => {
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
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).send({
      success: true,
      message: "Listing Updated Successfully",
      updatedListing,
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

export const getSingleListingController = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send({
        success: false,
        message: "Listing Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Listing Found",
      listing,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const searchListingController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
      // Can also add description here
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).send({
      success: true,
      message: "Listings Found",
      listings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
