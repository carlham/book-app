import User from "../models/userModel.js";

export const getAllUsers = async () => {
  return User.find();
};

export const getUserByIdService = async (id: string) => {
  return User.findById(id);
};

export const createUserService = async (payload: Record<string, unknown>) => {
  const newUser = new User(payload as any);
  return newUser.save();
};

export const updateUserService = async (id: string, payload: Record<string, unknown>) => {
  return User.findByIdAndUpdate(id, payload as any, {
    new: true,
    runValidators: true,
  });
};

export const deleteUserService = async (id: string) => {
  return User.findByIdAndDelete(id);
};
