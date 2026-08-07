import mongoose, { type InferSchemaType } from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  genre: String,
  published_year: Date,
  isbn: String,
  description: String,
  availability: {
    type: Boolean,
    default: true,
  },
});

export type BookDocument = InferSchemaType<typeof bookSchema>;

const Book = mongoose.model("Book", bookSchema);

export default Book;
