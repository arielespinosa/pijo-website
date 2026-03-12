"use client"

import { Instagram } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface FooterProps {
  accentColor: string
}

export function Footer({ accentColor }: FooterProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })

  return (
    <footer
      id="contacto"
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
        <div className="flex flex-col items-center gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span
              className="text-3xl font-bold tracking-[0.15em]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              PIJO
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground/40">
              Hechas con actitud. Crujientes por naturaleza. Patatas fritas artesanales para los que se atreven a comer diferente.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50">
              Contacto
            </h4>
            
            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:comercial@patataspijo.com"
                className="flex items-center justify-center gap-2 text-sm text-foreground/40 transition-colors duration-300 hover:text-foreground/60 md:justify-end"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                comercial@patataspijo.com
              </a>
              <a
                href="tel:+34670623833"
                className="flex items-center justify-center gap-2 text-sm text-foreground/40 transition-colors duration-300 hover:text-foreground/60 md:justify-end"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                (+34) 670 62 38 33
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex justify-center gap-3 md:justify-end">
              {/* Instagram */}
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.06] text-foreground/30 transition-all duration-300 hover:border-foreground/15 hover:text-foreground/60"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
              {/* Facebook */}
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.06] text-foreground/30 transition-all duration-300 hover:border-foreground/15 hover:text-foreground/60"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/[0.06] text-foreground/30 transition-all duration-300 hover:border-foreground/15 hover:text-foreground/60"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-foreground/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-foreground/20">
            {"© 2026 PIJO. Todos los derechos reservados."}
          </p>
          <div className="flex gap-6 text-xs text-foreground/20">
            <a href="/privacidad" className="transition-colors hover:text-foreground/40">Privacidad</a>
            <a href="/cookies" className="transition-colors hover:text-foreground/40">Cookies</a>
            <a href="/aviso-legal" className="transition-colors hover:text-foreground/40">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
