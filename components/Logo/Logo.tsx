'use client';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
export function Logo() {
  const router = useRouter();

  return (
    <div
      className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer gap-2"
      onClick={() => router.push('/')}
    >
      <Image src="/lrb_black.svg" alt="Logo" width={70} height={70} priority />
      <h1 className="font-bold text-xl ml-4 ">Arvoredo</h1>
    </div>
  );
}
