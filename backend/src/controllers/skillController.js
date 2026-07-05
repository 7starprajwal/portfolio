import {
  createSkill as createSkillService,
  getSkills,
  getSkillById,
  updateSkill as updateSkillService,
  deleteSkill as deleteSkillService,
} from "../services/skillService.js";

import {
  uploadImage,
  deleteImage,
} from "../services/cloudinaryService.js";

// CREATE SKILL
export const createSkill = async (req, res) => {
  try {
    let icon = {
      public_id: "",
      url: "",
    };

    if (req.file) {
      icon = await uploadImage(
        req.file.buffer,
        "portfolio/skills"
      );
    }

    const data = {
      ...req.body,
    };

    if (data.technologies) {
      data.technologies = JSON.parse(
        data.technologies
      );
    }

    if (data.projects) {
      data.projects = JSON.parse(
        data.projects
      );
    }

    const skill = await createSkillService({
      ...data,
      icon,
    });

    return res.status(201).json({
      success: true,
      message: "Skill created successfully.",
      skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL SKILLS
export const getAllSkills = async (req, res) => {
  try {
     
    const {
      search,
      category,
      featured,
      published,
      page = 1,
      limit = 100,
      sort = "-createdAt",
    } = req.query;

    const result = await getSkills({
      page: Number(page),
      limit: Number(limit),
      search,
      category,
      featured:
  featured ? featured === "true" : undefined,

published:
  published ? published === "true" : undefined,
      sort,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SKILL BY ID
export const getSkillByIdController = async (
  req,
  res
) => {
  try {
    const skill = await getSkillById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    return res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE SKILL
export const updateSkill = async (req, res) => {
  try {
    const skill = await getSkillById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    let icon = skill.icon;

    if (req.file) {
      if (skill.icon?.public_id) {
        await deleteImage(skill.icon.public_id);
      }

      icon = await uploadImage(
        req.file.buffer,
        "portfolio/skills"
      );
    }

    const data = {
      ...req.body,
    };

    if (data.technologies) {
      data.technologies = JSON.parse(
        data.technologies
      );
    }

    if (data.projects) {
      data.projects = JSON.parse(
        data.projects
      );
    }

    const updatedSkill =
      await updateSkillService(req.params.id, {
        ...data,
        icon,
      });

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      skill: updatedSkill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE SKILL
export const deleteSkill = async (req, res) => {
  try {
    const skill = await getSkillById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    if (skill.icon?.public_id) {
      await deleteImage(skill.icon.public_id);
    }

    await deleteSkillService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET FEATURED SKILLS
export const getFeaturedSkills = async (
  req,
  res
) => {
  
  try {
  const result = await getSkills({
  page: Number(page),
  limit: Number(limit),
  search,
  category,
  featured:
    featured ? featured === "true" : undefined,
  published:
    published ? published === "true" : undefined,
  sort,
});

    return res.status(200).json({
      success: true,
      skills: result.skills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};