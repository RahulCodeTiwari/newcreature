import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protect } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// PUBLIC
router.get("/", getCategories);

// ADMIN
router.post("/", protect,  upload.single("image"), createCategory);
router.put("/:id", protect,  upload.single("image"), updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;
