'use client'

import { getBooks } from '@/data/getBooks'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { usePathname } from 'next/navigation'
import { Book } from '@/types/interfases'
import { useLibrary } from '@/context/LibraryContext'

const BooksCarousel = () => {
  const books = getBooks()
  const pathname = usePathname()
  const { savedBooks } = useLibrary()

  const linksItem = (book: Book) => {
    const href = `/book/${encodeURIComponent(book.title)}`
    const isActive = href === pathname

    return (
      <SwiperSlide key={book.ISBN}>
        <Link
          className={`relative flex gap-3 backdrop-blur-sm bg-[#2C5F73]/20 shadow-lg p-4 rounded-2xl items-center ${
            isActive ? 'bg-[#F2EB85]/20' : ''
          }
          `}
          href={href}
        >
          {savedBooks.includes(book.ISBN) && (
            <span className="absolute right-2 top-1 text-[#4adae5]">
              Saved 💾
            </span>
          )}
          <Image
            src={book.cover}
            width={80}
            height={100}
            className="max-h-[100px]"
            alt="book"
            style={{ objectFit: 'contain' }}
          />
          <div className="flex flex-col">
            <span className="text-lg">{book.title}</span>
            <span className="text-gray-400">Author: {book.author.name}</span>
          </div>
        </Link>
      </SwiperSlide>
    )
  }

  return (
    <div className="w-[30%] flex flex-col gap-2 overflow-auto">
      <h3>List of Books:</h3>

      <Swiper direction="vertical" slidesPerView={4.5}>
        {books.map(book => linksItem(book))}
      </Swiper>
    </div>
  )
}
export default BooksCarousel
