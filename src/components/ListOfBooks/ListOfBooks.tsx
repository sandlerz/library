'use client'

import { getBooks } from '@/data/getBooks'
import { Book } from '@/types/interfases'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'

interface Props {
  data: Book[]
}

const ListOfBooks = ({ data }: Props) => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const maxPages = data.reduce((prev, curr) => Math.max(prev, curr.pages), 0)
  const minPages = data.reduce(
    (prev, curr) => Math.min(prev, curr.pages),
    maxPages
  )

  const rangeMin = Math.ceil(minPages / 100) * 100
  const rangeMax = Math.ceil(maxPages / 100) * 100

  const [rangeFilter, setRangeFilter] = useState(rangeMax)

  const books = data
    .filter(({ genre }) => filter === 'all' || filter === genre)
    .filter(({ pages }) => rangeFilter >= pages)
    .filter(
      ({ title }) =>
        search === '' || title.toLowerCase().includes(search.toLowerCase())
    )

  const genres = data.reduce(
    (prev, curr) => (!prev.includes(curr.genre) ? [...prev, curr.genre] : prev),
    [] as string[]
  )

  const handleSelect = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => setFilter(value)

  const handleRange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setRangeFilter(Number(value))

  return (
    <>
      <div className="flex gap-10 mb-6">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-[#c5c56e]">
            Filtrar por pagina
          </span>
          <input
            onChange={handleRange}
            type="range"
            min={rangeMin}
            max={rangeMax}
            value={rangeFilter}
            step={100}
          />
          <span className="text-gray-400">{rangeFilter} pages</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-[#c5c56e]">
            Filtrar por genero
          </span>
          <select
            className="w-[200px] bg-slate-600 rounded-md"
            onChange={handleSelect}
            value={filter}
          >
            <option value="all">All</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-[#c5c56e]">Buscar:</span>
          <input
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
            type="text"
            className="bg-[#475569] text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-[1%]">
        {books.map(({ cover, title, ISBN }) => (
          <Link href={`/book/${title}`} key={ISBN} className="w-[13%]">
            <Image
              key={ISBN}
              src={cover}
              width={200}
              height={200}
              alt={title}
              className="w-full h-full object-cover"
            />
          </Link>
        ))}
      </div>
    </>
  )
}
export default ListOfBooks
