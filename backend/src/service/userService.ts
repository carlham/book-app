import User, {
  type UserCreateRequest,
  type UserDocument,
  type UserUpdateInput,
  type ProfileUpdateInput,
} from "../models/userModel.js";
import Session from "../models/sessionModel.js";
import Rental from "../models/rentalModel.js";
import passwordUtils from "../utils/passwordUtils.js";
import AppError from "../utils/errorUtils.js";

export const getAllUsers = async (): Promise<UserDocument[]> => {
  return User.find();
};

export const getUserByIdService = async (id: string): Promise<UserDocument | null> => {
  return User.findById(id);
};

export const createUserService = async (payload: UserCreateRequest): Promise<UserDocument> => {
  const passwordHash = await passwordUtils.hashPassword(payload.password);
  const newUser = new User({
    name: payload.name,
    email: payload.email,
    passwordHash,
    age: payload.age,
    gender: payload.gender,
    role: payload.role,
  });
  await newUser.save();

  // select: false only applies to query projections, not to a document that
  // was constructed in memory and saved, so re-fetch through a query to make
  // sure passwordHash never reaches the response.
  const created = await User.findById(newUser._id);
  if (!created) {
    throw new AppError("Failed to create user", 500, false);
  }
  return created;
};

// Fields are whitelisted explicitly rather than passed through from the raw
// request body, otherwise a client could set unrelated schema fields (e.g.
// role, banned) that happen to share a name with something in their payload.
export const updateUserService = async (
  id: string,
  payload: UserUpdateInput,
): Promise<UserDocument | null> => {
  const existing = await User.findById(id);
  if (!existing) return null;

  const roleChanged = payload.role !== undefined && payload.role !== existing.role;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name: payload.name,
      email: payload.email,
      age: payload.age,
      gender: payload.gender,
      role: payload.role,
    },
    { new: true, runValidators: true },
  );

  // An issued access token embeds the role at sign-in time and is trusted as-is
  // by authMiddleware, so a role change has to kill existing sessions to take
  // effect immediately rather than waiting for the access token to expire.
  if (updatedUser && roleChanged) {
    await revokeSessionsService(id);
  }

  return updatedUser;
};

export const updateProfileService = async (
  id: string,
  payload: ProfileUpdateInput,
): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(
    id,
    {
      name: payload.name,
      email: payload.email,
      age: payload.age,
      gender: payload.gender,
    },
    { new: true, runValidators: true },
  );
};

export const deleteUserService = async (id: string): Promise<UserDocument | null> => {
  const activeRental = await Rental.findOne({ userID: id, returnedAt: null });
  if (activeRental) {
    throw new AppError("Cannot delete a user with active book rentals", 409);
  }

  const deletedUser = await User.findByIdAndDelete(id);
  if (deletedUser) {
    await revokeSessionsService(id);
  }

  return deletedUser;
};

export const revokeSessionsService = async (userId: string): Promise<void> => {
  await Session.deleteMany({ userID: userId });
};

export const banUserService = async (
  id: string,
  reason?: string,
): Promise<UserDocument | null> => {
  const user = await User.findByIdAndUpdate(
    id,
    { banned: true, bannedAt: new Date(), banReason: reason ?? null },
    { new: true, runValidators: true },
  );
  if (user) {
    await revokeSessionsService(id);
  }
  return user;
};

export const unbanUserService = async (id: string): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(
    id,
    { banned: false, bannedAt: null, banReason: null },
    { new: true, runValidators: true },
  );
};
