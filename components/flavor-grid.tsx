"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { type Product } from "./product-slider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { X } from "lucide-react"

// Storytelling content for each flavor
const flavorStories: Record<string, { title: string; paragraphs: string[] }> = {
  "Limón y Pimienta": {
    title: "Limón y Pimienta",
    paragraphs: [
      "Este sabor nace inspirado en una imagen tradicional de la España rural, donde las grandes fincas agrícolas fueron durante décadas motor de empleo y desarrollo en muchas regiones. La referencia visual evoca esa etapa de nuestra historia ligada al trabajo de la tierra.",
      "Su perfil gastronómico se inspira en una de las zonas más singulares de España: la Región de Murcia, donde las patatas fritas se condimentaban tradicionalmente con limón, sal y pimienta. El resultado es un aperitivo crujiente, con una intensidad cítrica equilibrada por el toque especiado de la pimienta.",
      "Un sabor fresco y vibrante que encuentra su maridaje ideal en una cerveza bien fría.",
    ],
  },
  "Aceituna Negra": {
    title: "Aceituna Negra",
    paragraphs: [
      "Este sabor se inspira en el carácter y la fuerza de la España interior, tomando como referencia cultural el norte de Andalucía. La imagen busca transmitir elegancia y personalidad, alejándose de los clichés habituales y apostando por una estética más sobria y evocadora.",
      "La aceituna negra aporta un sabor profundo e intenso que convierte a estas patatas en un aperitivo sofisticado. Su carácter salino y aromático las hace especialmente adecuadas para acompañar vino tinto o vermut, creando un equilibrio perfecto entre tradición y gastronomía.",
    ],
  },
  "Mojo Canario": {
    title: "Mojo Canario",
    paragraphs: [
      "Inspiradas en la riqueza culinaria de las Islas Canarias, estas patatas capturan la esencia de uno de los sabores más representativos del archipiélago: el mojo.",
      "Su perfil es intenso, aromático y ligeramente especiado, evocando el carácter auténtico de esta receta tradicional. La imagen del envase refleja la identidad cultural de las islas, con una estética que transmite personalidad y autenticidad.",
      "Un aperitivo lleno de carácter que marida especialmente bien con refrescos o cerveza.",
    ],
  },
  "Pijo Original": {
    title: "Original",
    paragraphs: [
      "La variedad Original representa la esencia más pura de nuestras patatas fritas. Elaboradas con ingredientes seleccionados y fritas al punto exacto de sal, destacan por su textura crujiente y su sabor limpio y equilibrado.",
      "Este producto pone en valor la calidad de la materia prima, ofreciendo una experiencia gourmet accesible para cualquier ocasión. Su versatilidad lo convierte en el acompañamiento perfecto para cualquier tipo de bebida o aperitivo.",
    ],
  },
  "Ajo Cabañil": {
    title: "Ajo Cabañil",
    paragraphs: [
      "Este sabor rinde homenaje a una receta tradicional profundamente ligada a la cultura gastronómica del sureste español. El ajo cabañil, elaborado con ajo, vinagre, agua y sal, ha sido durante generaciones un condimento esencial de la cocina popular.",
      "Inspirado en esa tradición, este sabor ofrece una combinación intensa, aromática y llena de carácter que conecta con las raíces culinarias de nuestra tierra.",
      "Su personalidad lo convierte en el acompañamiento ideal para un buen vino tinto, resaltando sus matices y aportando una experiencia gastronómica auténtica.",
    ],
  },
  "Elegant Premium": {
    title: "Elegant Premium",
    paragraphs: [
      "La línea Elegant representa el máximo exponente de sofisticación en el mundo de las patatas fritas. Con 500 gramos de producto premium y un corte medio que garantiza el equilibrio perfecto entre textura y sabor.",
      "Su packaging distintivo, inspirado en la elegancia de la alta costura, convierte cada bolsa en una declaración de intenciones. No es solo un aperitivo, es una experiencia.",
      "Perfecta para eventos especiales, reuniones importantes o simplemente para quienes no se conforman con lo ordinario.",
    ],
  },
  "Elegant Ham": {
    title: "Elegant Ham",
    paragraphs: [
      "La fusión perfecta entre dos iconos de la gastronomía española: la patata frita artesanal y el jamón ibérico de calidad superior.",
      "Este sabor captura la esencia del jamón español en cada bocado, con notas ahumadas y un retrogusto que evoca las mejores bodegas de curación de la península.",
      "Un aperitivo premium que eleva cualquier momento a la categoría de experiencia gastronómica.",
    ],
  },
  "Elegant Classic": {
    title: "Elegant Classic",
    paragraphs: [
      "La línea Elegant Classic representa la esencia más pura del sabor español llevado al mundo. Una patata frita que habla el idioma universal de la excelencia.",
      "Elaborada con las mejores patatas seleccionadas y un proceso artesanal que respeta la tradición, este producto es la carta de presentación perfecta de la gastronomía española en mercados internacionales.",
      "Su packaging distintivo, con el caballero español como emblema, transmite elegancia y autenticidad en cada bolsa.",
    ],
  },
  "Elegant Lemon Pepper": {
    title: "Elegant Lemon Pepper",
    paragraphs: [
      "Una reinterpretación sofisticada de nuestro clásico Limón y Pimienta, adaptada para conquistar paladares internacionales sin perder un ápice de autenticidad española.",
      "El limón del Mediterráneo español aporta frescura y vivacidad, mientras que la pimienta negra añade un toque de carácter que hace de cada bocado una experiencia memorable.",
      "Ideal para acompañar cócteles premium o como aperitivo sofisticado en cualquier reunión internacional.",
    ],
  },
  "Elegant Black Olive": {
    title: "Elegant Black Olive",
    paragraphs: [
      "Las aceitunas negras españolas son reconocidas mundialmente por su calidad superior. Este sabor captura esa esencia mediterránea en una patata frita de categoría premium.",
      "El perfil de sabor es intenso pero equilibrado, con matices que evocan los olivares centenarios de Andalucía y el sol del sur de España.",
      "Una experiencia gastronómica que transporta a quien la prueba directamente a la costa mediterránea española.",
    ],
  },
}

