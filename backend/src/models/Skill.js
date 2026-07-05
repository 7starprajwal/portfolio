import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "Programming",
        "Tools",
        "Cloud",
        "Machine Learning",
        "Other",
      ],
      default: "Other",
    },

    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    experience: {
      type: String,
      default: "",
      trim: true,
    },

    technologies: [
      {
        type: String,
        trim: true,
      },
    ],

    projects: [
      {
        type: String,
        trim: true,
      },
    ],

    icon: {
      public_id: {
        type: String,
        default: "",
      },

      url: {
        type: String,
        default: "",
      },
    },

    color: {
      type: String,
      default: "#06b6d4",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model(
  "Skill",
  skillSchema
);

export default Skill;