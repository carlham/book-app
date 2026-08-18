import Book, { type BookCreateInput, type BookDocument, type BookUpdateInput } from "../models/bookModel.js";

export const getAllBooks = async (
  page: number,
  limit: number,
): Promise<{ total: number; page: number; pages: number; books: BookDocument[] }> => {
  const skip = (page - 1) * limit;
  const [books, total] = await Promise.all([
    Book.find().skip(skip).limit(limit),
    Book.countDocuments(),
  ]);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    books,
  };
};

export const getBookByIdService = async (id: string): Promise<BookDocument | null> => {
  return Book.findById(id);
};

export const createBookService = async (payload: BookCreateInput): Promise<BookDocument> => {
  const newBook = new Book(payload);
  return newBook.save();
};

export const updateBookService = async (
  id: string,
  payload: BookUpdateInput,
): Promise<BookDocument | null> => {
  return Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteBookService = async (id: string): Promise<BookDocument | null> => {
  return Book.findByIdAndDelete(id);
};
