import { useState } from 'react'

function DeleteBook({bookId, onDeleteSuccess}) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState(null)

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
                setError(error.message)
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