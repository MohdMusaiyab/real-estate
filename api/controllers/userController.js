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
    // console.log(updatedUser._doc);
    const { password, ...rest } = updatedUser._doc;
    // const rest={...updatedUser._doc};
    // delete rest.password;
    return res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      User: rest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const deleteController = async (req, res) => {
  if (req.user.id != req.params.id) {
    return res.status(401).send({
      success: false,
      message: "You can only delete your account",
    });
  }
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    res.clearCookie('access_token');
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
