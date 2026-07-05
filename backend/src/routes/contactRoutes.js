import express from "express";

import {
  sendContactMessage,
  getContacts,
  readContact,
  removeContact,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ---------- Public Route ----------
router.post("/", sendContactMessage);

// ---------- Protected Admin Routes ----------
router.get("/admin",  authMiddleware, getContacts);

router.patch("/admin/:id/read",  authMiddleware, readContact);

router.delete("/admin/:id",  authMiddleware, removeContact);

export default router;