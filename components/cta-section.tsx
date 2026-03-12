"use client"

import { ChevronRight, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface CTASectionProps {
  accentColor: string
  bgColor: string
}

export function CTASection({ accentColor, bgColor }: CTASectionProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="noise-overlay relative overflow-hidden py-24 lg:py-36">
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${bgColor}25 0%, transparent 70%)`,
        }}
      />
      {/* Animated lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${accentColor} 0px, ${accentColor} 1px, transparent 1px, transparent 80px)`,
        }}
      />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        <div
          className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accentColor}12` }}
        >
          <Sparkles className="h-6 w-6" style={{ color: accentColor }} />
        </div>

        <h2
          className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {"Empieza a comer "}
          <span style={{ color: accentColor }}>diferente</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/50 lg:text-lg">
          {"Elige tu sabor favorito, pide tu pack y descubre por qu\u00e9 nadie vuelve a las patatas de siempre. Tu yo del futuro te lo agradecer\u00e1."}
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#contacto"
            className="btn-ripple group flex items-center gap-2 rounded-full px-10 py-4 text-base font-bold tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: accentColor,
              color: "#080810",
              boxShadow: `0 8px 40px ${accentColor}35`,
            }}
          >
            Contactar
            <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            "100% Natural",
            "Sin gluten",
            "Hecho en Espa\u00f1a",
          ].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-700"
              style={{
                borderColor: `${accentColor}30`,
                backgroundColor: `${accentColor}08`,
                color: accentColor,
              }}
            >
              <span
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
