import library from '@/data.json'
import { Book, LibraryRoot } from '@/types/interfases'

export const getBooks = (): Book[] =>
  (library as LibraryRoot).library.map(book => book.book)
