import type { Request, Response } from "express";
import AppError from "../utils/errorUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createUserService,
  deleteUserService,
  getAllUsers,
  getUserByIdService,
  updateUserService,
} from "../service/userService.js";

export const getUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const user = await getUserByIdService(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const savedUser = await createUserService(req.body as Record<string, unknown>);
  res.status(201).json(savedUser);
});

export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const updatedUser = await updateUserService(id, req.body as Record<string, unknown>);

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const deletedUser = await deleteUserService(id);

  if (!deletedUser) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({ message: "User deleted successfully" });
});

const userController = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userController;
