import { body, query } from "express-validator";

export const createRentalRules = [
  body("bookId")
    .trim()
    .notEmpty().withMessage("bookId is required")
    .isMongoId().withMessage("bookId must be a valid id"),
];

export const listRentalsRules = [
  query("bookId").optional().isMongoId().withMessage("bookId must be a valid id"),
];
