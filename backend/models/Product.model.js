
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Parent Category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

      //  THIS IS YOUR GROUP SYSTEM
    groupName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
      // examples: gas, dosa, momo, burger
    },

    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Card / Slider Images
    image: {
      type: String, // main card image
      default: null,
    },

      // ✅ SEO Fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    canonicalUrl: { type: String },

    slider: {
      images: {
        type: [String],
        validate: {
          validator: (arr) => arr.length <= 5,
          message: "Maximum 5 slider images allowed",
        },
        default: [],
      },
      youtube: {
        link: {
          type: String,
          default: "",
        },
      },
    },

    //  Price Range
    priceRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "INR" },
    },

    // 🔹 Description / Highlights / Features
   description: {
    type: [
      {
        heading: { type: String, required: true },
        text: { type: String, required: true }
      }
     ],
     default: []
    },

    features: {
      type: [String],
      default: [],
    },
    usage: {
      type: [String],
      default: [],
    },

    // Specifications
    specifications: {
      type: Map,
      of: String,
    },

    // Contact
    callNumber: {
      type: String,
      default: "",
    },
    whatsappNumber: {
      type: String,
      default: "",
    },

    // Brochure (PDF URL)
    brochureUrl: {
      type: String,
      default: null,
    },

    // Blue Section
    blueSection: {
      heading: {
        type: String,
        default: "",
      },
      images: {
        type: [String],
        validate: {
          validator: (arr) => arr.length <= 5,
          message: "Maximum 5 blue section images allowed",
        },
        default: [],
      },
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//  Unique index: same category me duplicate subcategory slug na ho
productSchema.index({ slug: 1, category: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);
