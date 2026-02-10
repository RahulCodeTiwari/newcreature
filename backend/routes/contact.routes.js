import express from "express";
import {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import { protect } from "../middlewares/admin.middleware.js";

const router = express.Router();

/* ========= PUBLIC ========= */
// Contact form submit
router.post("/", createContact);

/* ========= ADMIN ========= */
// Get all contacts
router.get("/", protect, getAllContacts);

// Mark contact as read / update status
router.put("/:id", protect, updateContact);

// Delete contact
router.delete("/:id", protect, deleteContact);

export default router;
