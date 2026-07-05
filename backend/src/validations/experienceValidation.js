import Joi from "joi";

export const experienceValidation = Joi.object({
  jobTitle: Joi.string().trim().required().messages({
    "string.empty": "Job title is required",
    "any.required": "Job title is required",
  }),

  companyName: Joi.string().trim().required().messages({
    "string.empty": "Company name is required",
    "any.required": "Company name is required",
  }),

  employmentType: Joi.string()
    .valid(
      "Full-time",
      "Part-time",
      "Internship",
      "Freelance",
      "Contract",
      "Remote"
    )
    .default("Internship"),

  location: Joi.string().allow("").trim(),

  description: Joi.string().allow("").trim(),

  responsibilities: Joi.array().items(Joi.string().trim()).default([]),

  achievements: Joi.array().items(Joi.string().trim()).default([]),

  technologies: Joi.array().items(Joi.string().trim()).default([]),

  startDate: Joi.date().required().messages({
    "date.base": "Start date is invalid",
    "any.required": "Start date is required",
  }),

  endDate: Joi.alternatives().conditional("currentJob", {
    is: true,
    then: Joi.allow(null),
    otherwise: Joi.date().allow(null),
  }),

  currentJob: Joi.boolean().default(false),

  featured: Joi.boolean().default(false),

  published: Joi.boolean().default(true),

  order: Joi.number().integer().min(0).default(0),
});