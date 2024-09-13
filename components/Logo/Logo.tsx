'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export function Logo() {
  const router = useRouter()

  return (
    <div
      className="flex h-20 min-h-20 cursor-pointer items-center gap-2 border-b px-6"
      onClick={() => router.push('/')}
    >
      <div className="relative h-16 w-16">
        <Image
          src="/lrb_black.svg"
          alt="Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <h1 className="ml-4 text-xl font-bold">Arvoredo</h1>
    </div>
  )
}
