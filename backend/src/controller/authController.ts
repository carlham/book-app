import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import authService from "../service/authService.js";
import cookieUtils from "../utils/cookieUtils.js";
import AppError from "../utils/errorUtils.js";

export const signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };
  const { user, accessToken, refreshToken } = await authService.signup({ name, email, password });

  cookieUtils.setRefreshCookie(res, refreshToken);
  res.status(201).json({
    accessToken,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

export const signin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };
  const { user, accessToken, refreshToken } = await authService.signin({ email, password });

  cookieUtils.setRefreshCookie(res, refreshToken);
  res.status(200).json({
    accessToken,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.refreshToken as string | undefined;
  if (!token) {
    throw new AppError("No refresh token provided", 401);
  }

  const { accessToken, refreshToken } = await authService.refresh(token);
  cookieUtils.setRefreshCookie(res, refreshToken);
  res.status(200).json({ accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.refreshToken as string | undefined;
  await authService.logout(token);
  cookieUtils.clearCookies(res);
  res.status(200).json({ message: "Logged out successfully" });
});
