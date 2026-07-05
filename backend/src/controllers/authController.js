import bcrypt from "bcrypt";

import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

/* ===========================
   Admin Login
=========================== */

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find admin
    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    console.log("==================================");
    console.log("Email entered:", email);
    console.log("Admin found:", admin ? "YES" : "NO");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Verify password
    const isPasswordCorrect =
      await admin.comparePassword(password);

    console.log(
      "Password matched:",
      isPasswordCorrect
    );
    console.log("==================================");

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/* ===========================
   Change Password
=========================== */

const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required.",
      });
    }

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const isPasswordCorrect =
      await admin.comparePassword(
        currentPassword
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect.",
      });
    }

    admin.password = newPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully.",
    });
  } catch (error) {
    console.error(
      "CHANGE PASSWORD ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export {
  loginAdmin,
  changePassword,
};