import express from "express";
import { protect } from "../middlewares/admin.middleware.js";

import {

  createHomeTopProduct,
  deleteHomeTopProduct,
  getAdminHomeTopProducts,
  getHomeTopProducts,

} from "../controllers/homeTopProduct.controller.js";


const router = express.Router();


/* PUBLIC */
router.get("/", getHomeTopProducts);

/* ADMIN */
router.get("/admin", protect, getAdminHomeTopProducts);
router.post("/", protect, createHomeTopProduct);
router.delete("/:id", protect, deleteHomeTopProduct);

export default router;
