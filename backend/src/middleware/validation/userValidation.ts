import { body } from "express-validator";

const nameRule = () =>
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters")
    .matches(/^[\p{L}\p{M}\s.'-]+$/u).withMessage("Name can only contain letters, spaces, hyphens, apostrophes, and periods")
    .escape();

const emailRule = () =>
  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail();

const ageRule = () =>
  body("age")
    .optional()
    .isInt({ min: 0, max: 150 }).withMessage("Age must be a valid number")
    .toInt();

const genderRule = () =>
  body("gender")
    .optional()
    .isIn(["male", "female", "non_binary", "other", "unspecified"]).withMessage("Invalid gender value");

const passwordRule = () =>
  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage("Password must contain uppercase, lowercase and number");

export const updateProfileRules = [nameRule(), emailRule(), ageRule(), genderRule()];

export const adminUpdateUserRules = [
  ...updateProfileRules,
  body("role").optional().isIn(["admin", "user"]).withMessage("Role must be admin or user"),
];

export const banUserRules = [
  body("reason")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("Ban reason must be at most 500 characters")
    .escape(),
];

export const createUserRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3, max: 100 }).withMessage("Name must be between 3 and 100 characters")
    .matches(/^[\p{L}\p{M}\s.'-]+$/u).withMessage("Name can only contain letters, spaces, hyphens, apostrophes, and periods")
    .escape(),
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(),
  passwordRule(),
  ageRule(),
  genderRule(),
  body("role").optional().isIn(["admin", "user"]).withMessage("Role must be admin or user"),
];
