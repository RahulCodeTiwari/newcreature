import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    excerpt: { type: String },
    featuredImage: { type: String },

       // ✅ SEO Fields
      // ✅ SEO Fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    canonicalUrl: { type: String },

    sections: [
      {
        heading: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
export default mongoose.models.Blog ||
  mongoose.model("Blog", blogSchema);
