'use client'

import { useLibrary } from '@/context/LibraryContext'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLinks = () => {
  const pathname = usePathname()
  const { savedBooks } = useLibrary()

  let isActive =
    'relative after:w-full after:h-[1px] after:absolute after:left-0 after:bottom-0 after:bg-white after:rounded-sm'

  return (
    <div className="flex gap-3 items-center text-2xl h-10 text-black font-semibold">
      <Link href={'/'} className={pathname === '/' ? isActive : ''}>
        Books
      </Link>
      <Link href={'/'} className="h-full">
        <Image
          src={'/images/buho-icon.png'}
          width={40}
          height={100}
          alt="buho icon"
          className="h-full"
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <Link
        href={'/saved'}
        className={`relative ${pathname === '/saved' ? isActive : ''}`}
      >
        <span>saved</span>
        {!!savedBooks.length && (
          <span className="absolute right-0 top-0 translate-x-1/2 -translate-y-[10%] text-[#d0f7ff] text-sm border rounded-full w-[20px] h-[20px] grid place-content-center">
            {savedBooks.length}
          </span>
        )}
      </Link>
    </div>
  )
}
export default NavLinks
