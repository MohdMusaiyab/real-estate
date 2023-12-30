import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

},{timestamps:true});
// This will be the name of the collection
// It will be in Capital and plural form which MongoDb will directly assing it plurar and add s in end
const User=mongoose.model("User",userSchema);
export default User;