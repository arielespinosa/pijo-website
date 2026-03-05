"use client"

import { useRef, useState } from "react"
import { type Product } from "./product-slider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface FlavorGridProps {
  products: Product[]
  activeIndex: number
  onSelect: (index: number) => void
}

function TiltCard({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -12, y: x * 12 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x || tilt.y ? 1.04 : 1})`,
        transition: "transform 0.2s ease-out, box-shadow 0.3s, background-color 0.5s, border-color 0.5s",
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function FlavorGrid({ products, activeIndex, onSelect }: FlavorGridProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="sabores" className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`mb-20 text-center reveal ${titleVisible ? "visible" : ""}`}
        >
          <p
            className="mb-4 text-sm font-semibold tracking-[0.2em] uppercase transition-colors duration-700"
            style={{ color: products[activeIndex].accentColor }}
          >
            Nuestra gama
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {"Sabores que no"}
            <br />
            {"pasan desapercibidos"}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/50 lg:text-lg">
            {"Cada bolsa genera conversaci\u00f3n. Cada sabor crea adicci\u00f3n. Descubre la gama completa de patatas PIJO."}
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 lg:gap-5 reveal-scale ${gridVisible ? "visible" : ""}`}
        >
          {products.map((product, i) => {
            const isActive = i === activeIndex
            return (
              <TiltCard
                key={product.id}
                onClick={() => onSelect(i)}
                className={`group relative flex flex-col items-center gap-4 rounded-2xl border p-4 lg:p-5 ${
                  isActive
                    ? "border-transparent"
                    : "border-foreground/[0.06] hover:border-foreground/15"
                }`}
                style={{
                  backgroundColor: isActive ? `${product.bgColor}25` : "rgba(255,255,255,0.02)",
                  boxShadow: isActive
                    ? `0 12px 50px ${product.accentColor}18, inset 0 1px 0 ${product.accentColor}15`
                    : "none",
                } as React.CSSProperties}
              >
                {/* Active indicator ring */}
                {isActive && (
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl transition-all duration-500"
                    style={{
                      border: `1.5px solid ${product.accentColor}40`,
                    }}
                  />
                )}

                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={`PIJO ${product.name}`}
                    className={`h-full w-full object-contain transition-all duration-500 ${
                      isActive ? "scale-110" : "group-hover:scale-108"
                    }`}
                    style={{
                      filter: isActive
                        ? `drop-shadow(0 10px 25px ${product.accentColor}30)`
                        : "none",
                    }}
                  />
                </div>
                <div className="text-center">
                  <h3
                    className={`text-sm font-bold transition-colors duration-300 lg:text-base ${
                      isActive ? "text-foreground" : "text-foreground/70"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-foreground/40">{product.weight}</p>
                </div>
                <div
                  className="h-0.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: isActive ? product.accentColor : "rgba(255,255,255,0.06)",
                    width: isActive ? "2rem" : "0.75rem",
                  }}
                />
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
