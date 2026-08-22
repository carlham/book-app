import mongoose, { type InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female", "non_binary", "other", "unspecified"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  banned: {
    type: Boolean,
    default: false,
  },
  bannedAt: {
    type: Date,
    default: null,
  },
  banReason: {
    type: String,
    default: null,
  },
});

export type UserDocument = InferSchemaType<typeof userSchema>;

export type UserCreateInput = {
  name: string;
  email: string;
  passwordHash: string;
  age?: number | null;
  gender?: "male" | "female" | "non_binary" | "other" | "unspecified" | null;
  role?: "admin" | "user";
};

export type UserUpdateInput = Partial<UserCreateInput>;

export type UserCreateRequest = {
  name: string;
  email: string;
  password: string;
  age?: number | null;
  gender?: "male" | "female" | "non_binary" | "other" | "unspecified" | null;
  role?: "admin" | "user";
};

export type ProfileUpdateInput = {
  name?: string;
  email?: string;
  age?: number | null;
  gender?: "male" | "female" | "non_binary" | "other" | "unspecified" | null;
};

const User = mongoose.model("User", userSchema);

export default User;
