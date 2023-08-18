'use client'

import { useLibrary } from '@/context/LibraryContext'
import { getBook } from '@/data/getBook'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface Props {
  params: { slug: string }
}

const Page = ({ params }: Props) => {
  const book = getBook(params.slug)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const { addBook, removeBook, savedBooks } = useLibrary()

  useEffect(() => {
    const imageEffect = (event: MouseEvent) => {
      if (!imageRef.current) return

      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window

      const xDeg = (clientX / innerWidth) * 100 - 50
      const yDeg = (clientY / innerHeight) * 100 - 50

      const xDegDiv = (xDeg * -1) / 2.7
      const yDegDiv = yDeg / 2.7

      imageRef.current.style.transform = `
        rotateY(${xDegDiv}deg) 
        rotateX(${yDegDiv}deg) 
        perspective(5000px)
      `
    }

    window.addEventListener('mousemove', imageEffect)

    return () => window.removeEventListener('mousemove', imageEffect)
  }, [imageRef])

  if (!book) return null
  const { title, synopsis, cover, ISBN, author, genre, pages, year } = book

  return (
    <div className="flex flex-col justify-end h-full pb-[40px] max-w-[450px]">
      <Image
        ref={imageRef}
        src={cover}
        width={400}
        height={200}
        alt={`${title} cover`}
        className="absolute left-0 top-[5%] right-0 m-auto -z-10 rounded-lg shadow-2xl shadow-[#6ACED9]"
      />

      <button
        className="absolute bottom-3 left-0 right-0 bg-[#2C5F73] w-[150px] h-[40px] m-auto rounded-lg hover:bg-[#6ACED9] transition-all duration-300"
        onClick={() =>
          savedBooks.includes(book.ISBN) ? removeBook(book) : addBook(book)
        }
      >
        {savedBooks.includes(book.ISBN) ? 'Remove' : 'Save'}
      </button>

      <h1 className="text-6xl font-semibold">{title}</h1>

      <p className="mt-4 text-lg text-gray-400">{synopsis}</p>

      <hr className="my-2" />

      <div className="grid grid-cols-2 grid-rows-3 gap-y-4">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-[#4694A6]">
            {author.name}
          </span>
          <span className="text-gray-400">Author</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold text-[#4694A6]">{pages}</span>
          <span className="text-gray-400">Pages</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold text-[#4694A6]">{genre}</span>
          <span className="text-gray-400">Genre</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold text-[#4694A6]">{year}</span>
          <span className="text-gray-400">Year</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold text-[#4694A6]">{ISBN}</span>
          <span className="text-gray-400">ISBN</span>
        </div>
      </div>

      <hr className="my-2" />

      {!!author.otherBooks.length && (
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-[#4694A6]">
            Author Other Books:
          </span>
          <ul className="text-gray-400">
            {author.otherBooks.map(oBook => (
              <li key={oBook}>{oBook}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default Page