interface FlavorGridProps {
  products: Product[]
  activeIndex: number
  onSelect: (index: number) => void
}

function TiltCard({
  children,
  className,
  disabled,
  ...props
}: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return
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
      disabled={disabled}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x || tilt.y ? 1.04 : 1})`,
        transition: "transform 0.2s ease-out, box-shadow 0.3s, background-color 0.5s, border-color 0.5s, opacity 0.4s",
      }}
      {...props}
    >
      {children}
    </button>
  )
}

// Reusable product grid component
function ProductGrid({
  products,
  allProducts,
  activeIndex,
  onSelect,
  expandedIndex,
  setExpandedIndex,
  gridRef,
  gridVisible,
  gridCols,
}: {
  products: Product[]
  allProducts: Product[]
  activeIndex: number
  onSelect: (index: number) => void
  expandedIndex: number | null
  setExpandedIndex: (index: number | null) => void
  gridRef: React.RefObject<HTMLDivElement | null>
  gridVisible: boolean
  gridCols: string
}) {
  const expandedProduct = expandedIndex !== null ? allProducts[expandedIndex] : null
  const expandedStory = expandedProduct ? flavorStories[expandedProduct.name] : null
  const isInternational = products.some((p) => p.name.includes("Elegant"))

  const handleCardClick = (productId: number) => {
    const globalIndex = allProducts.findIndex((p) => p.id === productId)
    onSelect(globalIndex)
    setExpandedIndex(globalIndex)
  }

  const closeExpanded = useCallback(() => {
    setExpandedIndex(null)
  }, [setExpandedIndex])

  return (
    <>
      {/* Expanded Detail View */}
      <div
        className={`mb-12 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expandedProduct && products.some((p) => p.id === expandedProduct.id)
            ? "max-h-[800px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {expandedProduct && expandedStory && products.some((p) => p.id === expandedProduct.id) && (
          <div
            data-detail-panel
            className="relative rounded-3xl border p-8 transition-all duration-500 lg:p-12"
            style={{
              backgroundColor: `${expandedProduct.bgColor}15`,
              borderColor: `${expandedProduct.accentColor}25`,
            }}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeExpanded()
              }}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
              style={{
                borderColor: `${expandedProduct.accentColor}30`,
                backgroundColor: `${expandedProduct.accentColor}10`,
                color: expandedProduct.accentColor,
              }}
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
              {/* Product image - Left side */}
              <div className="relative flex-shrink-0 animate-[slideInLeft_0.6s_ease-out_both]">
                <div
                  className="pointer-events-none absolute inset-0 rounded-full blur-3xl transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle, ${expandedProduct.accentColor}30 0%, transparent 70%)`,
                    transform: "scale(1.5)",
                  }}
                />
                <img
                  src={expandedProduct.image}
                  alt={`PIJO ${expandedProduct.name}`}
                  className="relative z-10 h-auto w-64 object-contain lg:w-80"
                  style={{
                    filter: `drop-shadow(0 25px 50px ${expandedProduct.accentColor}40)`,
                  }}
                />
              </div>

              {/* Storytelling content - Right side */}
              <div className="flex-1 animate-[slideInRight_0.6s_ease-out_0.15s_both]">
                <p
                  className="mb-2 text-sm font-semibold uppercase tracking-[0.15em]"
                  style={{ color: expandedProduct.accentColor }}
                >
                  {isInternational ? "Elegant Collection" : "Sabores Pijo"}
                </p>
                <h3
                  className="mb-6 text-3xl font-bold text-foreground lg:text-4xl"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {expandedStory.title}
                </h3>
                <div className="space-y-4">
                  {expandedStory.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-foreground/70 lg:text-lg"
                      style={{
                        animationDelay: `${0.3 + i * 0.1}s`,
                        animation: "fadeInUp 0.5s ease-out both",
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Product badges */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {(isInternational
                    ? ["Calidad Premium", "Internacional", "Gourmet"]
                    : ["100% Natural", "Sin gluten", "Hecho en Espa\u00f1a"]
                  ).map((badge) => (
                    <span
                      key={badge}
                      className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium"
                      style={{
                        borderColor: `${expandedProduct.accentColor}30`,
                        backgroundColor: `${expandedProduct.accentColor}08`,
                        color: expandedProduct.accentColor,
                      }}
                    >
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: expandedProduct.accentColor }}
                      />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid of products */}
      <div
        ref={gridRef}
        className={`grid gap-4 lg:gap-5 reveal-scale ${gridVisible ? "visible" : ""} ${gridCols}`}
      >
        {products.map((product) => {
          const globalIndex = allProducts.findIndex((p) => p.id === product.id)
          const isActive = globalIndex === activeIndex
          const isExpanded = globalIndex === expandedIndex
          return (
            <TiltCard
              key={product.id}
              onClick={() => handleCardClick(product.id)}
              disabled={isExpanded}
              className={`group relative flex flex-col items-center gap-4 rounded-2xl border p-4 lg:p-5 ${
                isActive ? "border-transparent" : "border-foreground/[0.06] hover:border-foreground/15"
              } ${isExpanded ? "ring-2" : ""}`}
              style={
                {
                  backgroundColor: isActive ? `${product.bgColor}25` : "rgba(255,255,255,0.02)",
                  boxShadow: isActive
                    ? `0 12px 50px ${product.accentColor}18, inset 0 1px 0 ${product.accentColor}15`
                    : "none",
                  ringColor: isExpanded ? product.accentColor : "transparent",
                  opacity: expandedIndex !== null && !isExpanded ? 0.5 : 1,
                } as React.CSSProperties
              }
            >
              {/* Active indicator ring */}
              {isActive && !isExpanded && (
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl transition-all duration-500"
                  style={{
                    border: `1.5px solid ${product.accentColor}40`,
                  }}
                />
              )}

              {/* Fixed size container for uniform image display */}
              <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl lg:h-40">
                <img
                  src={product.image}
                  alt={`PIJO ${product.name}`}
                  className={`h-full max-h-28 w-auto max-w-full object-contain transition-all duration-500 lg:max-h-36 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                  style={{
                    filter: isActive ? `drop-shadow(0 10px 25px ${product.accentColor}30)` : "none",
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
    </>
  )
}

export function FlavorGrid({ products, activeIndex, onSelect }: FlavorGridProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { ref: gridRef1, isVisible: gridVisible1 } = useScrollReveal({ threshold: 0.05 })
  const { ref: titleRef2, isVisible: titleVisible2 } = useScrollReveal()
  const { ref: gridRef2, isVisible: gridVisible2 } = useScrollReveal({ threshold: 0.05 })
  const sectionRef = useRef<HTMLElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Split products into national (Pijo) and international (Elegant)
  const nationalProducts = products.filter((p) => !p.name.includes("Elegant"))
  const internationalProducts = products.filter((p) => p.name.includes("Elegant"))

  // Close expanded view
  const closeExpanded = useCallback(() => {
    setExpandedIndex(null)
  }, [])

  // Close on click outside
  useEffect(() => {
    if (expandedIndex === null) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("[data-detail-panel]")) return
      closeExpanded()
    }

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [expandedIndex, closeExpanded])

  // Close when scrolling out of section
  useEffect(() => {
    if (expandedIndex === null || !sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          closeExpanded()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [expandedIndex, closeExpanded])

  // Close on escape key
  useEffect(() => {
    if (expandedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExpanded()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [expandedIndex, closeExpanded])

  return (
    <section ref={sectionRef} id="sabores" className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* NATIONAL MARKET - PIJO */}
        <div className="mb-32">
          <div ref={titleRef} className={`mb-16 text-center reveal ${titleVisible ? "visible" : ""}`}>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/20" />
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: products[activeIndex].accentColor }}
              >
                Mercado Nacional
              </p>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/20" />
            </div>
            <h2
              className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Sabores <span style={{ color: products[activeIndex].accentColor }}>Pijo</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/50 lg:text-lg">
              {"Nuestra gama clásica para el paladar español. Cada bolsa cuenta una historia, cada sabor evoca una tradición."}
            </p>
          </div>

          <ProductGrid
            products={nationalProducts}
            allProducts={products}
            activeIndex={activeIndex}
            onSelect={onSelect}
            expandedIndex={expandedIndex}
            setExpandedIndex={setExpandedIndex}
            gridRef={gridRef1 as React.RefObject<HTMLDivElement | null>}
            gridVisible={gridVisible1}
            gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          />
        </div>

        {/* Divider */}
        <div className="mb-32 flex items-center justify-center gap-6">
          <span
            className="h-px flex-1 transition-colors duration-700"
            style={{
              background: `linear-gradient(to right, transparent, ${products[activeIndex].accentColor}30, transparent)`,
            }}
          />
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-700"
            style={{
              borderColor: `${products[activeIndex].accentColor}30`,
              backgroundColor: `${products[activeIndex].accentColor}08`,
            }}
          >
            <svg
              className="h-6 w-6 transition-colors duration-700"
              style={{ color: products[activeIndex].accentColor }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <span
            className="h-px flex-1 transition-colors duration-700"
            style={{
              background: `linear-gradient(to left, transparent, ${products[activeIndex].accentColor}30, transparent)`,
            }}
          />
        </div>

        {/* INTERNATIONAL MARKET - ELEGANT */}
        <div>
          <div ref={titleRef2} className={`mb-16 text-center reveal ${titleVisible2 ? "visible" : ""}`}>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/20" />
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: products[activeIndex].accentColor }}
              >
                Mercado Internacional
              </p>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/20" />
            </div>
            <h2
              className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {"Colecci\u00f3n"} <span style={{ color: products[activeIndex].accentColor }}>Elegant</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/50 lg:text-lg">
              {"Patatas premium elaboradas para el paladar internacional. La tradici\u00f3n espa\u00f1ola se une a la sofisticaci\u00f3n global."}
            </p>
          </div>

          <ProductGrid
            products={internationalProducts}
            allProducts={products}
            activeIndex={activeIndex}
            onSelect={onSelect}
            expandedIndex={expandedIndex}
            setExpandedIndex={setExpandedIndex}
            gridRef={gridRef2 as React.RefObject<HTMLDivElement | null>}
            gridVisible={gridVisible2}
            gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          />
        </div>
      </div>
    </section>
  )
}
