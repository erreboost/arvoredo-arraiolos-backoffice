import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { SidebarRoutes } from '../SidebarRoutes'
import { ToggleTheme } from '@/components/ToggleTheme'

export function Navbar() {
  return (
    <nav className="flex h-20 w-full items-center justify-between gap-x-4 border-b bg-background px-2 md:px-6">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className="relative w-[300px]"></div>
      <div className="flex items-center gap-x-2">
        <ToggleTheme />
      </div>
    </nav>
  )
}
