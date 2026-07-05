import express from "express";

import uploadResume from "../middleware/uploadResume.js";

import {
  uploadResume as uploadResumeController,
  getResume,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

/* Upload Resume */
router.post(
  "/",
  uploadResume.single("resume"),
  uploadResumeController
);

/* Get Resume */
router.get("/", getResume);

/* Delete Resume */
router.delete("/:id", deleteResume);

export default router;