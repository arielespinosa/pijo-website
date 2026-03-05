"use client"

import { Instagram, Youtube } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface FooterProps {
  accentColor: string
}

export function Footer({ accentColor }: FooterProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <footer
      ref={ref}
      className={`relative border-t border-foreground/[0.06] py-16 lg:py-20 reveal ${isVisible ? "visible" : ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 100%, ${accentColor}06 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <span
              className="text-3xl font-bold tracking-[0.15em]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              PIJO
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground/40">
              Hechas con actitud. Crujientes por naturaleza. Patatas fritas artesanales para los que se atreven a comer diferente.
            </p>
            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.06] text-foreground/30 transition-all duration-300 hover:border-foreground/15 hover:text-foreground/60"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
              {/* TikTok custom */}
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.06] text-foreground/30 transition-all duration-300 hover:border-foreground/15 hover:text-foreground/60"
                aria-label="TikTok"
              >
                <svg className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.99a8.24 8.24 0 0 0 3.76.92V6.69Z" />
                </svg>
              </a>
              {/* X/Twitter */}
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.06] text-foreground/30 transition-all duration-300 hover:border-foreground/15 hover:text-foreground/60"
                aria-label="X"
              >
                <svg className="h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="mb-5 text-xs font-semibold tracking-[0.15em] uppercase text-foreground/50">
              Tienda
            </h4>
            <ul className="flex flex-col gap-3">
              {["Todos los sabores", "Packs", "Edici\u00f3n limitada", "Merch"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/30 transition-colors duration-300 hover:text-foreground/60">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-5 text-xs font-semibold tracking-[0.15em] uppercase text-foreground/50">
              Marca
            </h4>
            <ul className="flex flex-col gap-3">
              {["Nuestra historia", "Colaboraciones", "Prensa", "Contacto"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/30 transition-colors duration-300 hover:text-foreground/60">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="mb-5 text-xs font-semibold tracking-[0.15em] uppercase text-foreground/50">
              Newsletter
            </h4>
            <p className="mb-4 text-sm text-foreground/30">
              {"Nuevos sabores, ediciones limitadas y ofertas exclusivas. S\u00e9 el primero en enterarte."}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-3 text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all duration-300 focus:border-foreground/20"
              />
              <button
                className="btn-ripple rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: accentColor, color: "#080810" }}
              >
                Unirme
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-foreground/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-foreground/20">
            {"© 2026 PIJO. Todos los derechos reservados."}
          </p>
          <div className="flex gap-6 text-xs text-foreground/20">
            <a href="#" className="transition-colors hover:text-foreground/40">Privacidad</a>
            <a href="#" className="transition-colors hover:text-foreground/40">Cookies</a>
            <a href="#" className="transition-colors hover:text-foreground/40">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
