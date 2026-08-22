import type { NextFunction, Request, Response } from "express";
import AppError from "../../utils/errorUtils.js";

export default function requireRole(...roles: Array<"admin" | "user">) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
}
