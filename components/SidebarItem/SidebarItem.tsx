'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SidebarItemProps } from './SidebarItem.types'

export function SidebarItem(props: SidebarItemProps) {
  const { item } = props
  const { href, icon: Icon, label } = item

  const pathName = usePathname()
  const activePath = pathName === href
  return (
    <Link
      href={href}
      className={cn(
        'light:text-slate-700 mt-2 flex cursor-pointer items-center gap-x-2 rounded-lg p-2 text-sm hover:bg-slate-300/20 dark:text-white',
        activePath && 'bg-slate-400/20'
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1} />
      {label}
    </Link>
  )
}
