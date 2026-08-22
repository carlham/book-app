import type { Request } from "express";
import AppError from "./errorUtils.js";

export function getIdParam(req: Request): string {
  const id = req.params.id;
  const value = Array.isArray(id) ? id[0] : id;

  if (!value) {
    throw new AppError("Invalid id", 400);
  }

  return value;
}
