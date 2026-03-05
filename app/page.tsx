"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { ProductSlider, type Product } from "@/components/product-slider"
import { FlavorGrid } from "@/components/flavor-grid"
import { SensorySection } from "@/components/sensory-section"
import { BrandStory } from "@/components/brand-story"
import { PressSection } from "@/components/press-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

const products: Product[] = [
  {
    id: 1,
    name: "Pijo Original",
    subtitle: "La patata de toda la vida",
    description:
      "El sabor de siempre, el que nunca falla. La patata frita cl\u00e1sica con el toque Pijo que la convierte en algo \u00fanico. Sin artificios, solo excelencia.",
    tagline: "La patata de toda la vida",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pijo%20normal-sQgJMuQkxCQZS4L9dzN4N1m8hoc4La.png",
    bgColor: "#e8e0d4",
    accentColor: "#8a7d6b",
    textColor: "#1a1a1a",
    weight: "130g",
    intensity: 3,
    crunch: 5,
    flavor: 3,
  },
  {
    id: 2,
    name: "Ajo Caba\u00f1il",
    subtitle: "Patatas fritas con sabor a ajo",
    description:
      "El sabor del ajo caba\u00f1il valenciano en cada patata. Un cl\u00e1sico reinventado con car\u00e1cter propio que no deja indiferente a nadie.",
    tagline: "Tradici\u00f3n con car\u00e1cter",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed_512x-YaRQDV9m5iqSxgE7vD5TUW5CgZYSEX.webp",
    bgColor: "#b8a031",
    accentColor: "#d4b944",
    textColor: "#ffffff",
    weight: "130g",
    intensity: 4,
    crunch: 4,
    flavor: 5,
  },
  {
    id: 3,
    name: "Lim\u00f3n y Pimienta",
    subtitle: "Patatas fritas en sart\u00e9n",
    description:
      "Explosi\u00f3n \u00e1cida y adictiva. La combinaci\u00f3n perfecta de c\u00edtrico fresco y pimienta negra reci\u00e9n molida para los paladares m\u00e1s atrevidos.",
    tagline: "Atrevimiento en cada mordisco",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pijo-limonypimienta_1200x-4tLdBSGeVMuzpu83g8LxkjN07iYfDp.webp",
    bgColor: "#1a1a1a",
    accentColor: "#e0e0e0",
    textColor: "#ffffff",
    weight: "130g",
    intensity: 5,
    crunch: 4,
    flavor: 5,
  },
  {
    id: 4,
    name: "Mojo Canario",
    subtitle: "Papas con sabor a mojo",
    description:
      "El mejor mojo el de mi madre. Un homenaje a las islas que transporta tus sentidos directamente a Canarias con cada crujido.",
    tagline: "Un viaje a las islas en cada bocado",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-2-SbZnpagyVpi8eSHSMnKceZJzHu7TzZ.png",
    bgColor: "#1a7a7a",
    accentColor: "#3dc5c5",
    textColor: "#ffffff",
    weight: "130g",
    intensity: 4,
    crunch: 4,
    flavor: 4,
  },
  {
    id: 5,
    name: "Aceituna Negra",
    subtitle: "Patatas fritas con sabor a aceituna",
    description:
      "Intenso, mediterr\u00e1neo, irresistible. La esencia de la aceituna negra capturada en cada patata para los amantes de lo aut\u00e9ntico.",
    tagline: "Esencia mediterr\u00e1nea pura",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pijo-aceitunanegra-QbgqIfRgYnXsBb2ADpdti8I8PBnNyC.png",
    bgColor: "#5a2040",
    accentColor: "#b84878",
    textColor: "#ffffff",
    weight: "130g",
    intensity: 5,
    crunch: 4,
    flavor: 5,
  },
  {
    id: 6,
    name: "Elegant Premium",
    subtitle: "Big premium \u00b7 Medium cut",
    description:
      "500 gramos de pura sofisticaci\u00f3n. Corte medio, textura impecable y un packaging que impone. La bolsa que se lleva a las reuniones importantes.",
    tagline: "La sofisticaci\u00f3n tiene nombre",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/patatas%20elegant-zwYUontJz6g85lvEHTKrKgXufYO2D2.png",
    bgColor: "#1c1c1c",
    accentColor: "#c0c0c0",
    textColor: "#ffffff",
    weight: "500g",
    intensity: 4,
    crunch: 5,
    flavor: 4,
  },
  {
    id: 7,
    name: "Elegant Jam\u00f3n",
    subtitle: "Superior quality Spanish ham",
    description:
      "El sabor del mejor jam\u00f3n espa\u00f1ol en cada patata. Una alianza entre la tradici\u00f3n ib\u00e9rica y el crujido perfecto que eleva cualquier momento.",
    tagline: "El jam\u00f3n hecho patata",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/patatas%20elegant%20jamon-Na7lGh8tITU9LowwCCCAbDawzRQwdK.png",
    bgColor: "#8a7040",
    accentColor: "#d4a85a",
    textColor: "#ffffff",
    weight: "130g",
    intensity: 4,
    crunch: 4,
    flavor: 5,
  },
]

