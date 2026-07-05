import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Internship",
        "Freelance",
        "Contract",
        "Remote",
      ],
      default: "Internship",
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    companyLogo: {
      public_id: {
        type: String,
        default: "",
      },
      secure_url: {
        type: String,
        default: "",
      },
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],

    achievements: [
      {
        type: String,
        trim: true,
      },
    ],

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    currentJob: {
      type: Boolean,
      default: false,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
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

export default mongoose.model("Experience", experienceSchema);