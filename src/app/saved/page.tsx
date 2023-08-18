'use client'

import ListOfBooks from '@/components/ListOfBooks/ListOfBooks'
import { useLibrary } from '@/context/LibraryContext'
import { getBooks } from '@/data/getBooks'

const Page = () => {
  const data = getBooks()
  const { savedBooks } = useLibrary()

  const booksSaved = data.filter(({ ISBN }) => savedBooks.includes(ISBN))

  return (
    <>
      {booksSaved.length ? (
        <ListOfBooks data={booksSaved} />
      ) : (
        <h1 className="text-4xl text-center text-black mt-20">
          There&apos;re not saved books
        </h1>
      )}
    </>
  )
}

export default Page
