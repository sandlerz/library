import Image from 'next/image'
import NavLinks from './NavLinks'

const Nav = () => {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <Image
        src={'/images/image-nav-separator.png'}
        width={420}
        height={100}
        alt="image decoration"
        className="m-auto h-5"
        style={{ objectFit: 'cover' }}
      />
      <NavLinks />
      <Image
        src={'/images/image-nav-separator.png'}
        width={420}
        height={100}
        alt="image decoration"
        className="m-auto h-5"
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
export default Nav
