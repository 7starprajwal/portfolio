import { body, validationResult } from "express-validator";

export const createSkillValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Skill name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Skill name must be between 2 and 50 characters."
    ),

  body("category")
    .notEmpty()
    .withMessage("Category is required.")
    .isIn([
      "Frontend",
      "Backend",
      "Database",
      "Programming",
      "Tools",
      "Cloud",
      "Machine Learning",
      "Other",
    ])
    .withMessage("Invalid category."),

  body("level")
    .notEmpty()
    .withMessage("Skill level is required.")
    .isInt({
      min: 0,
      max: 100,
    })
    .withMessage(
      "Skill level must be between 0 and 100."
    ),

  body("color")
    .optional()
    .isString()
    .withMessage("Color must be a string."),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage(
      "Featured must be true or false."
    ),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage(
      "Published must be true or false."
    ),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Order must be a positive integer."
    ),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];