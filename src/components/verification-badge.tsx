import { BadgeCheck, ShieldAlert } from 'lucide-react'
import type { Agent } from '@/lib/types'
import { cn } from '@/lib/utils'

export function VerificationBadge({
  agent,
  className,
}: {
  agent: Pick<Agent, 'verificationStatus'>
  className?: string
}) {
  if (agent.verificationStatus === 'VERIFIED') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-600 text-success',
          className,
        )}
      >
        <BadgeCheck className="size-3.5" />
        Verified
      </span>
    )
  }
  if (agent.verificationStatus === 'SUSPENDED') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-600 text-destructive',
          className,
        )}
      >
        <ShieldAlert className="size-3.5" />
        Suspended
      </span>
    )
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-600 text-muted-foreground',
        className,
      )}
    >
      Pending verification
    </span>
  )
}
