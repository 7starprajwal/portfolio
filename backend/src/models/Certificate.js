import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    issuer: {
      type: String,
      required: true,
      trim: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    credentialId: {
      type: String,
      default: "",
      trim: true,
    },

    credentialUrl: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      public_id: String,
      url: String,
    },

    // NEW
    certificatePdf: {
      public_id: String,
      url: String,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      default: "Certificate",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Certificate",
  certificateSchema
);