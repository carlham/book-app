import Rental from "../models/rentalModel.js";
import Book from "../models/bookModel.js";
import AppError from "../utils/errorUtils.js";

const RENTAL_PERIOD_DAYS = 14;

export const rentBookService = async (userId: string, bookId: string) => {
  const book = await Book.findById(bookId);
  if (!book) throw new AppError("Book not found", 404);
  if (!book.availability) throw new AppError("Book is not available for rent", 409);

  let rental;
  try {
    rental = await Rental.create({
      userID: userId,
      bookID: bookId,
      dueAt: new Date(Date.now() + RENTAL_PERIOD_DAYS * 24 * 60 * 60 * 1000),
    });
  } catch (error) {
    if (error instanceof Error && "code" in error && (error as { code?: number }).code === 11000) {
      throw new AppError("Book is not available for rent", 409);
    }
    throw error;
  }

  try {
    book.availability = false;
    await book.save();
  } catch (error) {
    // Best-effort compensation: these two writes aren't in a transaction
    // (that needs a replica set), so if the second write fails, undo the
    // first rather than leaving a "rented" Rental with no unavailable book.
    await Rental.deleteOne({ _id: rental._id }).catch(() => {});
    throw error;
  }

  return rental;
};

export const returnBookService = async (userId: string, userRole: string, rentalId: string) => {
  const rental = await Rental.findById(rentalId);
  if (!rental) throw new AppError("Rental not found", 404);

  if (rental.userID.toString() !== userId && userRole !== "admin") {
    throw new AppError("You are not allowed to return this rental", 403);
  }

  if (rental.returnedAt) throw new AppError("Book has already been returned", 400);

  rental.returnedAt = new Date();
  await rental.save();

  await Book.findByIdAndUpdate(rental.bookID, { availability: true });

  return rental;
};

export const getMyRentalsService = async (userId: string) => {
  return Rental.find({ userID: userId }).populate("bookID").sort({ rentedAt: -1 });
};

export const getAllRentalsService = async (options?: { overdue?: boolean; bookId?: string }) => {
  const filter: Record<string, unknown> = {};
  if (options?.overdue) {
    filter.returnedAt = null;
    filter.dueAt = { $lt: new Date() };
  }
  if (options?.bookId) {
    filter.bookID = options.bookId;
  }

  return Rental.find(filter).populate("bookID").populate("userID").sort({ rentedAt: -1 });
};
