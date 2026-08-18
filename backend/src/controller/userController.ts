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
import type { UserCreateInput, UserUpdateInput } from "../models/userModel.js";

export const getUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await getUserByIdService(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(user);
});

export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const payload = req.body as UserCreateInput;
  const savedUser = await createUserService(payload);
  res.status(201).json(savedUser);
});

export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    throw new AppError("Invalid user id", 400);
  }

  const payload = req.body as UserUpdateInput;
  const updatedUser = await updateUserService(id, payload);

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!id) {
    throw new AppError("Invalid user id", 400);
  }

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
