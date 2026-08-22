import { param } from "express-validator";

export const validateIdParam = [
  param("id").isMongoId().withMessage("Invalid id format"),
];
