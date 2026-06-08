import { Lock, ShieldCheck, Smartphone } from 'lucide-react'
import { Card } from '@/components/ui/card'

const signals = [
  {
    icon: ShieldCheck,
    title: 'Verified Agents',
    body: 'Every agent is physically verified by a field officer before they can list. Look for the verified badge.',
  },
  {
    icon: Lock,
    title: 'Smart Locking System',
    body: 'Lock your chosen property for 3 days so no one else can book it while you decide.',
  },
  {
    icon: Smartphone,
    title: 'M-Pesa Native Payments',
    body: 'Pay securely with an STK Push straight to your phone. No cards, no hidden fees.',
  },
]

const steps = [
  { n: 1, title: 'Search', body: 'Discover verified properties near you.' },
  { n: 2, title: 'Lock', body: 'Hold your choice for 3 days.' },
  { n: 3, title: 'Pay', body: 'Complete payment via M-Pesa STK Push.' },
  { n: 4, title: 'Unlock', body: 'See exact location and contact the agent.' },
  { n: 5, title: 'Confirm & rate', body: 'Confirm your visit and rate the experience.' },
]

export function TrustAndSteps() {
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-2xl font-700 sm:text-3xl">
            Trust and transparency, built in
          </h2>
          <p className="mt-2 text-pretty text-muted-foreground">
            We designed MyKeja to remove the risk from house hunting in Kenya.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {signals.map((s) => (
            <Card key={s.title} className="p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="size-5.5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-600">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </Card>
          ))}
        </div>

        <div id="how-it-works" className="mt-20 scroll-mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-heading text-2xl font-700 sm:text-3xl">
              How it works
            </h2>
            <p className="mt-2 text-muted-foreground">
              From search to keys, in five simple steps.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <li
                key={step.n}
                className="relative rounded-xl border border-border bg-background p-5"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-primary font-heading font-700 text-primary-foreground">
                  {step.n}
                </span>
                <h3 className="mt-3 font-600">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
