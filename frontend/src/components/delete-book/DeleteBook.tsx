import { useState } from 'react'
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
                const response = await fetch(`http://localhost:3000/api/books/${bookId}`, {
                    method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('Failed to delete book')
            }

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
