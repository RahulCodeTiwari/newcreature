import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token, admin unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded.id).select("-password");

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ message: "Admin access only" });
    }

    //  IMPORTANT CHANGE
    req.user = admin;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
