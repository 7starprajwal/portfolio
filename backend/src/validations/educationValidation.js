import { body, validationResult } from "express-validator";

export const createEducationValidation = [
  body("degree")
    .trim()
    .notEmpty()
    .withMessage("Degree is required."),

  body("institution")
    .trim()
    .notEmpty()
    .withMessage("Institution is required."),

  body("specialization")
    .optional()
    .trim(),

  body("university")
    .optional()
    .trim(),

  body("location")
    .optional()
    .trim(),

  body("cgpa")
    .optional()
    .trim(),

  body("description")
    .optional()
    .trim(),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage("Invalid start date."),

  body("endDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid end date."),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false."),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("Published must be true or false."),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a positive number."),

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