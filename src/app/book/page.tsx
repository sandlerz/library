'use client'

import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  router.back()

  return null
}

export default Page
