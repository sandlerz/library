import ListOfBooks from '@/components/ListOfBooks/ListOfBooks'
import { getBooks } from '@/data/getBooks'

const Home = () => {
  const data = getBooks()

  return (
    <>
      <ListOfBooks data={data} />
    </>
  )
}

export default Home
