import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/errorUtils.js";
import { getIdParam } from "../utils/requestUtils.js";
import {
  getAllRentalsService,
  getMyRentalsService,
  rentBookService,
  returnBookService,
} from "../service/rentalService.js";

export const createRental = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.body as { bookId: string };
  if (!req.userId) throw new AppError("Unauthorized", 401);

  const rental = await rentBookService(req.userId, bookId);
  res.status(201).json(rental);
});

export const returnRental = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = getIdParam(req);
  if (!req.userId || !req.userRole) throw new AppError("Unauthorized", 401);

  const rental = await returnBookService(req.userId, req.userRole, id);
  res.status(200).json(rental);
});

export const getMyRentals = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.userId) throw new AppError("Unauthorized", 401);

  const rentals = await getMyRentalsService(req.userId);
  res.status(200).json(rentals);
});

export const getAllRentals = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const overdue = req.query.overdue === "true";
  const bookId = typeof req.query.bookId === "string" ? req.query.bookId : undefined;
  const rentals = await getAllRentalsService({ overdue, bookId });
  res.status(200).json(rentals);
});
