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

export type BookCreateInput = {
  title: string;
  author?: string | null;
  genre?: string | null;
  published_year?: Date | null;
  isbn?: string | null;
  description?: string | null;
  availability?: boolean;
};

export type BookUpdateInput = Partial<BookCreateInput>;

const Book = mongoose.model("Book", bookSchema);

export default Book;
