"use client"

import { useState, useEffect, useCallback } from "react"

interface NavbarProps {
  accentColor: string
}

const NAV_ITEMS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sabores", href: "#sabores" },
  { label: "Historia", href: "#historia" },
  { label: "Contacto", href: "#contacto" },
] as const

export function Navbar({ accentColor }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <header className="fixed left-0 right-0 top-0 z-50" role="banner">
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(8, 8, 16, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      />
      <nav 
        className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* Logo - left */}
        <a 
          href="#inicio" 
          className="group flex items-center gap-2"
          aria-label="PIJO - Ir al inicio"
        >
          <span
            className="text-2xl font-bold tracking-[0.15em] transition-all duration-300 group-hover:tracking-[0.2em] sm:text-3xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            PIJO
          </span>
        </a>

        {/* Menu - center (desktop) */}
        <ul 
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-10"
          role="menubar"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.label} role="none">
              <a
                href={item.href}
                className="group relative text-sm font-medium tracking-wide text-foreground/60 transition-colors duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                role="menuitem"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
                  style={{ backgroundColor: accentColor }}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Spacer for balance - right */}
        <div className="hidden w-[72px] md:block" aria-hidden="true" />

        {/* Mobile menu button */}
        <button
          className="relative rounded-lg p-2 transition-colors duration-200 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 md:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className="relative h-6 w-6" aria-hidden="true">
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
        id="mobile-menu"
        className={`absolute inset-x-0 top-full overflow-hidden transition-all duration-500 md:hidden ${isOpen ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
        style={{ backgroundColor: "rgba(8, 8, 16, 0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        aria-hidden={!isOpen}
      >
        <ul className="flex flex-col gap-1 px-4 py-6 sm:px-6" role="menu">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.label} role="none">
              <a
                href={item.href}
                className="block rounded-xl px-4 py-3 text-lg font-medium text-foreground/70 transition-all duration-300 hover:bg-foreground/5 hover:text-foreground focus-visible:bg-foreground/5 focus-visible:text-foreground focus-visible:outline-none"
                style={{ transitionDelay: `${i * 50}ms` }}
                onClick={closeMenu}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
