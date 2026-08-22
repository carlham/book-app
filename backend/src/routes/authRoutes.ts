import { Router } from "express";
import { logout, refresh, signin, signup } from "../controller/authController.js";
import { validateSigninRules, validateSignupRules } from "../middleware/validation/authValidation.js";
import handleValidationError from "../middleware/validation/handeValidationError.js";
import { sanitizeAuthInput } from "../middleware/sanitizer/authSanitizer.js";
import { rateLimitAuth } from "../middleware/ratelimiter/authRatelimiter.js";

const router = Router();

router.post("/signup", rateLimitAuth, validateSignupRules, handleValidationError, sanitizeAuthInput, signup);
router.post("/signin", rateLimitAuth, validateSigninRules, handleValidationError, signin);
router.post("/refresh", rateLimitAuth, refresh);
router.post("/logout", logout);

export default router;
