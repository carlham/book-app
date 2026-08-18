import User, { type UserCreateInput, type UserDocument, type UserUpdateInput } from "../models/userModel.js";

export const getAllUsers = async (): Promise<UserDocument[]> => {
  return User.find();
};

export const getUserByIdService = async (id: string): Promise<UserDocument | null> => {
  return User.findById(id);
};

export const createUserService = async (payload: UserCreateInput): Promise<UserDocument> => {
  const newUser = new User(payload);
  return newUser.save();
};

export const updateUserService = async (
  id: string,
  payload: UserUpdateInput,
): Promise<UserDocument | null> => {
  return User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteUserService = async (id: string): Promise<UserDocument | null> => {
  return User.findByIdAndDelete(id);
};
