import admin from "../firebase/config";
import User from "../models/userModel";

export const isAuth = async (req, res, next) => {
  try {
    const result = await admin.auth().verifyIdToken(req.headers.authtoken);
    req.user = result;

    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Invalid Token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email }).exec();

    if (!user.role) {
      res.status(403).json({
        status: false,
        message: "Bạn không có quyền truy cập",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
