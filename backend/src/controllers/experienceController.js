import {
  createExperience as createExperienceService,
  getExperiences as getExperiencesService,
  getPublishedExperiences as getPublishedExperiencesService,
  getExperienceById as getExperienceByIdService,
  updateExperience as updateExperienceService,
  deleteExperience as deleteExperienceService,
} from "../services/experienceService.js";

import { experienceValidation } from "../validations/experienceValidation.js";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

const parseJsonFields = (body) => {
  const fields = [
    "technologies",
    "responsibilities",
    "achievements",
  ];

  fields.forEach((field) => {
    if (typeof body[field] === "string") {
      try {
        body[field] = JSON.parse(body[field]);
      } catch (error) {
        body[field] = [];
      }
    }
  });
};

/*
|--------------------------------------------------------------------------
| Create Experience
|--------------------------------------------------------------------------
*/

export const createExperience = async (req, res, next) => {
  try {

    console.log("========== BODY ==========");
console.log(req.body);

console.log("========== FILE ==========");
console.log(req.file);
    parseJsonFields(req.body);

    const { error, value } = experienceValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details
          .map((item) => item.message)
          .join(", "),
      });
    }

    const experience = await createExperienceService(
      value,
      req.file
    );

    res.status(201).json({
      success: true,
      message: "Experience created successfully.",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get All Experiences
|--------------------------------------------------------------------------
*/

export const getExperiences = async (req, res, next) => {
  try {
    const experiences = await getExperiencesService(req.query);

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Published Experiences
|--------------------------------------------------------------------------
*/

export const getPublishedExperiences = async (
  req,
  res,
  next
) => {
  try {
    const experiences =
      await getPublishedExperiencesService();

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Experience By ID
|--------------------------------------------------------------------------
*/

export const getExperienceById = async (
  req,
  res,
  next
) => {
  try {
    const experience =
      await getExperienceByIdService(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Experience
|--------------------------------------------------------------------------
*/

export const updateExperience = async (
  req,
  res,
  next
) => {
  try {
    parseJsonFields(req.body);

    const { error, value } = experienceValidation.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details
          .map((item) => item.message)
          .join(", "),
      });
    }

    const experience =
      await updateExperienceService(
        req.params.id,
        value,
        req.file
      );

    res.status(200).json({
      success: true,
      message: "Experience updated successfully.",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Experience
|--------------------------------------------------------------------------
*/

export const deleteExperience = async (
  req,
  res,
  next
) => {
  try {
    const result = await deleteExperienceService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};