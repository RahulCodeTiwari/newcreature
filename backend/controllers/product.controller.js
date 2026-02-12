
import mongoose from "mongoose";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.model.js";
import Category from "../models/Category.model.js";
import { emitDashboardUpdate } from "../services/dashboardEmitter.js";

/* ================== HELPERS ================== */

const parseIfJson = (value) => {
  if (!value) return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const uploadToCloudinary = (file, folder, resource_type = "image") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });

  

/* ================== CREATE SUBCATEGORY ================== */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      categoryId,
      groupName,
      priceRange,
      features,
      specifications,
      usage,
      description,
      callNumber,
      whatsappNumber,
      blueHeading,
    } = req.body;


        // 🔥 Group validation
    if (!groupName || !groupName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }

    // normalize group (Gas, GAS → gas)
    const normalizedGroup = groupName.trim().toLowerCase();

    //  Validation
    if (!name || !name.trim() || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name and categoryId are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId",
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await Product.findOne({ slug, category: categoryId });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Subcategory already exists in this category",
      });
    }

    // Parse fields
    const parsedFeatures = features ? parseIfJson(features) : [];
    const parsedUsage = usage ? parseIfJson(usage) : [];
    const parsedPriceRange = priceRange ? parseIfJson(priceRange) : undefined;
    const parsedSpecifications = specifications ? parseIfJson(specifications) : {};
    const parsedDescription = description ? parseIfJson(description) : [];


    //  Upload files
    let imageUrl = null;
    if (req.files?.image?.[0]) {
      imageUrl = await uploadToCloudinary(
        req.files.image[0],
        "creature_industry/products"
      );
    }

    let brochureUrl = null;
    if (req.files?.brochure?.[0]) {
      brochureUrl = await uploadToCloudinary(
        req.files.brochure[0],
        "creature_industry/products/brochures",
        "raw"
      );
    }

    // Slider images (max 5)
    const sliderImages = [];
    if (req.files?.sliderImages) {
      for (const file of req.files.sliderImages.slice(0, 5)) {
        sliderImages.push(
          await uploadToCloudinary(
            file,
            "creature_industry/products/slider"
          )
        );
      }
    }

const youtubeLink = req.body.youtubeLink || "";


    // Blue section images
    const blueImages = [];
    if (req.files?.blueImages) {
      for (const file of req.files.blueImages.slice(0, 5)) {
        blueImages.push(
          await uploadToCloudinary(file, "creature_industry/products/blue")
        );
      }
    }

    // ✅ Create SubCategory
    const product = await Product.create({
      name: name.trim(),
      slug,
      category: categoryId,
      groupName: normalizedGroup,
      image: imageUrl,
      features: parsedFeatures,
      usage: parsedUsage,
      priceRange: parsedPriceRange,
      specifications: parsedSpecifications,
      description: parsedDescription,
      callNumber,
      whatsappNumber,
      brochureUrl,
      slider: {
            images: sliderImages,
            youtube: {
              link: youtubeLink,
            },
          },

      blueSection: { heading: blueHeading || "", images: blueImages },
    });

    await emitDashboardUpdate();
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};



