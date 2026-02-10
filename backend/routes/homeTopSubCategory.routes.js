import express from "express";
import { protect } from "../middlewares/admin.middleware.js";

import {
  createHomeTopSubCategory,
  deleteHomeTopSubCategory,
  getAdminHomeTopSubCategories,
  getHomeTopSubCategories,
} from "../controllers/homeTopSubcategory.controller.js";


const router = express.Router();


/* PUBLIC */
router.get("/", getHomeTopSubCategories);

/* ADMIN */
router.get("/admin", protect, getAdminHomeTopSubCategories);
router.post("/", protect, createHomeTopSubCategory);
router.delete("/:id", protect, deleteHomeTopSubCategory);

export default router;
