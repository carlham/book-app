import type { NextFunction, Request, Response } from "express";
import AppError from "../../utils/errorUtils.js";

export default function notFound(req: Request, res: Response, next: NextFunction) {
  next(new AppError("Route not found", 404));
}