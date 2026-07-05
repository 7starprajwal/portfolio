import express from "express";

import {
  createEducation,
  getAllEducations,
  getEducationByIdController,
  updateEducation,
  deleteEducation,
  getFeaturedEducations,
} from "../controllers/educationController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createEducationValidation,
} from "../validations/educationValidation.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

router.get("/", getAllEducations);

router.get(
  "/featured",
  getFeaturedEducations
);

/* ===========================
   Protected Admin Routes
=========================== */

router.get(
  "/admin/:id",
  protect,
  getEducationByIdController
);

router.post(
  "/",
  protect,
  upload.single("logo"),
  createEducationValidation,
  createEducation
);

router.patch(
  "/:id",
  protect,
  upload.single("logo"),
  createEducationValidation,
  updateEducation
);

router.delete(
  "/:id",
  protect,
  deleteEducation
);

export default router;