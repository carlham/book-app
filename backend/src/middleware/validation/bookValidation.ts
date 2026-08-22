import { body } from "express-validator"

const titleRule = () =>
    body("title")
        .trim()
        .isString().withMessage("Title must be a string")
        .isLength({ min: 1, max: 200 }).withMessage("Title must be between 1 and 200 characters")
        .escape()

const authorRule = () =>
    body("author")
        .optional({ values: "falsy" })
        .trim()
        .isString().withMessage("Author must be a string")
        .isLength({ max: 200 }).withMessage("Author must be at most 200 characters")
        .escape()

const genreRule = () =>
    body("genre")
        .optional({ values: "falsy" })
        .trim()
        .isString().withMessage("Genre must be a string")
        .isLength({ max: 100 }).withMessage("Genre must be at most 100 characters")
        .escape()

const publishedYearRule = () =>
    body("published_year")
        .optional({ values: "falsy" })
        .isInt({ min: -3000, max: new Date().getFullYear() }).withMessage("Published year must be a valid year")
        .toInt()

const isbnRule = () =>
    body("isbn")
        .optional({ values: "falsy" })
        .trim()
        .isISBN().withMessage("Must be a valid ISBN")

const descriptionRule = () =>
    body("description")
        .optional({ values: "falsy" })
        .trim()
        .isString().withMessage("Description must be a valid string")
        .isLength({ max: 750 }).withMessage("The length of the description must be at most 750 characters")
        .escape()

const availabilityRule = () =>
    body("availability")
        .optional()
        .isBoolean().withMessage("Availability has to be true or false")
        .toBoolean()

export const createBookRules = [
    titleRule(),
    authorRule(),
    genreRule(),
    publishedYearRule(),
    isbnRule(),
    descriptionRule(),
    availabilityRule(),
]

export const updateBookRules = [
    titleRule().optional({ values: "falsy" }),
    authorRule(),
    genreRule(),
    publishedYearRule(),
    isbnRule(),
    descriptionRule(),
    availabilityRule(),
]
