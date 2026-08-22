import { Router } from "express";
import {
  banUser,
  createUser,
  deleteUser,
  getStats,
  getUserById,
  getUsers,
  revokeUserSessions,
  unbanUser,
  updateUser,
} from "../controller/adminController.js";
import authMiddleware from "../middleware/auth/authMiddleware.js";
import requireRole from "../middleware/auth/requireRole.js";
import {
  adminUpdateUserRules,
  banUserRules,
  createUserRules,
} from "../middleware/validation/userValidation.js";
import { validateIdParam } from "../middleware/validation/idValidation.js";
import handleValidationError from "../middleware/validation/handeValidationError.js";

const router = Router();

router.use(authMiddleware, requireRole("admin"));

router.get("/stats", getStats);

router.get("/users", getUsers);
router.get("/users/:id", validateIdParam, handleValidationError, getUserById);
router.post("/users", createUserRules, handleValidationError, createUser);
router.put("/users/:id", validateIdParam, adminUpdateUserRules, handleValidationError, updateUser);
router.delete("/users/:id", validateIdParam, handleValidationError, deleteUser);
router.patch("/users/:id/ban", validateIdParam, banUserRules, handleValidationError, banUser);
router.patch("/users/:id/unban", validateIdParam, handleValidationError, unbanUser);
router.post("/users/:id/revoke-sessions", validateIdParam, handleValidationError, revokeUserSessions);

export default router;
