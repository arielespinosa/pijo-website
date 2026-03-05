"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface TestimonialsSectionProps {
  accentColor: string
}

const testimonials = [
  {
    text: "Las saco en las fiestas y desaparecen en minutos. Son otro nivel.",
    author: "Mar\u00eda G.",
    role: "Foodie & Influencer",
    rating: 5,
  },
  {
    text: "El sabor a aceituna negra es una locura. No vuelvo a las t\u00edpicas del s\u00faper.",
    author: "Carlos R.",
    role: "Chef Privado",
    rating: 5,
  },
  {
    text: "Cada bolsa genera conversaci\u00f3n. El packaging es incre\u00edble.",
    author: "Laura P.",
    role: "Directora Creativa",
    rating: 5,
  },
  {
    text: "El ajo caba\u00f1il me transport\u00f3 a la casa de mi abuela. Sabor incre\u00edble.",
    author: "Javier M.",
    role: "Escritor Gastron\u00f3mico",
    rating: 5,
  },
  {
    text: "Por fin una marca de patatas con personalidad real. Adicta al lim\u00f3n y pimienta.",
    author: "Ana S.",
    role: "Sommelier",
    rating: 5,
  },
]

export function TestimonialsSection({ accentColor }: TestimonialsSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.05 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const next = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="relative py-24 lg:py-36">
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${accentColor}06 50%, transparent 100%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`mb-16 text-center reveal ${titleVisible ? "visible" : ""}`}
        >
          <p
            className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase transition-colors duration-700"
            style={{ color: accentColor }}
          >
            Lo que dicen
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {"Adicci\u00f3n a primera bolsa"}
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-4 text-sm text-foreground/40">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-current" style={{ color: accentColor }} />
              ))}
            </div>
            <span>4.9 / 5 de 2.400+ fans</span>
          </div>
        </div>

        {/* Desktop: show 3 cards, Mobile: carousel */}
        <div
          ref={cardsRef}
          className={`reveal ${cardsVisible ? "visible" : ""}`}
        >
          {/* Desktop grid */}
          <div className="hidden gap-6 md:grid md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-foreground/[0.06] p-8 transition-all duration-500 hover:border-foreground/15"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div
                  className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100"
                  style={{ backgroundColor: `${accentColor}15` }}
                />
                <div className="mb-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-current transition-colors duration-500"
                      style={{ color: `${accentColor}80` }}
                    />
                  ))}
                </div>
                <p className="relative text-lg font-medium leading-relaxed text-foreground/85">
                  {`\u201C${t.text}\u201D`}
                </p>
                <div className="relative mt-8 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-500"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-foreground/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <div
                className="transition-all duration-500"
                key={activeTestimonial}
              >
                <div className="rounded-2xl border border-foreground/[0.06] p-8" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <div className="mb-4 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" style={{ color: `${accentColor}80` }} />
                    ))}
                  </div>
                  <p className="text-lg font-medium leading-relaxed text-foreground/85">
                    {`\u201C${testimonials[activeTestimonial].text}\u201D`}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {testimonials[activeTestimonial].author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{testimonials[activeTestimonial].author}</p>
                      <p className="text-xs text-foreground/40">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button onClick={prev} className="rounded-full border border-foreground/15 p-2 text-foreground/40 transition-all hover:text-foreground" aria-label="Anterior testimonio">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeTestimonial ? "1.5rem" : "0.375rem",
                      backgroundColor: i === activeTestimonial ? accentColor : "rgba(255,255,255,0.15)",
                    }}
                    aria-label={`Testimonio ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="rounded-full border border-foreground/15 p-2 text-foreground/40 transition-all hover:text-foreground" aria-label="Siguiente testimonio">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
