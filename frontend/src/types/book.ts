export interface Book {
  _id?: string
  id?: string
  title: string
  author?: string
  genre?: string
  published_year?: number
  isbn?: string
  description?: string
  availability?: boolean
}

export interface BooksResponse {
  total: number
  page: number
  pages: number
  books: Book[]
}
