import {
  createEducation as createEducationService,
  getEducations,
  getEducationById,
  updateEducation as updateEducationService,
  deleteEducation as deleteEducationService,
} from "../services/educationService.js";

import {
  uploadImage,
  deleteImage,
} from "../services/cloudinaryService.js";

// CREATE EDUCATION
export const createEducation = async (req, res) => {
  try {
    let logo = {
      public_id: "",
      url: "",
    };

    if (req.file) {
      logo = await uploadImage(
        req.file.buffer,
        "portfolio/education"
      );
    }

    const data = {
      ...req.body,
    };
if (data.achievements) {
  try {
    data.achievements = JSON.parse(data.achievements);
  } catch {
    data.achievements = data.achievements
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

    const education =
      await createEducationService({
        ...data,
        logo,
      });

    return res.status(201).json({
      success: true,
      message:
        "Education created successfully.",
      education,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL EDUCATIONS
export const getAllEducations = async (
  req,
  res
) => {
  try {
    const {
      search,
      featured,
      published,
      page = 1,
      limit = 100,
      sort = "-startDate",
    } = req.query;

    const result = await getEducations({
      page: Number(page),
      limit: Number(limit),
      search,
      featured:
        featured
          ? featured === "true"
          : undefined,
      published:
        published
          ? published === "true"
          : undefined,
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

// GET EDUCATION BY ID
export const getEducationByIdController =
  async (req, res) => {
    try {
      const education =
        await getEducationById(
          req.params.id
        );

      if (!education) {
        return res.status(404).json({
          success: false,
          message:
            "Education not found.",
        });
      }

      return res.status(200).json({
        success: true,
        education,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// UPDATE EDUCATION
export const updateEducation = async (
  req,
  res
) => {
  try {
    const education =
      await getEducationById(
        req.params.id
      );

    if (!education) {
      return res.status(404).json({
        success: false,
        message:
          "Education not found.",
      });
    }

    let logo = education.logo;

    if (req.file) {
      if (education.logo?.public_id) {
        await deleteImage(
          education.logo.public_id
        );
      }

      logo = await uploadImage(
        req.file.buffer,
        "portfolio/education"
      );
    }

    const data = {
      ...req.body,
    };

    if (data.achievements) {
  try {
    data.achievements = JSON.parse(data.achievements);
  } catch {
    data.achievements = data.achievements
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }
}

    const updatedEducation =
      await updateEducationService(
        req.params.id,
        {
          ...data,
          logo,
        }
      );

    return res.status(200).json({
      success: true,
      message:
        "Education updated successfully.",
      education: updatedEducation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE EDUCATION
export const deleteEducation = async (
  req,
  res
) => {
  try {
    const education =
      await getEducationById(
        req.params.id
      );

    if (!education) {
      return res.status(404).json({
        success: false,
        message:
          "Education not found.",
      });
    }

    if (education.logo?.public_id) {
      await deleteImage(
        education.logo.public_id
      );
    }

    await deleteEducationService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Education deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET FEATURED EDUCATIONS
export const getFeaturedEducations =
  async (req, res) => {
    try {
      const result =
        await getEducations({
          featured: true,
          published: true,
          page: 1,
          limit: 100,
          sort: "order",
        });

      return res.status(200).json({
        success: true,
        educations:
          result.educations,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };