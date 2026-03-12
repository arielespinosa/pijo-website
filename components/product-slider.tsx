"use client"

import { useCallback, useEffect, useRef, useState, memo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface Product {
  id: number
  name: string
  subtitle: string
  description: string
  tagline: string
  image: string
  bgColor: string
  accentColor: string
  textColor: string
  weight: string
}

interface ProductSliderProps {
  products: Product[]
  activeIndex: number
  onIndexChange: (index: number) => void
}

// Memoized product image component for better performance
const ProductImage = memo(function ProductImage({
  product,
  isActive,
  slot,
  isMobile,
}: {
  product: Product
  isActive: boolean
  slot: number
  isMobile: boolean
}) {
  return (
    <img
      src={product.image}
      alt={`PIJO ${product.name} - Patatas fritas gourmet`}
      className="relative z-10 h-auto w-[75vw] max-w-[320px] object-contain sm:w-[70vw] sm:max-w-[380px] md:max-w-[400px] lg:w-80 lg:max-w-none"
      loading={slot === 0 || slot === 1 ? "eager" : "lazy"}
      decoding="async"
      style={{
        filter: isActive
          ? `drop-shadow(0 0 60px ${product.accentColor}50) drop-shadow(0 30px 60px ${product.accentColor}30) drop-shadow(0 15px 30px rgba(0,0,0,0.3))`
          : `drop-shadow(0 15px 30px rgba(0,0,0,0.4))`,
        transition: "filter 0.8s ease",
      }}
    />
  )
})

export function ProductSlider({ products, activeIndex, onIndexChange }: ProductSliderProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [textKey, setTextKey] = useState(0)

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return
      setIsAnimating(true)
      onIndexChange(index)
      setTextKey((k) => k + 1)
      setTimeout(() => setIsAnimating(false), 800)
    },
    [isAnimating, activeIndex, onIndexChange]
  )

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % products.length
    goToSlide(next)
  }, [activeIndex, products.length, goToSlide])

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + products.length) % products.length
    goToSlide(prev)
  }, [activeIndex, products.length, goToSlide])

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(goNext, 6000)
  }, [goNext])

  useEffect(() => {
    startAutoPlay()
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [startAutoPlay])

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    pauseAutoPlay()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
    startAutoPlay()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrev])

  const product = products[activeIndex]

  /**
   * For each product, compute its "slot" relative to activeIndex.
   * slot 0 = active (big, left)
   * slot 1 = first cascade (right, slightly up, smaller)
   * slot 2 = second cascade (further right+up, even smaller)
   * slot 3 = third cascade (furthest right+up, smallest)
   * slot -1..-3 = exited left / hidden
   * Anything > 3 = hidden offscreen right
   */
  const getSlot = (itemIndex: number) => {
    let diff = itemIndex - activeIndex
    // Wrap around for circular behavior
    if (diff < -Math.floor(products.length / 2)) diff += products.length
    if (diff > Math.floor(products.length / 2)) diff -= products.length
    return diff
  }

  // Check if we're on mobile (will be updated via useEffect)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Slot-based style presets for the carousel items
  const getSlotStyle = (slot: number): React.CSSProperties => {
    // Active product: large, centered on mobile, left-aligned on desktop
    if (slot === 0) {
      return {
        transform: "translate(0%, -50%) scale(1) rotate(0deg)",
        opacity: 1,
        zIndex: 20,
        filter: "blur(0px) brightness(1)",
        pointerEvents: "auto" as const,
      }
    }
    // On mobile, hide all non-active products
    if (isMobile) {
      return {
        transform: "translate(0%, -50%) scale(0.8) rotate(0deg)",
        opacity: 0,
        zIndex: 0,
        filter: "blur(4px) brightness(0.6)",
        pointerEvents: "none" as const,
      }
    }
    // Cascade positions 1, 2, 3 (desktop only)
    if (slot >= 1 && slot <= 3) {
      const cascadeX = slot * 120
      const cascadeY = slot * -35
      const cascadeScale = Math.max(0.35, 1 - slot * 0.2)
      const cascadeOpacity = Math.max(0.12, 0.75 - slot * 0.22)
      const cascadeBlur = slot <= 1 ? 0 : (slot - 1) * 1.5
      const cascadeBrightness = Math.max(0.6, 1 - slot * 0.12)
      return {
        transform: `translate(${cascadeX}px, calc(-50% + ${cascadeY}px)) scale(${cascadeScale}) rotate(${slot * 2}deg)`,
        opacity: cascadeOpacity,
        zIndex: 10 - slot,
        filter: `blur(${cascadeBlur}px) brightness(${cascadeBrightness})`,
        pointerEvents: slot === 1 ? ("auto" as const) : ("none" as const),
      }
    }
    // Exiting left (slot -1)
    if (slot === -1) {
      return {
        transform: "translate(-140%, -50%) scale(0.7) rotate(-8deg)",
        opacity: 0,
        zIndex: 0,
        filter: "blur(4px) brightness(0.6)",
        pointerEvents: "none" as const,
      }
    }
    // Everything else: hidden offscreen
    if (slot > 3) {
      return {
        transform: "translate(400px, calc(-50% - 120px)) scale(0.25) rotate(8deg)",
        opacity: 0,
        zIndex: 0,
        filter: "blur(6px) brightness(0.5)",
        pointerEvents: "none" as const,
      }
    }
    // slot <= -2
    return {
      transform: "translate(-200%, -50%) scale(0.5) rotate(-12deg)",
      opacity: 0,
      zIndex: 0,
      filter: "blur(6px) brightness(0.5)",
      pointerEvents: "none" as const,
    }
  }

  return (
    <section
      id="inicio"
      className="noise-overlay relative min-h-screen overflow-hidden pt-20"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={() => startAutoPlay()}
    >
      {/* Multi-layer background glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-[1500ms] ease-in-out"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 65% 45%, ${product.bgColor}35 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 20% 70%, ${product.bgColor}15 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 80% 80%, ${product.bgColor}20 0%, transparent 50%)
          `,
        }}
      />


      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center gap-8 px-6 lg:flex-row lg:gap-0 lg:px-8">
        {/* Left side - Text content */}
        <div
          className="flex flex-1 flex-col items-center gap-6 lg:items-start"
          key={`text-${textKey}`}
        >
          {/* Animated entrance for text */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-700"
              style={{
                borderColor: `${product.accentColor}30`,
                backgroundColor: `${product.accentColor}10`,
                color: product.accentColor,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: product.accentColor }}
              />
              {product.subtitle}
            </div>
          </div>

          <h1
            className="animate-fade-in-up text-center text-5xl font-black leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-left lg:text-7xl xl:text-8xl"
            style={{ fontFamily: "var(--font-serif)", animationDelay: "0.15s", animationFillMode: "both" }}
          >
            <span className="transition-colors duration-700" style={{ color: product.accentColor }}>
              {product.name.split(" ")[0]}
            </span>
            {product.name.split(" ").length > 1 && (
              <span className="text-foreground">
                {" "}{product.name.split(" ").slice(1).join(" ")}
              </span>
            )}
          </h1>

          <p
            className="animate-fade-in-up max-w-lg text-center text-base leading-relaxed text-foreground/60 lg:text-left lg:text-lg"
            style={{ animationDelay: "0.25s", animationFillMode: "both" }}
          >
            {product.description}
          </p>

          {/* Product highlights */}
          <div
            className="animate-fade-in-up mt-6 flex flex-wrap items-center justify-center gap-2 lg:mt-8 lg:justify-start lg:gap-3"
            style={{ animationDelay: "0.45s", animationFillMode: "both" }}
          >
            {[
              "100% Natural",
              "Sin gluten",
              "Hecho en Espa\u00f1a",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-medium transition-all duration-700 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs"
                style={{
                  borderColor: `${product.accentColor}30`,
                  backgroundColor: `${product.accentColor}08`,
                  color: product.accentColor,
                }}
              >
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ backgroundColor: product.accentColor }}
                />
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Diagonal cascade with CSS transitions (all bags rendered) */}
        <div className="relative flex flex-1 items-center justify-center lg:justify-end">
          <div className="relative h-[400px] w-full max-w-[650px] sm:h-[500px] md:h-[550px] lg:h-[600px]">
            {/* Animated circular glow behind active product */}
            <div
              className="pointer-events-none absolute left-[15%] top-1/2 z-[5] h-[450px] w-[450px] -translate-y-1/2 rounded-full transition-all duration-[1200ms]"
              style={{
                background: `radial-gradient(circle at center, ${product.accentColor}25 0%, ${product.accentColor}10 35%, transparent 70%)`,
                filter: "blur(40px)",
              }}
            />

            {/* All products rendered simultaneously - positions driven by CSS transitions */}
            {products.map((p, i) => {
              const slot = getSlot(i)
              const slotStyle = getSlotStyle(slot)
              const isActive = slot === 0

              return (
                <div
                  key={p.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 will-change-transform lg:left-0 lg:translate-x-0"
                  style={{
                    ...slotStyle,
                    transition: `
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)
                    `,
                  }}
                  onClick={() => {
                    if (slot === 1) goNext()
                    else if (slot >= 2 && slot <= 3) {
                      const targetIndex = (activeIndex + slot) % products.length
                      goToSlide(targetIndex)
                    }
                  }}
                  role={slot >= 1 && slot <= 3 ? "button" : undefined}
                  tabIndex={slot >= 1 && slot <= 3 ? 0 : undefined}
                  aria-label={slot >= 1 && slot <= 3 ? `Ir a ${p.name}` : undefined}
                >
                  <img
                    src={p.image}
                    alt={`PIJO ${p.name}`}
                    className="relative z-10 h-auto w-[75vw] max-w-[320px] object-contain sm:w-[70vw] sm:max-w-[380px] md:max-w-[400px] lg:w-80 lg:max-w-none"
                    style={{
                      filter: isActive
                        ? `drop-shadow(0 0 60px ${p.accentColor}50) drop-shadow(0 30px 60px ${p.accentColor}30) drop-shadow(0 15px 30px rgba(0,0,0,0.3))`
                        : `drop-shadow(0 15px 30px rgba(0,0,0,0.4))`,
                      transition: "filter 0.8s ease",
                    }}
                  />
                  {/* Label under cascade items */}
                  <p
                    className="mt-2 text-center text-xs font-medium tracking-wider uppercase transition-all duration-700"
                    style={{
                      color: p.accentColor,
                      opacity: slot >= 1 && slot <= 2 ? 0.6 : 0,
                    }}
                  >
                    {p.name}
                  </p>
                </div>
              )
            })}

            {/* Floating active product animation (gentle float on active only) */}
            <style>{`
              @keyframes gentleFloat {
                0%, 100% { transform: translate(0%, -50%) scale(1) rotate(0deg) translateY(0px); }
                50% { transform: translate(0%, -50%) scale(1) rotate(0deg) translateY(-18px); }
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <div
            className="hidden text-xs font-medium tracking-[0.2em] uppercase text-foreground/30 transition-all duration-700 lg:block"
          >
            {product.tagline}
          </div>

          <div className="mx-auto flex items-center gap-5 lg:mx-0">
            <button
              onClick={goPrev}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/40 transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
              aria-label="Producto anterior"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <div className="flex items-center gap-2">
              {products.map((p, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="group relative flex h-8 items-center justify-center"
                  aria-label={`Ir a ${p.name}`}
                >
                  <div
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIndex ? "2rem" : "0.5rem",
                      height: "0.375rem",
                      backgroundColor: i === activeIndex ? product.accentColor : "rgba(255,255,255,0.15)",
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={goNext}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/40 transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
              aria-label="Producto siguiente"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="hidden items-center gap-2 text-sm text-foreground/30 lg:flex">
            <span className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-serif)" }}>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground/20">/</span>
            <span>{String(products.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
