import { useState } from 'react'
import { deleteBook } from '../../services/bookService'
import './DeleteBook.scss'

interface DeleteBookProps {
    bookId: string
    onDeleteSuccess: (deletedBookId: string) => void
}

function DeleteBook({ bookId, onDeleteSuccess }: DeleteBookProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            setIsDeleting(true)
            setError(null)

            try {
                await deleteBook(bookId)
                onDeleteSuccess(bookId)
            } catch (error) {
                setError(error instanceof Error ? error.message : String(error))
                console.error("Error deleting book:", error)
            } finally {
                setIsDeleting(false)
            }
        }
    }

    return (
        <div className="delete-book">
            <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="delete-button"
            >
                {isDeleting ? 'Deleting...' : 'Delete Book'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default DeleteBook
