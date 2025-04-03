import React from 'react'
import BookCard from '../book-card/BookCard'

function BooksList({ books, onDeleteBook }) {
    return (
        <div className="books-list">
            {books.map((book) => (
                <BookCard key={book.id} book={book} onDeleteBook={onDeleteBook} />
            ))}
        </div>
    )
}

export default BooksList