import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getAllProducts,
  getRelatedProducts,
  getProductGroups,
  searchProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";

import { protect } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

/* PUBLIC ROUTES */

// Get products by category query (?category=slugOrId)
router.get("/", getProducts);

router.get("/groups", getProductGroups);

// Get single product by slug (ALWAYS LAST to prevent conflicts)
router.get("/related", getRelatedProducts);
router.get("/search", searchProducts);
router.get("/:slug", getSingleProduct);



// Optional: get all subcategories (admin/public)
router.get("/all", getAllProducts);

/* ADMIN ROUTES */

// Create SubCategory with image + brochure + slider + blueSection uploads
router.post(
  "/",
 
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
    { name: "sliderImages", maxCount: 5 },
    { name: "blueImages", maxCount: 12 },
  ]),
  createProduct
);

// Update SubCategory
router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
    { name: "sliderImages", maxCount: 5 },
    { name: "blueImages", maxCount: 12 },
  ]),
  updateProduct
);

// Delete SubCategory
router.delete("/:id", protect, deleteProduct);

export default router;
