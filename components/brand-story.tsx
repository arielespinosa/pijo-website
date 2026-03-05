"use client"

import { useEffect, useState } from "react"
import { type Product } from "./product-slider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface BrandStoryProps {
  accentColor: string
  product: Product
}

function AnimatedCounter({ target, suffix = "", accentColor }: { target: string; suffix?: string; accentColor: string }) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useScrollReveal()
  const numericTarget = parseInt(target.replace(/\D/g, "")) || 0

  useEffect(() => {
    if (!isVisible || numericTarget === 0) return
    let start = 0
    const duration = 1500
    const increment = numericTarget / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, numericTarget])

  const display = target.includes("%") ? `${count}%` : target.match(/[a-zA-Z]/) ? `${count}${target.replace(/\d/g, "")}` : `${count}`

  return (
    <div ref={ref}>
      <div
        className="text-4xl font-bold tabular-nums lg:text-5xl"
        style={{ color: accentColor, fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {isVisible ? display : "0"}{suffix}
      </div>
    </div>
  )
}

export function BrandStory({ accentColor, product }: BrandStoryProps) {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal()
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal()

  return (
    <section id="historia" className="noise-overlay relative overflow-hidden py-24 lg:py-36">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 25% 50%, ${accentColor}12 0%, transparent 70%),
            radial-gradient(ellipse 30% 40% at 75% 30%, ${accentColor}08 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Text */}
          <div
            ref={textRef}
            className={`order-2 reveal-left lg:order-1 ${textVisible ? "visible" : ""}`}
          >
            <p
              className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase transition-colors duration-700"
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
            <p className="mt-8 text-base leading-relaxed text-foreground/55 lg:text-lg">
              {"PIJO naci\u00f3 con una misi\u00f3n clara: romper con lo tradicional. Cada bolsa cuenta una historia, cada sabor desaf\u00eda lo convencional. Somos una marca irreverente, artesanal y con personalidad propia."}
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/55 lg:text-lg">
              {"Nuestras patatas no son solo un snack \u2014 son una experiencia que se escucha al crujir, que se siente en cada bocado y que se recuerda mucho despu\u00e9s de terminar la bolsa."}
            </p>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { number: "6", label: "Sabores", suffix: "" },
                { number: "100", label: "Artesanal", suffix: "%" },
                { number: "24", label: "Entrega", suffix: "h" },
              ].map((stat) => (
                <div key={stat.label}>
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} accentColor={accentColor} />
                  <div className="mt-2 text-sm text-foreground/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className={`order-1 flex items-center justify-center reveal-right lg:order-2 ${imageVisible ? "visible" : ""}`}
          >
            <div className="relative">
              <div
                className="animate-pulse-glow pointer-events-none absolute inset-0 rounded-3xl blur-[60px] transition-all duration-1000"
                style={{
                  background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
                  transform: "scale(1.4)",
                }}
              />
              <div
                className="relative overflow-hidden rounded-3xl border border-foreground/[0.06] p-8 lg:p-12"
                style={{ backgroundColor: `${product.bgColor}10` }}
              >
                {/* Subtle grid pattern */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />
                <img
                  src={product.image}
                  alt={`PIJO ${product.name}`}
                  className="relative z-10 h-auto w-64 animate-float-slow object-contain sm:w-72 lg:w-80"
                  style={{
                    filter: `drop-shadow(0 20px 50px ${accentColor}25)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
