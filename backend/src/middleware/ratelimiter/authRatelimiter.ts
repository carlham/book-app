import rateLimit from "express-rate-limit"

export const rateLimitAuth = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many authentication attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false
})
