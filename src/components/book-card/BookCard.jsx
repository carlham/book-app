import React from 'react'
import DeleteBook from './DeleteBook'

function BookCard({ book, onDeleteBook }) {
    return (
        <>
            <div className="book-card">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.description}</p>
                <p>Published: {book.published_year}</p>
            </div>
            <DeleteBook 
                bookId={book._id || book.id}
                onDeleteSuccess={onDeleteBook}    
                
            />
        </>
    )
}

export default BookCard