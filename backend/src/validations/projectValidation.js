import { body } from "express-validator";

export const createProjectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Project title must be between 3 and 100 characters."),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required.")
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required.")
    .isLength({ min: 10, max: 200 })
    .withMessage(
      "Short description must be between 10 and 200 characters."
    ),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ min: 30 })
    .withMessage(
      "Description must contain at least 30 characters."
    ),

  body("githubUrl")
    .optional()
    .isURL()
    .withMessage("GitHub URL is invalid."),

  body("liveUrl")
    .optional()
    .isURL()
    .withMessage("Live URL is invalid."),

  body("category")
    .optional()
    .isIn([
      "Full Stack",
      "Frontend",
      "Backend",
      "Machine Learning",
      "Python",
      "Java",
      "C++",
      "Other",
    ])
    .withMessage("Invalid category."),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false."),
];