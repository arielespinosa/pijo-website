import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Política de Privacidad - PIJO",
  description: "Política de privacidad de PIJO. Información sobre cómo recopilamos, utilizamos y protegemos tus datos personales.",
}

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>
        <p className="mt-4 text-sm text-foreground/40">
          Última actualización: 12 de marzo de 2026
        </p>

        <div className="mt-12 space-y-12 text-foreground/70">
          <p className="text-lg leading-relaxed">
            En Pijo respetamos y protegemos la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos la información personal que puedas proporcionarnos a través de nuestro sitio web.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Responsable del tratamiento</h2>
            <div className="mt-4 space-y-2">
              <p><strong className="text-foreground">Responsable:</strong> Blas Bermejo SL</p>
              <p><strong className="text-foreground">Dirección:</strong> Carretera de Madrid, KM 380, Molina de Segura, 30500, Murcia, España</p>
              <p><strong className="text-foreground">Email de contacto:</strong> blasbermejo@blasbermejo.com</p>
            </div>
            <p className="mt-4">
              El responsable del tratamiento se compromete a tratar los datos personales de los usuarios de conformidad con la normativa vigente, especialmente con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y la legislación española aplicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Datos que recopilamos</h2>
            <p className="mt-4">Podemos recopilar los siguientes datos personales cuando interactúas con nuestro sitio web:</p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Información enviada a través de formularios de contacto</li>
            </ul>
            <p className="mt-4">
              Estos datos se recopilan únicamente cuando el usuario los proporciona de forma voluntaria o mediante el uso de tecnologías como cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Finalidad del tratamiento de los datos</h2>
            <p className="mt-4">Los datos personales recopilados pueden utilizarse para:</p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>Responder a consultas realizadas a través de formularios o email</li>
              <li>Mejorar la experiencia del usuario en el sitio web</li>
              <li>Analizar el uso del sitio web y optimizar su funcionamiento</li>
              <li>Enviar comunicaciones relacionadas con nuestros productos, servicios o novedades (solo si el usuario ha dado su consentimiento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Base legal para el tratamiento</h2>
            <p className="mt-4">El tratamiento de los datos se basa en:</p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>El consentimiento del usuario al enviar formularios o contactar con nosotros.</li>
              <li>El interés legítimo para mejorar nuestros servicios y el funcionamiento del sitio web.</li>
              <li>El cumplimiento de obligaciones legales cuando sea necesario.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Conservación de los datos</h2>
            <p className="mt-4">
              Los datos personales se conservarán únicamente durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados o mientras exista una obligación legal de conservarlos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Compartición de datos con terceros</h2>
            <p className="mt-4">
              No vendemos ni cedemos datos personales a terceros. Sin embargo, algunos proveedores de servicios tecnológicos (como hosting, analítica web o herramientas de comunicación) pueden tener acceso a ciertos datos únicamente para prestar sus servicios y siempre bajo acuerdos que garantizan la protección de los datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">7. Derechos de los usuarios</h2>
            <p className="mt-4">Los usuarios tienen derecho a:</p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>Acceder a sus datos personales</li>
              <li>Solicitar la rectificación de datos incorrectos</li>
              <li>Solicitar la supresión de sus datos</li>
              <li>Solicitar la limitación del tratamiento</li>
              <li>Oponerse al tratamiento</li>
              <li>Solicitar la portabilidad de sus datos</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, puedes enviar una solicitud a: <a href="mailto:gerencia@blasbermejo.com" className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70">gerencia@blasbermejo.com</a>
            </p>
            <p className="mt-4">
              También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos si consideras que el tratamiento de tus datos no cumple con la normativa vigente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">8. Seguridad de la información</h2>
            <p className="mt-4">
              Aplicamos medidas técnicas y organizativas adecuadas para proteger los datos personales frente a accesos no autorizados, pérdida o alteración.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">9. Cambios en esta política</h2>
            <p className="mt-4">
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento para adaptarla a cambios legislativos o mejoras en nuestros servicios. La versión actualizada estará siempre disponible en esta página.
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
