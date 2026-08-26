import type { BooksResponse } from '../types/book'

export async function getBooks(page: number, limit: number): Promise<BooksResponse> {
    const res = await fetch(`/api/books?page=${page}&limit=${limit}`)
    if (!res.ok) {
        throw new Error('Failed to fetch books')
    }
    return res.json() as Promise<BooksResponse>
}

export async function deleteBook(bookId: string): Promise<void> {
    const res = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE'
    })
    if (!res.ok) {
        throw new Error('Failed to delete book')
    }
}
