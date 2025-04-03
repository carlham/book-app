import express from "express"
import mongoose from "mongoose"
import cors from "cors"
const app = express()
const PORT = process.env.PORT || 3000
import Book from "./models/book.js"

app.use(express.json())
app.use(cors())

// app.use(express.static('public'))


mongoose.connect('mongodb://localhost:27017/test')
.then(() => {console.log('Connected to MongoDB')})
.catch((error) => {console.error('Error connecting to MongoDB:', error.message)})

app.get('/api/books', async (req, res) => {
    // Get page and limit from query parameters, defaulting to page 1 and 10 items per page
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const books = await Book.find().skip(skip).limit(limit);
        const count = await Book.countDocuments();
        res.json({
            total: count,
            page,
            pages: Math.ceil(count / limit),
            books
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// GET /api/books/:id - Retrieve a single book by its ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (book) {
            res.json(book)
        } else {
            res.status(404).json({ error: 'Book not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving the book' })
    }
})

// POST /api/books - Add a new book
app.post('/api/books', async (req, res) => {
    try {
        const newBook = new Book(req.body)
        const savedBook = await newBook.save()
        res.status(201).json(savedBook)
    } catch (error) {
        res.status(500).json({ error: 'Failed to add book' })
    }
})

app.delete('/api/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        if (deletedBook) {
            res.status(200).json({ message: 'Book deleted successfully' })
        } else {
            res.status(404).json({ error: 'Book not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete book' })
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})