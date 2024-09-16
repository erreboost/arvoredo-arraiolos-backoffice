"use client";
import Image from "next/image";
import Link from "next/link";
export function Logo() {
  return (
    <div className="flex h-20 min-h-20 items-center gap-2 border-b px-6">
      <div className="relative h-16 w-16">
        <Link href={"https://lrb.pt/"}>
          <Image
            src="/lrb_black.svg"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
      </div>
      <h1 className="ml-4 text-xl font-bold">Arvoredo</h1>
    </div>
  );
}
