'use client'

import { Book } from '@/types/interfases'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface LibraryCreateContextProp {
  savedBooks: string[]
  addBook: (book: Book) => void
  removeBook: (book: Book) => void
}

const LibraryCreateContext = createContext({} as LibraryCreateContextProp)
export const useLibrary = () => useContext(LibraryCreateContext)

interface Props {
  children: React.ReactNode
}

const LibraryContext = ({ children }: Props) => {
  const [savedBooks, setSavedBooks] = useState<string[]>([])
  const mounted = useRef(false)

  const addBook = (book: Book) => {
    setSavedBooks(prev =>
      prev.includes(book.ISBN) ? prev : [...prev, book.ISBN]
    )
  }

  const removeBook = (book: Book) => {
    setSavedBooks(prev => prev.filter(bookISBN => bookISBN !== book.ISBN))
  }

  useEffect(() => {
    const handleGetSavedBooksCookies = () => {
      const savedBooksCookies = getCookie('savedBooks') as string

      if (savedBooksCookies) {
        const data = JSON.parse(savedBooksCookies ?? '')
        setSavedBooks(data?.value ?? [])
      }
    }

    if (!mounted.current) {
      handleGetSavedBooksCookies()
      mounted.current = true
      return
    }

    setCookie('savedBooks', JSON.stringify({ value: savedBooks }))

    window.addEventListener('focus', handleGetSavedBooksCookies)
    return () => window.removeEventListener('focus', handleGetSavedBooksCookies)
  }, [savedBooks])

  return (
    <LibraryCreateContext.Provider value={{ savedBooks, addBook, removeBook }}>
      {children}
    </LibraryCreateContext.Provider>
  )
}

export default LibraryContext
