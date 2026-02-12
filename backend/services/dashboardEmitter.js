import { io } from "../server.js";
import Category from "../models/Category.model.js";
import HomeTopSubCategory from "../models/HomeTopProduct.model.js";
import SubCategory from "../models/Product.model.js";
import Contact from "../models/Contact.model.js";
import Blog from "../models/Blog.model.js";

export const emitDashboardUpdate = async () => {
  const data = {
    categories: await Category.countDocuments(),
    subcategories: await SubCategory.countDocuments(),
    homeTopSubcategories: await HomeTopSubCategory.countDocuments(),
    contacts: await Contact.countDocuments(),
    blogs: await Blog.countDocuments(),
  };

  io.emit("dashboard:update", data);
};
