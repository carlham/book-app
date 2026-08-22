import { Router } from "express";
import {
  createRental,
  getAllRentals,
  getMyRentals,
  returnRental,
} from "../controller/rentalController.js";
import authMiddleware from "../middleware/auth/authMiddleware.js";
import requireRole from "../middleware/auth/requireRole.js";
import { createRentalRules, listRentalsRules } from "../middleware/validation/rentalValidation.js";
import { validateIdParam } from "../middleware/validation/idValidation.js";
import handleValidationError from "../middleware/validation/handeValidationError.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createRentalRules, handleValidationError, createRental);
router.get("/me", getMyRentals);
router.patch("/:id/return", validateIdParam, handleValidationError, returnRental);
router.get("/", requireRole("admin"), listRentalsRules, handleValidationError, getAllRentals);

export default router;
