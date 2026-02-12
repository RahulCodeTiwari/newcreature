import mongoose from "mongoose";
import HomeTopProduct from "../models/HomeTopProduct.model.js";
import Product from "../models/Product.model.js";
import { emitDashboardUpdate } from "../services/dashboardEmitter.js";

/* ========== ADMIN ========== */

// GET all top subcategories
export const getAdminHomeTopProducts = async (req, res) => {
  try {
    const items = await HomeTopProduct.find()
      .populate("product")
      .sort({ order: 1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch top products" });
  }
};

// CREATE / ADD

export const createHomeTopProduct = async (req, res) => {
  try {
    const { productIds } = req.body;
    if (!productIds || !productIds.length) {
      return res.status(400).json({ success: false, message: "Select at least 1 product" });
    }

    const added = [];
    const allProcessed = [];

    for (let productId of productIds) {
      if (!mongoose.Types.ObjectId.isValid(productId)) continue;

      const productExists = await Product.findById(productId);
      if (!productExists) continue;

      // check if already exists
      let item = await HomeTopProduct.findOne({ product: productId });
      if (!item) {
        // create if not exists
        item = await HomeTopProduct.create({ product: productId });
      }
      // push every processed item
      allProcessed.push(item);
      // push only newly created items for added array
      if (item.createdAt && !added.some(a => a._id.equals(item._id))) {
        added.push(item);
      }
    }

    // populate products
    const populatedItems = await HomeTopProduct.find({
      _id: { $in: allProcessed.map(a => a._id) },
    }).populate("product");

    await emitDashboardUpdate();

    res.status(201).json({ success: true, data: populatedItems });

  } catch (err) {
    console.error("CREATE HOME TOP ERROR 👉", err);
    res.status(500).json({
      success: false,
      message: err.message,
      errors: err.errors || null,
    });
  }
};

// DELETE
export const deleteHomeTopProduct = async (req, res) => {
  try {
    const deleted = await HomeTopProduct.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

    await emitDashboardUpdate();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};



// GET top products for homepage
export const getHomeTopProducts = async (req, res) => {
  try {
    const items = await HomeTopProduct.find({ isActive: true })
      .populate("product")
      .sort({ order: 1 })
      .limit(18);

    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch homepage products" });
  }
};
