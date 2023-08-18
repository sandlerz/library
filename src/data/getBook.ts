import { getBooks } from './getBooks'

export const getBook = (book: string) => {
  const books = getBooks()

  return books.find(b => {
    return b.title === decodeURIComponent(book)
  })
}
