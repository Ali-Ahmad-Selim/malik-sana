// model/posting.ts
import mongoose, { Schema, models, model } from "mongoose";

const PostingSchema = new Schema(
  {
    // Cloudinary image URL
    url: { type: String, required: true, trim: true },

    // Cloudinary public ID (used for deletion)
    publicId: { type: String, required: true, trim: true },

    // Title / caption
    title: { type: String, required: true, trim: true },

    // Optional fields
    description: { type: String, default: "" },
    alt: { type: String, default: "" },

    // Option dropdown selection
    option: {
      type: String,
      enum: ["home", "waist coat", "casual coat", "shaiwani"],
      required: true,
    },
  },
  {
    timestamps: true,          // adds createdAt and updatedAt
    collection: "postings",    // explicit collection name
  }
);

// Prevent model overwrite in Next.js hot reloads
const Posting = models.Posting || model("Posting", PostingSchema, "postings");
export default Posting;
