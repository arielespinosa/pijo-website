"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface PressSectionProps {
  accentColor: string
}

const pressLogos = [
  { name: "El Pa\u00eds", width: "w-20" },
  { name: "Vogue", width: "w-16" },
  { name: "Forbes", width: "w-20" },
  { name: "GQ", width: "w-12" },
  { name: "El Mundo", width: "w-24" },
]

export function PressSection({ accentColor }: PressSectionProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative py-16 lg:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        <div className="rounded-3xl border border-foreground/[0.06] px-8 py-12 lg:px-16 lg:py-16" style={{ backgroundColor: "rgba(255,255,255,0.015)" }}>
          <p className="mb-10 text-center text-sm font-medium tracking-[0.2em] uppercase text-foreground/30">
            {"Nos han mencionado en"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {pressLogos.map((logo, i) => (
              <div
                key={i}
                className="group flex items-center justify-center opacity-25 transition-all duration-500 hover:opacity-60"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span
                  className="text-xl font-bold tracking-widest text-foreground transition-all duration-500 group-hover:tracking-[0.15em] lg:text-2xl"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-8 text-xs text-foreground/20">
            <span>{"Mejor snack 2025"}</span>
            <span className="h-3 w-px bg-foreground/10" />
            <span>{"Sabor del A\u00f1o"}</span>
            <span className="h-3 w-px bg-foreground/10" />
            <span>{"Marca revelaci\u00f3n"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
