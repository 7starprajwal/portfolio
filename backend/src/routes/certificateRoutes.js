import express from "express";

import {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certificateController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createCertificateValidation,
} from "../validations/certificateValidation.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getAllCertificates);

router.get("/:id", getCertificateById);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "certificatePdf",
      maxCount: 1,
    },
  ]),
  createCertificateValidation,
  createCertificate
);

router.put(
  "/:id",
  protect,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "certificatePdf",
      maxCount: 1,
    },
  ]),
  createCertificateValidation,
  updateCertificate
);

router.delete(
  "/:id",
  protect,
  deleteCertificate
);

export default router;