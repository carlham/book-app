import DeleteBook from '../delete-book/DeleteBook'
import type { Book } from '../../types/book'
import './BookCard.scss'

interface BookCardProps {
    book: Book
    onDeleteBook: (deletedBookId: string) => void
}

function BookCard({ book, onDeleteBook }: BookCardProps) {
    return (
        <>
            <div className="book-card">
                <h2 className="book-card__title">{book.title}</h2>
                <p className="book-card__author">{book.author}</p>
                <p className="book-card__genre">{book.genre}</p>
                <p className="book-card__description">{book.description}</p>
                <p className="book-card__published">Published: {book.published_year}</p>
                <DeleteBook
                    bookId={(book._id || book.id)!}
                    onDeleteSuccess={onDeleteBook}

                />
            </div>

        </>
    )
}

export default BookCard
