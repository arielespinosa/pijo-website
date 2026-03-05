"use client"

import { useState, useEffect } from "react"
import { Menu, X, Search, ShoppingBag } from "lucide-react"

interface NavbarProps {
  accentColor: string
}

export function Navbar({ accentColor }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(8, 8, 16, 0.92)" : "rgba(8, 8, 16, 0.6)",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="group flex items-center gap-2">
          <span
            className="text-3xl font-bold tracking-[0.15em] transition-all duration-300 group-hover:tracking-[0.2em]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            PIJO
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {["Inicio", "Sabores", "Historia", "Contacto"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative text-sm font-medium tracking-wide text-foreground/60 transition-colors duration-300 hover:text-foreground"
            >
              {item}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: accentColor }}
              />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            className="relative rounded-full p-2.5 text-foreground/50 transition-all duration-300 hover:bg-foreground/5 hover:text-foreground"
            aria-label="Buscar"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            className="relative rounded-full p-2.5 text-foreground/50 transition-all duration-300 hover:bg-foreground/5 hover:text-foreground"
            aria-label="Carrito"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </button>
          <button
            className="btn-ripple ml-2 rounded-full px-7 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor: accentColor,
              color: "#080810",
              boxShadow: `0 4px 20px ${accentColor}30`,
            }}
          >
            Comprar
          </button>
        </div>

        <button
          className="relative rounded-lg p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          <div className="relative h-6 w-6">
            <span
              className={`absolute left-0 top-1 h-0.5 w-6 rounded-full bg-foreground transition-all duration-300 ${isOpen ? "top-3 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-4 rounded-full bg-foreground transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-5 h-0.5 w-6 rounded-full bg-foreground transition-all duration-300 ${isOpen ? "top-3 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`absolute inset-x-0 top-full overflow-hidden transition-all duration-500 md:hidden ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ backgroundColor: "rgba(8, 8, 16, 0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex flex-col gap-1 px-6 py-6">
          {["Inicio", "Sabores", "Historia", "Contacto"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-xl px-4 py-3 text-lg font-medium text-foreground/70 transition-all duration-300 hover:bg-foreground/5 hover:text-foreground"
              style={{ transitionDelay: `${i * 50}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button
            className="btn-ripple mt-4 rounded-full px-6 py-3.5 text-sm font-semibold transition-all"
            style={{ backgroundColor: accentColor, color: "#080810" }}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </header>
  )
}
