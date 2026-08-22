import { Router } from "express";
import { deleteMe, getMe, revokeMySessions, updateMe } from "../controller/meController.js";
import authMiddleware from "../middleware/auth/authMiddleware.js";
import { updateProfileRules } from "../middleware/validation/userValidation.js";
import handleValidationError from "../middleware/validation/handeValidationError.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getMe);
router.put("/", updateProfileRules, handleValidationError, updateMe);
router.delete("/", deleteMe);
router.delete("/sessions", revokeMySessions);

export default router;
