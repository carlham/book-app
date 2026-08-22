import crypto from "node:crypto";
import type { JwtPayload } from "jsonwebtoken";
import type { HydratedDocument } from "mongoose";
import User, { type UserDocument } from "../models/userModel.js";
import Session from "../models/sessionModel.js";
import passwordUtils from "../utils/passwordUtils.js";
import tokenUtils from "../utils/tokenUtils.js";
import AppError from "../utils/errorUtils.js";

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

type SigninInput = {
  email: string;
  password: string;
};

type RefreshPayload = JwtPayload & {
  userID: string;
  sessionID: string;
  tokenID: string;
};

async function issueTokens(user: HydratedDocument<UserDocument>) {
  const userId = String(user._id);
  const session = await Session.create({
    userID: userId,
    refreshTokenID: crypto.randomUUID(),
  });
  const sessionId = String(session._id);

  const accessToken = tokenUtils.createAccessToken({
    userID: userId,
    refreshTokenID: sessionId,
    role: user.role,
  });

  const refreshToken = tokenUtils.createRefreshToken({
    userID: userId,
    sessionID: sessionId,
    tokenID: session.refreshTokenID,
  });

  return { user, accessToken, refreshToken };
}

async function signup(input: SignupInput) {
  const existing = await User.findOne({ $or: [{ email: input.email }, { name: input.name }] });
  if (existing) {
    throw new AppError("Name or email is already in use", 409);
  }

  const passwordHash = await passwordUtils.hashPassword(input.password);
  const user = await User.create({
    name: input.name,
    email: input.email,
    passwordHash,
  });

  return issueTokens(user);
}

async function signin(input: SigninInput) {
  const user = await User.findOne({ email: input.email }).select("+passwordHash");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const valid = await passwordUtils.verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.banned) {
    throw new AppError(
      `Your account has been banned${user.banReason ? `: ${user.banReason}` : ""}`,
      403,
    );
  }

  return issueTokens(user);
}

async function refresh(refreshToken: string) {
  let decoded: RefreshPayload;
  try {
    decoded = tokenUtils.verifyRefreshToken(refreshToken) as RefreshPayload;
  } catch {
    throw new AppError("Invalid refresh token", 401);
  }

  const session = await Session.findOne({ _id: decoded.sessionID, userID: decoded.userID });
  if (!session || session.refreshTokenID !== decoded.tokenID) {
    if (session) {
      await Session.deleteOne({ _id: session._id });
    }
    throw new AppError("Invalid refresh token", 401);
  }

  if (session.expiration.getTime() < Date.now()) {
    await Session.deleteOne({ _id: session._id });
    throw new AppError("Session expired", 401);
  }

  const user = await User.findById(session.userID);
  if (!user) {
    await Session.deleteOne({ _id: session._id });
    throw new AppError("User not found", 401);
  }

  session.refreshTokenID = crypto.randomUUID();
  await session.save();

  const sessionId = String(session._id);
  const userId = String(user._id);

  const accessToken = tokenUtils.createAccessToken({
    userID: userId,
    refreshTokenID: sessionId,
    role: user.role,
  });

  const newRefreshToken = tokenUtils.createRefreshToken({
    userID: userId,
    sessionID: sessionId,
    tokenID: session.refreshTokenID,
  });

  return { accessToken, refreshToken: newRefreshToken };
}

async function logout(refreshToken?: string) {
  if (!refreshToken) return;

  try {
    const decoded = tokenUtils.verifyRefreshToken(refreshToken) as RefreshPayload;
    await Session.deleteOne({ _id: decoded.sessionID, userID: decoded.userID });
  } catch {
    // Invalid or already-expired token, nothing to clean up.
  }
}

export default { signup, signin, refresh, logout };
