
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },

    // Admin features
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);