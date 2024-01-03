import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
// Controller Just for Testing Purpose
export const testController = (req, res) => {
  res.send("Hello from testController");
};
export const updateController = async (req, res) => {
  try {
    if (req.user.id != req.params.id) {
      return res.status(401).send({
        success: false,
        message: "You can only update your account",
      });
    }
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    return res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Internal Server Error",
      error,
    });
  }
};
