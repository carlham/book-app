import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Book from "./models/Book.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// app.use(express.static('public'))

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: Error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/api/books", async (req: Request, res: Response) => {
  // Get page and limit from query parameters, defaulting to page 1 and 10 items per page
  let { page, limit } = req.query;
  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;
  const skip = (pageNum - 1) * limitNum;

  try {
    const books = await Book.find().skip(skip).limit(limitNum);
    const count = await Book.countDocuments();
    res.json({
      total: count,
      page: pageNum,
      pages: Math.ceil(count / limitNum),
      books,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// GET /api/books/:id - Retrieve a single book by its ID
app.get("/api/books/:id", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the book" });
  }
});

// POST /api/books - Add a new book
app.post("/api/books", async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

app.delete("/api/books/:id", async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
