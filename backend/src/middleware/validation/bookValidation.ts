import { body } from "express-validator"

const title = [
    body("title")
        .trim()
        .escape()
        .isString().withMessage("Book tile must be a string")
        .isLength({ min: 1, max: 100 }).withMessage("The length of the book title must be between 1 and 100 characters")
]

const author = [
    body("author")
        .trim()
        .escape()
        .isString().withMessage("Author must be a string")
]

const genre = [
    body("genre")
        .trim()
        .escape()
        .isString().withMessage("Genre must be a string")
]

const published_year = [
    body("published_year")
        .isDate().withMessage("Published year must be a valid date")
]

const isbn = [
    body("isbn")
        .trim()
        .escape()
        .isISBN().withMessage("Must be a valid ISBN")
]

const description = [
    body("description")
        .trim()
        .escape()
        .isString().withMessage("Description must be a valid string")
        .isLength({ min: 1, max: 750 }).withMessage("The length of the description must be between 1 and 750 characters")
]

const availability = [
    body("availability")
        .isBoolean().withMessage("Availability has to be true or false")
]

export default {
    title,
    author,
    genre,
    published_year,
    isbn,
    description,
    availability
}