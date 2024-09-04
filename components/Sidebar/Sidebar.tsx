import { Logo } from '../Logo'
import { SidebarRoutes } from '../SidebarRoutes'

export function Sidebar() {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-col border-r">
        <Logo />
        <SidebarRoutes />
      </div>
    </div>
  )
}
