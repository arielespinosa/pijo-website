"use client"

import { Zap, Ear, Eye, Flame } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface SensorySectionProps {
  accentColor: string
  bgColor: string
}

const senses = [
  {
    icon: Ear,
    title: "Escucha el crujido",
    description: "Cada patata cruje con una intensidad que solo la elaboraci\u00f3n artesanal consigue.",
    stat: "140dB",
    statLabel: "de crujido perfecto",
  },
  {
    icon: Eye,
    title: "M\u00edrala de cerca",
    description: "Corte ultrafino y textura irregular. La imperfecci\u00f3n del sabor artesanal hecha visible.",
    stat: "2mm",
    statLabel: "de grosor ideal",
  },
  {
    icon: Flame,
    title: "Siente el sabor",
    description: "Saborizantes naturales y recetas de autor. Cada mordisco es un viaje gustativo.",
    stat: "100%",
    statLabel: "ingredientes naturales",
  },
  {
    icon: Zap,
    title: "Adicci\u00f3n instant\u00e1nea",
    description: "El efecto PIJO: una vez que pruebas, no hay vuelta atr\u00e1s. Lo dicen nuestros fans.",
    stat: "97%",
    statLabel: "repiten compra",
  },
]

export function SensorySection({ accentColor, bgColor }: SensorySectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 30%, ${bgColor}15 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 80%, ${bgColor}08 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`mb-20 text-center reveal ${titleVisible ? "visible" : ""}`}
        >
          <p
            className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase transition-colors duration-700"
            style={{ color: accentColor }}
          >
            Experiencia sensorial
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {"No es solo comer."}
            <br />
            <span style={{ color: accentColor }}>Es sentir.</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className={`grid gap-5 md:grid-cols-2 lg:grid-cols-4 reveal-scale ${gridVisible ? "visible" : ""}`}
        >
          {senses.map((sense, i) => {
            const Icon = sense.icon
            return (
              <div
                key={i}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/[0.06] p-8 transition-all duration-500 hover:border-foreground/12"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-[50px] transition-opacity duration-700 group-hover:opacity-100"
                  style={{ backgroundColor: `${accentColor}12` }}
                />

                <div className="flex-1">
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${accentColor}12` }}
                  >
                    <Icon className="h-5 w-5 transition-colors duration-500" style={{ color: accentColor }} />
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-foreground">{sense.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/50">{sense.description}</p>
                </div>

                <div className="mt-6 border-t border-foreground/[0.06] pt-5">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: accentColor, fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {sense.stat}
                  </div>
                  <div className="mt-1 text-xs text-foreground/35">{sense.statLabel}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
