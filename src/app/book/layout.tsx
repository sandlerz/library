import BooksCarousel from '../../components/BooksCarousel/BooksCarousel'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative overflow-hidden max-h-[700px] m-auto w-full">
      <div className="w-[70%]">{children}</div>

      <BooksCarousel />
    </div>
  )
}

export default layout
