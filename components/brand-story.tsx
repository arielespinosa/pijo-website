"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface BrandStoryProps {
  accentColor: string
}

export function BrandStory({ accentColor }: BrandStoryProps) {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal()

  return (
    <section id="historia" className="noise-overlay relative overflow-hidden py-24 lg:py-36">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 50% 50%, ${accentColor}12 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div
          ref={textRef}
          className={`reveal-up ${textVisible ? "visible" : ""}`}
        >
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-700"
            style={{ color: accentColor }}
          >
            Nuestra historia
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            No hacemos patatas.
            <br />
            <span style={{ color: accentColor }}>{"Creamos conversaci\u00f3n."}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-foreground/55 lg:text-lg">
            {"PIJO naci\u00f3 con una misi\u00f3n clara: romper con lo tradicional. Cada bolsa cuenta una historia, cada sabor desaf\u00eda lo convencional. Somos una marca irreverente, artesanal y con personalidad propia."}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/55 lg:text-lg">
            {"Nuestras patatas no son solo un snack \u2014 son una experiencia que se escucha al crujir, que se siente en cada bocado y que se recuerda mucho despu\u00e9s de terminar la bolsa."}
          </p>

          {/* Founder signature */}
          <div className="mt-12">
            <p
              className="text-3xl italic tracking-wide lg:text-4xl"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: accentColor,
              }}
            >
              {"Andr\u00e9s Ara\u00e9z"}
            </p>
            <p className="mt-2 text-sm text-foreground/40">{"Fundador de PIJO"}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
