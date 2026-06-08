import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  value,
  size = 14,
  className,
  showValue = false,
}: {
  value: number
  size?: number
  className?: string
  showValue?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(
            i <= Math.round(value)
              ? 'fill-warning text-warning'
              : 'fill-muted text-muted',
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-600 text-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  )
}

export function InteractiveStars({
  value,
  onChange,
  size = 28,
}: {
  value: number
  onChange: (v: number) => void
  size?: number
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-label={`Rate ${i} of 5`}
          onClick={() => onChange(i)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            style={{ width: size, height: size }}
            className={cn(
              i <= value ? 'fill-warning text-warning' : 'fill-muted text-muted-foreground/40',
            )}
          />
        </button>
      ))}
    </div>
  )
}
