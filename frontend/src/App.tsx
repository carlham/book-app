import { useEffect, useState, type ChangeEvent } from 'react'
import BookList from './components/book-list/BookList'
import PaginationControls from './components/pagination-controls/PaginationControls'
import ErrorMessage from './components/utils/error-message/ErrorMessage'
import LoadingIndicator from './components/utils/loading-indicator/LoadingIndicator'
import type { BooksResponse } from './types/book'
import './App.css'

function App() {
  const [data, setData] = useState<BooksResponse | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage, setBooksPerPage] = useState(10)

  const fetchBooks = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/api/books?page=${currentPage}&limit=${booksPerPage}`)
      .then(response => response.json())
      .then((json: BooksResponse) => {
        console.log("Api res:", json)
        setData(json)
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchBooks()
  }, [currentPage, booksPerPage])

  const handleDeleteBook = (deletedBookId: string) => {
    if (data && data.books) {
      const updatedBooks = data.books.filter(
        book => (book.id !== deletedBookId && book._id !== deletedBookId)
      )

      setData({
        ...data,
        books: updatedBooks,
        total: data.total - 1
      })

      if (updatedBooks.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      } else {
        fetchBooks()
      }
    }
  }

  const handleNextPage = () => {
    if (data && currentPage < data.pages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleBooksPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBooksPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      <h1>Book list</h1>
      {data && <h2>{data.total} books</h2>}
      {isLoading && <LoadingIndicator />}
      {error && <ErrorMessage error={error} />}

      {data && data.books && (
        <>

          <BookList books={data.books} onDeleteBook={handleDeleteBook} />
          <PaginationControls
            currentPage={data.page}
            totalPages={data.pages}
            booksPerPage={booksPerPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            onBooksPerPageChange={handleBooksPerPageChange}
          />

        </>
      )}
    </>
  )
}

export default App
