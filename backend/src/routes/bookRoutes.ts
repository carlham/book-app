import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controller/bookController.js";
import authMiddleware from "../middleware/auth/authMiddleware.js";
import requireRole from "../middleware/auth/requireRole.js";
import { createBookRules, updateBookRules } from "../middleware/validation/bookValidation.js";
import { validateIdParam } from "../middleware/validation/idValidation.js";
import handleValidationError from "../middleware/validation/handeValidationError.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", validateIdParam, handleValidationError, getBookById);
router.post("/", authMiddleware, requireRole("admin"), createBookRules, handleValidationError, createBook);
router.put(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  validateIdParam,
  updateBookRules,
  handleValidationError,
  updateBook,
);
router.delete("/:id", authMiddleware, requireRole("admin"), validateIdParam, handleValidationError, deleteBook);

export default router;
