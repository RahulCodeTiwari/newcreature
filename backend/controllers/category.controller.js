
import Category from "../models/Category.model.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import { emitDashboardUpdate } from "../services/dashboardEmitter.js";

/**
 * Helper → URL validation
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Helper → Upload image to Cloudinary
 */
export const uploadCategoryImage = async (file) => {
  // 🟢 diskStorage
  if (file?.path) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "creature_industry/categories",
      transformation: [
        { width: 300, height: 300, crop: "fit", background: "white" },
      ],
    });

    return { url: result.secure_url };
  }

  // 🟢 memoryStorage
  if (file?.buffer) {
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "creature_industry/categories",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({ url: result.secure_url });
        }
      );

      stream.end(file.buffer);
    });
  }

  throw new Error("Invalid file input");
};

/**
 * POST /api/categories
 */
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await Category.findOne({ slug });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Category image is required",
      });
    }

    const uploadedImage = await uploadCategoryImage(req.file);

    const category = await Category.create({
      name: name.trim(),
      slug,
      image: { url: uploadedImage.url },
      description: description?.trim(),
    });
await emitDashboardUpdate();

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("❌ Create Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating category",
    });
  }
};

/**
 * GET /api/categories
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .select("_id name slug image description");

    res.json({ success: true, categories });
  } catch (error) {
    console.error("❌ Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
    });
  }
};

/**
 * PUT /api/categories/:id
 */
export const updateCategory = async (req, res) => {
  try {
    const { name, image, description } = req.body;
    const updateData = {};

    if (name?.trim()) {
      updateData.name = name.trim();
      updateData.slug = slugify(name, { lower: true, strict: true });
    }

    if (description?.trim()) {
      updateData.description = description.trim();
    }

    // 🟢 Priority: uploaded file
    if (req.file) {
      const uploadedImage = await uploadCategoryImage(req.file);
      updateData.image = { url: uploadedImage.url };
    }
    // 🟡 Else: image URL from body
    else if (image && isValidUrl(image)) {
      updateData.image = { url: image };
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );


    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await emitDashboardUpdate();
    
    res.json({ success: true, category });
  } catch (error) {
    console.error("❌ Update Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating category",
    });
  }
};

/**
 * DELETE /api/categories/:id
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);


    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
await emitDashboardUpdate();
    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting category",
    });
  }
};
