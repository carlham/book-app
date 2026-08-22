import mongoose, { type InferSchemaType } from "mongoose";

const rentalSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  rentedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueAt: {
    type: Date,
    required: true,
  },
  returnedAt: {
    type: Date,
    default: null,
  },
});

rentalSchema.index(
  { bookID: 1 },
  { unique: true, partialFilterExpression: { returnedAt: null } },
);

export type RentalDocument = InferSchemaType<typeof rentalSchema>;

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;
