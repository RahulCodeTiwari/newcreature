import HomeTopSubCategory from "../models/HomeTopSubCategory.model.js";
import SubCategory from "../models/Subcategory.model.js";
import { emitDashboardUpdate } from "../services/dashboardEmitter.js";

/* ========== ADMIN ========== */

// GET all top subcategories
export const getAdminHomeTopSubCategories = async (req, res) => {
  try {
    const items = await HomeTopSubCategory.find()
      .populate("subCategory")
      .sort({ order: 1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch top subcategories" });
  }
};

// CREATE / ADD
export const createHomeTopSubCategory = async (req, res) => {
  try {
    const { subCategoryIds } = req.body; // array of selected subcategory IDs

    if (!subCategoryIds || !subCategoryIds.length)
      return res.status(400).json({ success: false, message: "Select at least 1 subcategory" });

    const added = [];
    for (let subId of subCategoryIds) {
      const exists = await HomeTopSubCategory.findOne({ subCategory: subId });
      if (!exists) {
        const item = await HomeTopSubCategory.create({ subCategory: subId });
        added.push(item);
      }
    }

    const populatedItems = await HomeTopSubCategory.find({ _id: { $in: added.map(a => a._id) } })
      .populate("subCategory");

      await emitDashboardUpdate();

    res.status(201).json({ success: true, data: populatedItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to add top subcategories" });
  }
};

// DELETE
export const deleteHomeTopSubCategory = async (req, res) => {
  try {
    const deleted = await HomeTopSubCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

    await emitDashboardUpdate();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};



// GET top subcategories for homepage
export const getHomeTopSubCategories = async (req, res) => {
  try {
    const items = await HomeTopSubCategory.find({ isActive: true })
      .populate("subCategory")
      .sort({ order: 1 })
      .limit(18);

    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch homepage subcategories" });
  }
};
