import express from "express";
import {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSingleSubcategory,
  getAllSubcategories,

  getRelatedSubcategories,
  getSubCategoryGroups,
  searchSubcategories,
} from "../controllers/subcategory.controller.js";

import { protect } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

/* PUBLIC ROUTES */

// 1️⃣ Get subcategories by category query (?category=slugOrId)
router.get("/", getSubcategories);

router.get("/groups", getSubCategoryGroups);

// 2️⃣ Get single subcategory by slug (ALWAYS LAST to prevent conflicts)
router.get("/related", getRelatedSubcategories);
router.get("/search", searchSubcategories);
router.get("/:slug", getSingleSubcategory);



// 3️⃣ Optional: get all subcategories (admin/public)
router.get("/all", getAllSubcategories);

/* ADMIN ROUTES */

// Create SubCategory with image + brochure + slider + blueSection uploads
router.post(
  "/",
 
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
    { name: "sliderImages", maxCount: 5 },
    { name: "blueImages", maxCount: 5 },
  ]),
  createSubcategory
);

// Update SubCategory
router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
    { name: "sliderImages", maxCount: 5 },
    { name: "blueImages", maxCount: 5 },
  ]),
  updateSubcategory
);

// Delete SubCategory
router.delete("/:id", protect, deleteSubcategory);

export default router;
