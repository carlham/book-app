import type { NextFunction, Request, Response } from "express";

export type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

export const asyncHandler = (fn: AsyncController) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
