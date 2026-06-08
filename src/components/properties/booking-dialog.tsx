'use client'

import { useEffect, useState } from 'react'
import { Check, Loader2, Lock, Smartphone, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { formatKes } from '@/lib/format'
import type { Property } from '@/lib/types'
import { cn } from '@/lib/utils'

type Step = 'details' | 'locking' | 'stk' | 'success' | 'failed'

const BOOKING_FEE = 200

export function BookingDialog({
  property,
  open,
  onOpenChange,
}: {
  property: Property
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [step, setStep] = useState<Step>('details')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (open) {
      setStep('details')
      setPhone('')
      setDate('')
    }
  }, [open])

  useEffect(() => {
    if (step !== 'stk') return
    setSeconds(25)
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer)
          setStep('success')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [step])

  function startBooking() {
    setStep('locking')
    setTimeout(() => setStep('stk'), 1600)
  }

  const phoneValid = /^(?:254|0)?7\d{8}$/.test(phone.replace(/\s/g, ''))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {step === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading">Book a viewing</DialogTitle>
              <DialogDescription>
                Lock this property for 24 hours with a refundable booking fee.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-1">
              <div className="rounded-lg border bg-muted/40 p-3">
                <p className="line-clamp-1 font-600">{property.title}</p>
                <p className="text-sm text-muted-foreground">
                  {property.locationGeneral}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visit-date">Preferred visit date</Label>
                <Input
                  id="visit-date"
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">M-Pesa phone number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    inputMode="tel"
                    placeholder="0712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Booking fee</span>
                <span className="font-700">{formatKes(BOOKING_FEE)}</span>
              </div>
              <Button
                className="w-full"
                disabled={!phoneValid || !date}
                onClick={startBooking}
              >
                <Lock className="size-4" />
                Pay & lock property
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Fee is refunded if the agent fails to show up for the viewing.
              </p>
            </div>
          </>
        )}

        {step === 'locking' && (
          <StatusPane
            icon={<Loader2 className="size-7 animate-spin text-primary" />}
            title="Locking property…"
            body="Reserving this listing so no one else can book it."
          />
        )}

        {step === 'stk' && (
          <StatusPane
            icon={<Smartphone className="size-7 text-primary" />}
            title="Check your phone"
            body={`We sent an M-Pesa prompt to ${phone}. Enter your PIN to confirm the ${formatKes(
              BOOKING_FEE,
            )} booking fee.`}
          >
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Waiting for confirmation · {seconds}s
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4"
              onClick={() => setStep('failed')}
            >
              Cancel request
            </Button>
          </StatusPane>
        )}

        {step === 'success' && (
          <StatusPane
            icon={
              <div className="flex size-14 items-center justify-center rounded-full bg-success/15">
                <Check className="size-7 text-success" />
              </div>
            }
            title="Booking confirmed!"
            body="Your property is locked. View the details and visit countdown in your dashboard."
          >
            <div className="mt-4 flex w-full flex-col gap-2">
              <a href="/dashboard/bookings" className={buttonVariants({ className: 'w-full' })}>
                Go to my bookings
              </a>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </StatusPane>
        )}

        {step === 'failed' && (
          <StatusPane
            icon={
              <div className="flex size-14 items-center justify-center rounded-full bg-destructive/15">
                <X className="size-7 text-destructive" />
              </div>
            }
            title="Payment not completed"
            body="The request was cancelled or timed out. The property has been released."
          >
            <div className="mt-4 flex w-full flex-col gap-2">
              <Button className="w-full" onClick={() => setStep('details')}>
                Try again
              </Button>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </StatusPane>
        )}
      </DialogContent>
    </Dialog>
  )
}

function StatusPane({
  icon,
  title,
  body,
  children,
}: {
  icon: React.ReactNode
  title: string
  body: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('flex flex-col items-center py-6 text-center')}>
      <DialogTitle className="sr-only">{title}</DialogTitle>
      {icon}
      <h3 className="mt-4 font-heading text-lg font-700">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{body}</p>
      {children}
    </div>
  )
}
