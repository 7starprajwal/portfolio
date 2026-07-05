import { body, validationResult } from "express-validator";

export const createCertificateValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Certificate title is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Certificate title must be between 3 and 100 characters."
    ),

  body("issuer")
    .trim()
    .notEmpty()
    .withMessage("Issuing organization is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Issuing organization must be between 2 and 100 characters."
    ),

  body("issueDate")
    .notEmpty()
    .withMessage("Issue date is required.")
    .isISO8601()
    .withMessage("Invalid issue date."),

  body("credentialId")
    .optional({ checkFalsy: true })
    .trim(),

  body("credentialUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Credential URL is invalid."),

  body("featured")
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage("Featured must be true or false."),

  body("isPublished")
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage(
      "isPublished must be true or false."
    ),

  (req, res, next) => {
    console.log("\n========== CERTIFICATE REQUEST ==========");

    console.log("BODY:");
    console.log(req.body);

    console.log("\nFILES:");
    console.log(req.files);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("\nVALIDATION ERRORS:");
      console.log(
        JSON.stringify(errors.array(), null, 2)
      );

      console.log(
        "=========================================\n"
      );

      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: errors.array(),
      });
    }

    console.log(
      "Validation Passed Successfully."
    );

    console.log(
      "=========================================\n"
    );

    next();
  },
];