import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Certificate from "../models/Certificate.js";
import Experience from "../models/Experience.js";
import Education from "../models/Education.js";
import Contact from "../models/Contact.js";
import Resume from "../models/Resume.js";
import AdminSetting from "../models/AdminSetting.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      projects,
      skills,
      certificates,
      experiences,
      education,
      messages,
      resumes,
      settings,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Certificate.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Contact.countDocuments(),
      Resume.countDocuments(),
      AdminSetting.findOne(),
    ]);

    const recentMessages = await Contact.find({
      isRead: false,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      stats: {
        projects,
        skills,
        certificates,
        experiences,
        education,
        messages,
        resumes,

        resumeUploaded: resumes > 0,

        openToWork:
          settings?.availability?.openToWork ??
          false,
      },

      recentMessages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
      error: error.message,
    });
  }
};