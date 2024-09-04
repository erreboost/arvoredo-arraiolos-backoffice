import { CustomIcon } from '@/components/CustomIcon'
import { CardSumProps } from './CardSum.types'
import { CustomTooltip } from '@/components/CustomTooltip'
import { cn } from '@/lib/utils'
import { MoveDownRight, MoveUpRight, TrendingUp } from 'lucide-react'

export function CardSum(props: CardSumProps) {
  const { icon: Icon, total, average, title, tooltipText } = props
  return (
    <div className="shadow-dm rounded-lg bg-background p-5 py-3 transition hover:shadow-lg">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <CustomIcon icon={Icon} />
          {title}
        </div>
        <CustomTooltip content={tooltipText} />
      </div>
      <div className="mt-2 flex gap-4 md:mt-4">
        <p className="text-2xl">{total}</p>
        <div
          className={cn(
            'flex h-[20px] items-center gap-1 rounded-lg bg-black px-2 text-xs text-white dark:bg-secondary'
          )}
        >
          {average}%
          {average < 20 && (
            <MoveDownRight strokeWidth={2} className="h-4 w-4" />
          )}
          {average >= 20 && average < 70 && (
            <MoveUpRight strokeWidth={2} className="h-4 w-4" />
          )}
          {average >= 70 && average < 100 && (
            <TrendingUp strokeWidth={2} className="h-4 w-4" />
          )}
        </div>
      </div>
    </div>
  )
}
