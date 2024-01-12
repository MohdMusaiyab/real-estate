import mongoose from "mongoose";
const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a name"],
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter a description"],
  },
  regularPrice: {
    type: Number,
    required: [true, "Please Enter a regularPrice"],
  },
  discountPrice: {
    type: Number,
    required: [true, "Please Enter a discountedPrice"],
  },
  bathrooms: {
    type: Number,
    required: [true, "Please Enter a bathrooms"],
  },
  bedrooms: {
    type: Number,
    required: [true, "Please Enter a bedrooms"],
  },
  furnished: {
    type: Boolean,
    required: [true, "Please Enter a furnished"],
  },
  parking: {
    type: Boolean,
    required: [true, "Please Enter a parking"],
  },
  type: {
    type: String,
    required: [true, "Please Enter a type"],
  },
  offer: {
    type: Boolean,
    required: [true, "Please Enter a offer"],
  },
  imageUrls: {
    type: Array,
    required: [true, "Please Enter a imageUrls"],
  },
  userRef: {
    type: String,
    required: [true, "Please Enter a userRef"],
  },
},{timestamps:true});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
