import type { Request, Response } from "express";
import AppError from "../utils/errorUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getIdParam } from "../utils/requestUtils.js";
import User from "../models/userModel.js";
import Book from "../models/bookModel.js";
import Rental from "../models/rentalModel.js";
import {
  banUserService,
  createUserService,
  deleteUserService,
  getAllUsers,
  getUserByIdService,
  revokeSessionsService,
  unbanUserService,
  updateUserService,
} from "../service/userService.js";
import type { UserCreateRequest, UserUpdateInput } from "../models/userModel.js";

export const getStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const [totalUsers, bannedUsers, totalBooks, availableBooks, activeRentals, overdueRentals] =
    await Promise.all([
      User.countDocuments(),
      User.countDocuments({ banned: true }),
      Book.countDocuments(),
      Book.countDocuments({ availability: true }),
      Rental.countDocuments({ returnedAt: null }),
      Rental.countDocuments({ returnedAt: null, dueAt: { $lt: new Date() } }),
    ]);

  res.status(200).json({
    totalUsers,
    bannedUsers,
    totalBooks,
    availableBooks,
    activeRentals,
    overdueRentals,
  });
});

export const getUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = getIdParam(req);
  const user = await getUserByIdService(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const payload = req.body as UserCreateRequest;
  const savedUser = await createUserService(payload);
  res.status(201).json(savedUser);
});

export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = getIdParam(req);
  const payload = req.body as UserUpdateInput;

  if (req.userId === id && payload.role && payload.role !== "admin") {
    throw new AppError("You cannot change your own admin role", 400);
  }

  const updatedUser = await updateUserService(id, payload);

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = getIdParam(req);
  const deletedUser = await deleteUserService(id);

  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({ message: "User deleted successfully" });
});

export const banUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = getIdParam(req);

  if (req.userId === id) {
    throw new AppError("You cannot ban your own account", 400);
  }

  const { reason } = req.body as { reason?: string };
  const bannedUser = await banUserService(id, reason);

  if (!bannedUser) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(bannedUser);
});

export const unbanUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = getIdParam(req);
  const unbannedUser = await unbanUserService(id);

  if (!unbannedUser) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(unbannedUser);
});

export const revokeUserSessions = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = getIdParam(req);

  const user = await getUserByIdService(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  await revokeSessionsService(id);
  res.status(200).json({ message: "Sessions revoked successfully" });
});
