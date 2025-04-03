import mongoose from "mongoose"
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    genre: String,
    published_year: Number,
    isbn: String,
    description: String,
    availability: {
        type: Boolean,
        default: true
    }
})

const Book = mongoose.model('Book', bookSchema)

export default Book