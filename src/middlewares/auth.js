import admin from "../firebase/config";

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