// GET /api/subcategories/groups
export const getProductGroups = async (req, res) => {
  try {
    const groups = await Product.distinct("groupName");
    res.json(groups);   // ["gas","dosa","momo"]
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



/**
 * GET /api/products?category=slugOrId
 * Admin + Frontend
 */
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category (slug or id) is required",
      });
    }

    let cat = null;

    if (mongoose.Types.ObjectId.isValid(category)) {
      cat = await Category.findById(category).select("_id name slug image");
    } else {
      cat = await Category.findOne({ slug: category }).select("_id name slug image");
    }

    if (!cat) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const products = await Product.find({
      category: cat._id,
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .select(
        "_id name slug image category priceRange features specifications usage description callNumber whatsappNumber brochureUrl"
      );

    res.json({
      success: true,
      category: {
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
      },
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/**
 * GET /api/products
 * If category query param is provided, filter by category
 * Otherwise, return all products
 */
export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = { isActive: true };

    if (category) {
      let cat = null;
      if (mongoose.Types.ObjectId.isValid(category)) {
        cat = await Category.findById(category).select("_id name slug image");
      } else {
        cat = await Category.findOne({ slug: category }).select("_id name slug image");
      }

      if (!cat) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }

      filter.category = cat._id;
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .select("_id name slug image category priceRange features specifications usage callNumber whatsappNumber brochureUrl");

    res.json({ success: true, products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

// GET /api/subcategories/:slug
export const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      slug,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ SUCCESS RESPONSE
    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};


// Get related subcategories
export const getRelatedProducts = async (req, res) => {
  try {
    const { groupName, categoryId, currentId } = req.query;
    if (!groupName || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "groupName and categoryId are required",
      });
    }

    const related = await Product.find({
      groupName: groupName.toLowerCase(),
      category: new mongoose.Types.ObjectId(categoryId),
      _id: { $ne: new mongoose.Types.ObjectId(currentId) },
      isActive: true,
    }).select("name slug image groupName");

    return res.json({
      success: true,
      products: related,
    });
  } catch (error) {
    console.error("RELATED ERROR ❌", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch related products",
      error: error.message,
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      groupName,
      isActive,
      priceRange,
      features,
      usage,
      description,
      specifications,
      callNumber,
      whatsappNumber,
      blueHeading,
      youtubeLink,
    } = req.body;

    // ===== VALIDATION =====
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory id",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updateData = {};

    // ===== BASIC FIELDS =====
    if (typeof name === "string" && name.trim()) {
      updateData.name = name.trim();
      updateData.slug = slugify(name, { lower: true, strict: true });
    }

    if (typeof groupName === "string" && groupName.trim()) {
      updateData.groupName = groupName.trim().toLowerCase();
    }

    if (isActive !== undefined) {
      updateData.isActive = isActive === "true" || isActive === true;
    }

    // ===== JSON FIELDS (SAFE) =====
    if (priceRange && priceRange !== "undefined") {
      updateData.priceRange = parseIfJson(priceRange);
    }

    if (features && features !== "undefined") {
      updateData.features = parseIfJson(features);
    }

    if (usage && usage !== "undefined") {
      updateData.usage = parseIfJson(usage);
    }

    if (description && description !== "undefined") {
      updateData.description = parseIfJson(description);
    }

    if (specifications && specifications !== "undefined") {
      updateData.specifications = parseIfJson(specifications);
    }

    // ===== CONTACT =====
    if (callNumber !== undefined) updateData.callNumber = callNumber;
    if (whatsappNumber !== undefined)
      updateData.whatsappNumber = whatsappNumber;

    // ===== MAIN IMAGE =====
    if (req.files?.image?.[0]) {
      updateData.image = await uploadToCloudinary(
        req.files.image[0],
        "creature_industry/products"
      );
    }

    // ===== BROCHURE =====
    if (req.files?.brochure?.[0]) {
      updateData.brochureUrl = await uploadToCloudinary(
        req.files.brochure[0],
        "creature_industry/products/brochures",
        "raw"
      );
    }

    // ===== SLIDER (FIXED LOGIC) =====
    const hasNewSliderImages = req.files?.sliderImages?.length > 0;
    const hasYoutubeLink =
      typeof youtubeLink === "string" && youtubeLink.trim().length > 0;

    if (hasNewSliderImages || hasYoutubeLink) {
      let sliderImages = product.slider?.images || [];

      if (hasNewSliderImages) {
        sliderImages = [];
        for (const file of req.files.sliderImages.slice(0, 5)) {
          sliderImages.push(
            await uploadToCloudinary(
              file,
              "creature_industry/products/slider"
            )
          );
        }
      }

      updateData.slider = {
        images: sliderImages,
        youtube: {
          link: hasYoutubeLink
            ? youtubeLink.trim()
            : product.slider?.youtube?.link || "",
        },
      };
    }

    // ===== BLUE SECTION (FIXED LOGIC) =====
    const hasBlueImages = req.files?.blueImages?.length > 0;
    const hasBlueHeading =
      typeof blueHeading === "string" && blueHeading.trim().length > 0;

    if (hasBlueImages || hasBlueHeading) {
      let blueImages = product.blueSection?.images || [];

      if (hasBlueImages) {
        blueImages = [];
        for (const file of req.files.blueImages.slice(0, 5)) {
          blueImages.push(
            await uploadToCloudinary(
              file,
              "creature_industry/products/blue"
            )
          );
        }
      }

      updateData.blueSection = {
        heading: hasBlueHeading
          ? blueHeading.trim()
          : product.blueSection?.heading || "",
        images: blueImages,
      };
    }

    // ===== FAIL-SAFE UPDATE =====
    updateData.updatedAt = new Date();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    await emitDashboardUpdate();

    res.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Product",
    });
  }
};

/**
 * DELETE /api/Products/:id
 * Admin: Soft delete
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = 
    await Product.findByIdAndDelete(req.params.id);


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await emitDashboardUpdate();
    
    res.json({
      success: true,
      message: "Product disabled successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};


// Search subcategories
export const searchProducts =  async (req, res) => {
  try {
    const { q } = req.query;

    if(!q) {
      return res.json({
        success: true,
        products: [],


      });
    }

    const products = await Product.find({
      name: { $regex: q, $options: "i"},
      isActive: true,
    })
    .select("name slug image groupName")
    .limit(8);

    res.json({
      success: true,
      products,
    });
  } catch(error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};