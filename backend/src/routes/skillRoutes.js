import express from "express";

import {
  createSkill,
  getAllSkills,
  getSkillByIdController,
  updateSkill,
  deleteSkill,
  getFeaturedSkills,
} from "../controllers/skillController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createSkillValidation,
} from "../validations/skillValidation.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

router.get("/", getAllSkills);

router.get("/featured", getFeaturedSkills);

/* ===========================
   Protected Admin Routes
=========================== */

router.get(
  "/admin/:id",
  protect,
  getSkillByIdController
);

router.post(
  "/",
  protect,
  upload.single("icon"),
  createSkillValidation,
  createSkill
);

router.patch(
  "/:id",
  protect,
  upload.single("icon"),
  createSkillValidation,
  updateSkill
);

router.delete(
  "/:id",
  protect,
  deleteSkill
);

export default router;