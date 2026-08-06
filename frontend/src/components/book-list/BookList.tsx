import BookCard from '../book-card/BookCard'
import type { Book } from '../../types/book'
import './BookList.scss'

interface BookListProps {
    books: Book[]
    onDeleteBook: (deletedBookId: string) => void
}

function BookList({ books, onDeleteBook }: BookListProps) {
    return (
        <div className="book-list">
            {books.map((book) => (
                <BookCard key={book.id ?? book._id} book={book} onDeleteBook={onDeleteBook} />
            ))}
        </div>
    )
}

export default BookList
