"use client"

import { ExternalLink } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface PressSectionProps {
  accentColor: string
}

const pressLinks = [
  {
    name: "Murcia Econom\u00eda",
    url: "https://murciaeconomia.com/archive/70432/andres-araez-cada-bolsa-de-patatas-pijo-tiene-una-historia-detras",
  },
  {
    name: "PotatoPro",
    url: "https://www.potatopro.com/es/news/2019/pijo-la-primera-patata-frita-con-rostro-color-y-sabor-propio",
  },
  {
    name: "Murcia Plaza",
    url: "https://murciaplaza.com/murciaplaza/las-patatas-pijo-se-alian-con-bertin-osborne-para-crear-un-productomuy-castizo-y-muy-espanol",
  },
  {
    name: "Murcia Diario",
    url: "https://www.murciadiario.com/articulo/empresas/patatas-pijo-y-parlamento-andaluz-convocan-un-aperitivo-solidario-a-favor-de-cruz-roja/20181219183738037824.html",
  },
  {
    name: "Elite Murcia",
    url: "https://elitemurcia.es/bertin-osborne-y-pijo-unen-fuerzas-para-lanzar-su-gama-seleccion-con-mas-personalidad/",
  },
  {
    name: "Murcia.com",
    url: "https://www.murcia.com/economia/noticias/2022/10/19-pijo-posh--chips-se-posiciona-en-la-feria-de-alimentacion-sial-paris-2022-con-su-gama-de-productos-d.asp",
  },
  {
    name: "La Naci\u00f3n",
    url: "https://lanacion.com.ec/patatas-pijo-como-sobresalir-con-un-packaging-potente/",
  },
]

export function PressSection({ accentColor }: PressSectionProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative py-16 lg:py-24">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 lg:px-8 reveal ${isVisible ? "visible" : ""}`}
      >
        <div
          className="rounded-3xl border border-foreground/[0.06] px-8 py-12 lg:px-16 lg:py-16"
          style={{ backgroundColor: "rgba(255,255,255,0.015)" }}
        >
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground/30">
            {"Nos han mencionado en"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {pressLinks.map((press, i) => (
              <a
                key={i}
                href={press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.02] px-5 py-2.5 opacity-60 transition-all duration-500 hover:border-foreground/20 hover:bg-foreground/[0.05] hover:opacity-100"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span
                  className="text-sm font-medium tracking-wide text-foreground transition-colors duration-500 group-hover:text-foreground lg:text-base"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {press.name}
                </span>
                <ExternalLink
                  className="h-3 w-3 text-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-foreground/60"
                  style={{ transitionDelay: "50ms" }}
                />
              </a>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-foreground/20 lg:gap-8">
            <span>{"SIAL Par\u00eds 2022"}</span>
            <span className="hidden h-3 w-px bg-foreground/10 sm:block" />
            <span>{"Packaging innovador"}</span>
            <span className="hidden h-3 w-px bg-foreground/10 sm:block" />
            <span>{"Colaboraci\u00f3n con Bert\u00edn Osborne"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
