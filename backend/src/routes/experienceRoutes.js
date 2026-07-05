import express from "express";

import {
  createExperience,
  getExperiences,
  getPublishedExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/published", getPublishedExperiences);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.get("/", protect, getExperiences);

router.get("/:id", protect, getExperienceById);

router.post(
  "/",
  protect,
  upload.single("companyLogo"),
  createExperience
);

router.put(
  "/:id",
  protect,
  upload.single("companyLogo"),
  updateExperience
);

router.delete("/:id", protect, deleteExperience);

export default router;