export default function PijoPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number | null>(null)
  const targetPos = useRef({ x: 0.5, y: 0.5 })
  const currentPos = useRef({ x: 0.5, y: 0.5 })
  const bgRef = useRef<HTMLDivElement>(null)

  const handleIndexChange = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const currentProduct = products[activeIndex]

  // Smooth mouse-tracking background using requestAnimationFrame for butter-smooth motion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    const animate = () => {
      // Lerp towards target for smooth, delayed follow
      const ease = 0.04
      currentPos.current = {
        x: currentPos.current.x + (targetPos.current.x - currentPos.current.x) * ease,
        y: currentPos.current.y + (targetPos.current.y - currentPos.current.y) * ease,
      }

      if (bgRef.current) {
        const px = (currentPos.current.x * 100).toFixed(2)
        const py = (currentPos.current.y * 100).toFixed(2)
        bgRef.current.style.setProperty("--mouse-x", `${px}%`)
        bgRef.current.style.setProperty("--mouse-y", `${py}%`)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <main
      className="relative min-h-screen"
      style={{ backgroundColor: "#080810" }}
    >
      {/* Animated mouse-following background */}
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0 z-0 transition-colors duration-[1500ms] ease-in-out"
        style={
          {
            "--mouse-x": "50%",
            "--mouse-y": "50%",
          } as React.CSSProperties
        }
      >
        {/* Primary glow that follows cursor */}
        <div
          className="absolute h-[800px] w-[800px] rounded-full transition-[background] duration-[1500ms] ease-in-out"
          style={{
            left: "var(--mouse-x)",
            top: "var(--mouse-y)",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${currentProduct.bgColor}20 0%, ${currentProduct.bgColor}08 40%, transparent 70%)`,
          }}
        />
        {/* Secondary ambient glow - offset from cursor */}
        <div
          className="absolute h-[600px] w-[600px] rounded-full transition-[background] duration-[1500ms] ease-in-out"
          style={{
            left: "calc(100% - var(--mouse-x))",
            top: "calc(100% - var(--mouse-y))",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${currentProduct.accentColor}10 0%, transparent 60%)`,
          }}
        />
        {/* Subtle static ambient washes */}
        <div
          className="absolute inset-0 transition-all duration-[1500ms] ease-in-out"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 70% 15%, ${currentProduct.bgColor}0a 0%, transparent 55%),
              radial-gradient(ellipse 60% 60% at 15% 85%, ${currentProduct.bgColor}06 0%, transparent 45%)
            `,
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar accentColor={currentProduct.accentColor} />

        <ProductSlider
          products={products}
          activeIndex={activeIndex}
          onIndexChange={handleIndexChange}
        />

        <FlavorGrid
          products={products}
          activeIndex={activeIndex}
          onSelect={handleIndexChange}
        />

        <SensorySection
          accentColor={currentProduct.accentColor}
          bgColor={currentProduct.bgColor}
        />

        <BrandStory
          accentColor={currentProduct.accentColor}
          product={currentProduct}
        />

        <PressSection accentColor={currentProduct.accentColor} />

        <TestimonialsSection accentColor={currentProduct.accentColor} />

        <CTASection
          accentColor={currentProduct.accentColor}
          bgColor={currentProduct.bgColor}
        />

        <Footer accentColor={currentProduct.accentColor} />
      </div>
    </main>
  )
}
