import Blog from "../models/Blog.model.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import { emitDashboardUpdate } from "../services/dashboardEmitter.js";

/**
 * Helper → Upload blog image to Cloudinary
 */
const uploadBlogImage = async (file) => {
  if (file?.path) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "creature_industry/blogs",
      transformation: [
        { width: 1200, height: 630, crop: "fit", background: "white" },
      ],
    });

    return result.secure_url;
  }

  if (file?.buffer) {
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "creature_industry/blogs" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      stream.end(file.buffer);
    });
  }

  throw new Error("Invalid image file");
};

// Create Blog
export const createBlog = async ( req, res) => {
  try {
    const { title, sections, excert } = req.body;

    if(!title?.trim()){
      return res.status(400).json({
        success: false,
        message: "Blog title is required",
      });
    }

    if(!sections) {
      return res.status(400).json({
        success: false,
        message: "Blog section are required",
     
      });
    }

    // Parse sections 
    const parsedSections = JSON.parse(sections);

    if(!Array.isArray(parsedSections) || parsedSections.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one section is required",
      });
    }

    // Validate each section
    for ( const section of parsedSections) {
      if(!section.heading?.trim() || !section.description?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Each section must have a heading and description",
        });
       }
     }

     const slug = slugify(title, { lower: true, strict: true });

     const exists = await Blog.findOne({ slug });
     if(exists) {
      return res.status(400).json({
        success: false,
        message: "A blog with this title already exists",
      });
     }

     let featuredImageUrl = "";
     if(req.file) {
      featuredImageUrl = await uploadBlogImage(req.file);
     }

     const blog = await Blog.create({
      title: title.trim(),
    slug,
  sections: parsedSections,
  excerpt: excert?.trim() || "",
  featuredImage: featuredImageUrl,
  status: "published",
     });
     await emitDashboardUpdate();

      res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog,
    });
  } catch (err) {
    console.error("Create blog error:", err);
    res.status(500).json({
      success: false,
      message: "Blog creation failed",
    });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, sections, excert } = req.body;

    const {id} = req.params;

    const blog = await Blog.findById(id);
    if(!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // TITLE
    if (title && title.trim()) {
      const newSlug = slugify(title, { lower: true, strict: true });

      // Check duplicate slug
      const exists = await Blog.findOne({ slug: newSlug, _id: { $ne: id } });
      if (exists) {
        return res.status(400).json({ 
          success: false,
          message: "A blog with this title already exists" 
        });
      }

      blog.title = title.trim();
      blog.slug = newSlug;
    }

    // Sections
    if(sections) {
      const parsedSections = JSON.parse(sections);

      if (!Array.isArray(parsedSections) || parsedSections.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one section is required",
        });
      }

      for(const section of parsedSections) {
        if (!section.heading?.trim() || !section.description?.trim()) {
          return res.status(400).json({
            success: false,
            message: "Each section must have a heading and description",
          });
         }
        }
        blog.sections = parsedSections;
      }
      // Excerpt
      if(excert !== undefined) {
        blog.excert = excert.trim();
      }

      // Featured image
      if (req.file) {
        const featuredImageUrl = await uploadBlogImage(req.file);;
        blog.featuredImage = featuredImageUrl;
      }
      await blog.save();

      await emitDashboardUpdate();
      
      res.json({
        success: true,
        message: "Blog updated successfully",
        blog,
      });
  } catch (err) {
       console.error("Update blog error:", err);
      res.status(500).json({
        success: false,
        message: "Blog update failed",

      });
    }
  };

// Get All Blogs
export const getBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
};

// Get Single Blog
export const getBlogBySlug =  async (req, res) => {
    const blog =  await Blog.findOne({ slug: req.params.slug});
    if(!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json(blog); 
};

// Delete Blog
export const deleteBlog = async ( req, res ) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Blog deleted successfully" });
};