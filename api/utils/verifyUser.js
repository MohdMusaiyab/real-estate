import jwt from "jsonwebtoken";
export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
