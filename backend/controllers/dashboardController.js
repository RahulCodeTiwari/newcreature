import Category from "../models/Category.model.js";
import HomeTopSubCategory from "../models/HomeTopSubCategory.model.js";
import SubCategory from "../models/Subcategory.model.js";
import Contact from "../models/Contact.model.js";
import Blog from "../models/Blog.model.js";

export const getDashboardCounts = async (req, res) => {
  try {
    const data = {
      categories: await Category.countDocuments(),
      subcategories: await SubCategory.countDocuments(),
      homeTopSubcategories: await HomeTopSubCategory.countDocuments(),
      contacts: await Contact.countDocuments(),
      blogs: await Blog.countDocuments(),
    };

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false });
  }
};
