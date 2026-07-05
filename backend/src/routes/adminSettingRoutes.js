import express from "express";

import uploadProfile from "../middleware/uploadProfile.js";

import {
  getAdminSettings,
  updateAdminSettings,
  uploadProfileImage,
  deleteProfileImage,
} from "../controllers/adminSettingController.js";

const router = express.Router();

/* ===========================
   Get Settings
=========================== */

router.get("/", getAdminSettings);

/* ===========================
   Update Settings
=========================== */

router.put("/", updateAdminSettings);

/* ===========================
   Upload Profile Image
=========================== */

router.post(
  "/profile-image",
  uploadProfile.single("image"),
  uploadProfileImage
);

/* ===========================
   Delete Profile Image
=========================== */

router.delete(
  "/profile-image",
  deleteProfileImage
);

export default router;