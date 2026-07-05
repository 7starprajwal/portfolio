import express from "express";

import protect from "../middleware/authMiddleware.js";
import {
  loginAdmin,
  changePassword,
} from "../controllers/authController.js"; // Change to adminController.js if that's your actual file

const router = express.Router();

/* ===========================
   Authentication
=========================== */

router.post("/login", loginAdmin);

/* ===========================
   Change Password
=========================== */

router.put(
  "/change-password",
  protect,
  changePassword
);

export default router;