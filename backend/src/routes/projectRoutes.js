import express from "express";

import {
  createProject,
  getAllProjects,
  getProjectBySlug,
  getProjectByIdController,
  updateProject,
  deleteProject,
  getFeaturedProjects,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createProjectValidation,
} from "../validations/projectValidation.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

router.get("/", getAllProjects);

router.get("/featured", getFeaturedProjects);

router.get("/:slug", getProjectBySlug);

/* ===========================
   Protected Admin Routes
=========================== */

router.post(
  "/",
  protect,
  upload.single("image"),
  createProjectValidation,
  createProject
);
router.get(
  "/admin/:id",
  protect,
  getProjectByIdController
);

router.patch(
  "/:id",
  protect,
  upload.single("image"),
  createProjectValidation,
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

export default router;