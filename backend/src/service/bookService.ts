import Book from "../models/bookModel.js";

export const getAllBooks = async (page: number, limit: number) => {
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

export const getBookByIdService = async (id: string) => {
  return Book.findById(id);
};

export const createBookService = async (payload: Record<string, unknown>) => {
  const newBook = new Book(payload as any);
  return newBook.save();
};

export const updateBookService = async (id: string, payload: Record<string, unknown>) => {
  return Book.findByIdAndUpdate(id, payload as any, {
    new: true,
    runValidators: true,
  });
};

export const deleteBookService = async (id: string) => {
  return Book.findByIdAndDelete(id);
};
