import { body } from "express-validator"

export const validateSignupRules = [
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
        .normalizeEmail()
        .escape(),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage("Password must contain uppercase, lowercase and number"),

    body("confirmPassword")
        .trim()
        .notEmpty().withMessage("Password confirmation is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match")
            }
            return true
        })
]

export const validateSigninRules = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail()
        .escape(),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
]