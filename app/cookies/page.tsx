import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Política de Cookies - PIJO",
  description: "Política de cookies de PIJO. Información sobre cómo utilizamos las cookies en nuestro sitio web.",
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <span
            className="text-2xl font-bold tracking-[0.15em]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            PIJO
          </span>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <h1
          className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Política de Cookies
        </h1>
        <p className="mt-4 text-sm text-foreground/40">
          Última actualización: 3 de marzo de 2026
        </p>

        <div className="mt-12 space-y-12 text-foreground/70">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. ¿Qué son las cookies?</h2>
            <p className="mt-4">
              Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario (ordenador, tablet o smartphone) cuando visita un sitio web. Su finalidad es permitir que el sitio web recuerde información sobre la visita del usuario, como el idioma preferido o las páginas visitadas, lo que puede facilitar la próxima visita y hacer que el sitio resulte más útil.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Tipos de cookies utilizadas</h2>
            <p className="mt-4">Este sitio web puede utilizar los siguientes tipos de cookies:</p>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Cookies técnicas o necesarias</h3>
                <p className="mt-2">
                  Son aquellas imprescindibles para el funcionamiento del sitio web y permiten la navegación y el uso de sus funcionalidades básicas.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground">Cookies de análisis</h3>
                <p className="mt-2">
                  Permiten analizar el comportamiento de los usuarios en el sitio web con el fin de mejorar los servicios ofrecidos. Estas cookies recopilan información de forma anónima.
                </p>
                <p className="mt-2 text-sm text-foreground/50">Ejemplo: herramientas de analítica web.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground">Cookies de personalización</h3>
                <p className="mt-2">
                  Permiten recordar información para que el usuario acceda al servicio con determinadas características, como el idioma o la región desde la que accede.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground">Cookies de marketing o publicidad</h3>
                <p className="mt-2">
                  Se utilizan para mostrar anuncios relevantes para los usuarios y medir la eficacia de campañas publicitarias.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Cookies de terceros</h2>
            <p className="mt-4">
              Este sitio web puede utilizar servicios de terceros que recopilan información con fines estadísticos o de uso del sitio web. Entre ellos pueden encontrarse herramientas como:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>Google Analytics, que permite analizar el uso que los usuarios hacen del sitio web.</li>
            </ul>
            <p className="mt-4">
              Estos terceros pueden almacenar cookies en el dispositivo del usuario conforme a sus propias políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Gestión y desactivación de cookies</h2>
            <p className="mt-4">
              El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración del navegador utilizado.
            </p>
            <p className="mt-4">
              A continuación se incluyen enlaces a la información sobre cómo gestionar cookies en los navegadores más comunes:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70">
                  Microsoft Edge
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70">
                  Safari
                </a>
              </li>
            </ul>
            <p className="mt-4">
              Ten en cuenta que desactivar algunas cookies puede afectar al correcto funcionamiento del sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Aceptación de la política de cookies</h2>
            <p className="mt-4">
              Al acceder a este sitio web por primera vez, el usuario verá un aviso o banner informando del uso de cookies (si el portal hace uso de estas tecnologías). El usuario puede aceptar todas las cookies, rechazarlas o configurar sus preferencias.
            </p>
            <p className="mt-4">
              El consentimiento puede ser retirado en cualquier momento mediante la configuración del navegador o las opciones de gestión de cookies disponibles en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Cambios en la política de cookies</h2>
            <p className="mt-4">
              El titular del sitio web se reserva el derecho de modificar esta Política de Cookies en cualquier momento para adaptarla a cambios legislativos o técnicos. Se recomienda revisar esta página periódicamente.
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-16 border-t border-foreground/[0.06] pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </article>
    </main>
  )
}
