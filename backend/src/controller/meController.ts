import type { Request, Response } from "express";
import AppError from "../utils/errorUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteUserService,
  getUserByIdService,
  revokeSessionsService,
  updateProfileService,
} from "../service/userService.js";
import type { ProfileUpdateInput } from "../models/userModel.js";

export const getMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.userId) throw new AppError("Unauthorized", 401);

  const user = await getUserByIdService(req.userId);
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json(user);
});

export const updateMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.userId) throw new AppError("Unauthorized", 401);

  const payload = req.body as ProfileUpdateInput;
  const updatedUser = await updateProfileService(req.userId, payload);

  if (!updatedUser) throw new AppError("User not found", 404);

  res.status(200).json(updatedUser);
});

export const revokeMySessions = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.userId) throw new AppError("Unauthorized", 401);

  await revokeSessionsService(req.userId);
  res.status(200).json({ message: "Logged out of all devices" });
});

export const deleteMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.userId) throw new AppError("Unauthorized", 401);

  const deletedUser = await deleteUserService(req.userId);
  if (!deletedUser) throw new AppError("User not found", 404);

  res.status(200).json({ message: "Account deleted successfully" });
});
