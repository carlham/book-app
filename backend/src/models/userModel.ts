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
    enum: ["male", "female", "non_binary", "other", "unspecified"]
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = mongoose.model("User", userSchema);

export default User;
