import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import { protect } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

/* ========= PUBLIC ========= */
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

/* ========= ADMIN ========= */
router.post("/", protect, upload.single("featuredImage"), createBlog);
router.put("/:id", protect, upload.single("featuredImage"), updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
