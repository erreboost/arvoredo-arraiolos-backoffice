import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <div className="flex h-full w-full">
      <div className="hidden h-full w-80 xl:fixed xl:block">
        <Sidebar />
      </div>
      <div className="w-full xl:ml-80">
        <Navbar />
        <div className="bg-[#fafbfc] p-6 dark:bg-secondary">{children}</div>
      </div>
    </div>
  )
}
