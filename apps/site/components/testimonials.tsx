"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { useSiteI18n } from "@/lib/site-i18n"
import { cn } from "@/lib/utils"

export default function Testimonials() {
  const { t } = useSiteI18n()
  const items = t.testimonials.items
  const topRow = [items[0], items[1], items[2]]
  const bottomRow = [items[3], items[1], items[0]]

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 mx-auto max-w-2xl space-y-5 text-center">
          <h2 className="text-balance text-4xl font-medium tracking-tight lg:text-5xl">
            {t.testimonials.title}
          </h2>
          <p className="text-muted-foreground">{t.testimonials.subtitle}</p>
        </div>

        <div className="relative space-y-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent"
          />

          <InfiniteSlider className="py-2" gap={20} speed={26} speedOnHover={14}>
            {topRow.map((item) => (
              <TestimonialCard
                isFeatured={item.name === items[0].name}
                key={`top-${item.name}`}
                name={item.name}
                role={item.role}
                text={item.text}
              />
            ))}
          </InfiniteSlider>

          <InfiniteSlider className="py-2" gap={20} reverse speed={24} speedOnHover={12}>
            {bottomRow.map((item) => (
              <TestimonialCard
                key={`bottom-${item.name}`}
                name={item.name}
                role={item.role}
                text={item.text}
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  text,
  name,
  role,
  isFeatured = false,
}: {
  text: string
  name: string
  role: string
  isFeatured?: boolean
}) {
  return (
    <Card
      className={cn(
        "w-[20rem] shrink-0 rounded-[1.75rem] border-black/8 bg-white/92 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.45)] backdrop-blur-sm md:w-[22rem]",
        isFeatured && "md:w-[28rem]"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted-foreground">MindPocket</p>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{role}</span>
        </div>
      </CardHeader>
      <CardContent className="grid min-h-52 grid-rows-[1fr_auto] gap-6 pt-0">
        <blockquote>
          <p
            className={cn(
              "text-base leading-8 text-slate-800",
              isFeatured && "text-xl font-medium"
            )}
          >
            {text}
          </p>
        </blockquote>
        <Author name={name} role={role} />
      </CardContent>
    </Card>
  )
}

function Author({ name, role }: { name: string; role: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3">
      <Avatar className="size-12 border border-sky-100 bg-sky-50">
        <AvatarFallback className="bg-sky-50 text-sky-700">{initials}</AvatarFallback>
      </Avatar>
      <div>
        <cite className="text-sm font-medium not-italic text-slate-900">{name}</cite>
        <span className="text-muted-foreground block text-sm">{role}</span>
      </div>
    </div>
  )
}
