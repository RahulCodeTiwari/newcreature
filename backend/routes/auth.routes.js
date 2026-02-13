import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

/**
 * POST /api/auth/login
 * ADMIN LOGIN ONLY
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase();

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

   const admin = await User.findOne({ email: normalizedEmail });

    if (!admin || !admin.isAdmin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      _id: admin._id,
      email: admin.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Admin login failed" });
  }
});

export default router;
