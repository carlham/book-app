import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/errorUtils.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createBookService,
  deleteBookService,
  getAllBooks,
  getBookByIdService,
  updateBookService,
} from "../service/bookService.js";

export const getBooks = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { page, limit } = req.query;
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const books = await getAllBooks(pageNum, limitNum);
  res.status(200).json(books);
});

export const getBookById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const book = await getBookByIdService(id);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  res.status(200).json(book);
});

export const createBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const savedBook = await createBookService(req.body as Record<string, unknown>);
  res.status(201).json(savedBook);
});

export const updateBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const updatedBook = await updateBookService(id, req.body as Record<string, unknown>);

  if (!updatedBook) {
    throw new AppError("Book not found", 404);
  }

  res.status(200).json(updatedBook);
});

export const deleteBook = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;
  const deletedBook = await deleteBookService(id);

  if (!deletedBook) {
    throw new AppError("Book not found", 404);
  }

  res.status(200).json({ message: "Book deleted successfully" });
});

const bookController = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

export default bookController;
