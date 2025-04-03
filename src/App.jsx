import { useEffect, useState } from 'react'
import { 
  BooksList,
  PaginationControls,
  ErrorMessage,
  LoadingIndicator
} from './components'
import './App.css'
import DeleteBook from './components/book-card/DeleteBook'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage, setBooksPerPage] = useState(10)

  const fetchBooks = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/api/books?page=${currentPage}&limit=${booksPerPage}`)
      .then(response => response.json())
      .then(json => {
        console.log("Api res:", json)
        setData(json)
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchBooks()
  }, [currentPage, booksPerPage])

  const handleDeleteBook = (deletedBookId) => {
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

  const handleBooksPerPageChange = (e) => {
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
          <PaginationControls 
            currentPage={data.page}
            totalPages={data.pages}
            totalBooks={data.total}
            booksPerPage={booksPerPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            onBooksPerPageChange={handleBooksPerPageChange}
            />

            <BooksList books={data.books} onDeleteBook={handleDeleteBook} />
        </>
      )}
    </>
  )
}

export default App
