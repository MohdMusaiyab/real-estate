import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        status: "failed",
        message: "Please provide all the fields",
      });
    }
    // Checking if the user already exists using Email
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        status: "failed",
        message: "User Already Exists",
      });
    }
    // For new User
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).send({
      success: true,
      status: "success",
      User: newUser,
    });
  } catch (error) {
    // next(error);
    // Using the above for code Reusability
    console.log(error.message);
    res.status(500).send({
      success: false,
      status: "failed",
      message: error.message,
    });
  }
};
export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        status: "failed",
        message: "Please provide all the fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        status: "failed",
        message: "User Doesn't Exists",
      });
    }
    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).send({
        success: false,
        status: "failed",
        message: "Invalid Credentials",
      });
    }
    //Authenticating User
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //Saving that in our cookie
    res.cookie("access_token", token, { httpOnly: true });
    //Now we have our cookie in the Browser
    // Removing Password from the response
    const cleanUser = { ...existingUser.toObject() };
    delete cleanUser.password;
    res.status(200).send({
      success: true,
      status: "success",
      User: cleanUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      status: "failed",
      message: error.message,
    });
  }
};
export const googleController = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const cleanUser = { ...existingUser };
      delete cleanUser.password;
      res.status(200).cookie("access_token", token, { httpOnly: true }).send({
        success: true,
        status: "success",
        User: cleanUser,
      });
    } else {
      // Now we dont have the user so we will be creating one with new password as the password is required
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const cleanUser = { ...newUser.toObject() };
      delete cleanUser.password;
      res.cookie("access_token", token, { httpOnly: true }).status(201).send({
        success: true,
        status: "success",
        User: cleanUser,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      status: "failed",
      message: error.message,
    });
  }
};
