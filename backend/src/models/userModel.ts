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

const User = mongoose.model("User", userSchema);

export default User;
