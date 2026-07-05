import mongoose from "mongoose";

const adminSettingSchema = new mongoose.Schema(
  {
    profile: {
      name: {
        type: String,
        default: "Prajwal S",
      },

      email: {
        type: String,
        default: "",
      },

      role: {
        type: String,
        default: "Full Stack Developer",
      },

      image: {
        url: {
          type: String,
          default: "",
        },

        publicId: {
          type: String,
          default: "",
        },
      },
    },

    portfolio: {
      portfolioName: {
        type: String,
        default: "Prajwal S Portfolio",
      },

      heroTitle: {
        type: String,
        default: "Full Stack Developer",
      },

      heroDescription: {
        type: String,
        default: "",
      },

      copyright: {
        type: String,
        default: "",
      },
    },

    about: {
      title: {
        type: String,
        default: "About Me",
      },

      description: {
        type: String,
        default: "",
      },

      degree: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },

      university: {
        type: String,
        default: "",
      },

      availabilityText: {
        type: String,
        default: "Open to Work",
      },

      experience: {
        type: Number,
        default: 0,
      },

      projects: {
        type: Number,
        default: 0,
      },

      technologies: {
        type: Number,
        default: 0,
      },

      certificates: {
        type: Number,
        default: 0,
      },
    },

    social: {
      github: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      instagram: {
        type: String,
        default: "",
      },

      leetcode: {
        type: String,
        default: "",
      },

      twitter: {
        type: String,
        default: "",
      },

      youtube: {
        type: String,
        default: "",
      },

      facebook: {
        type: String,
        default: "",
      },

      discord: {
        type: String,
        default: "",
      },

      portfolio: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },
    },

    availability: {
      openToWork: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "AdminSetting",
  adminSettingSchema
);