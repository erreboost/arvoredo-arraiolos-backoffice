import { Logo } from '@/components/Logo'

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Logo />
      <h1 className="my-2 text-3xl">Dashboard</h1>
      <h2 className="mb-3 text-2xl">LRB</h2>
      {children}
    </div>
  )
}
