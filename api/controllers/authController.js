import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
export const signupController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Checking if the user already exists using Email
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).send({
        status: "failed",
        message: "User Already Exists",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).send({
      status: "success",
      User: newUser,
    });
  } catch (error) {
    next(error);
    // Using the above for code Reusability
    // console.log(error.message);
    // res.status(500).send({
    //   status: "failed",
    //   message: error.message,
    // });
  }
};
