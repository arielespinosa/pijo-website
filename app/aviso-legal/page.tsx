import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Aviso Legal - PIJO",
  description: "Aviso legal de PIJO. Información general, condiciones de uso, propiedad intelectual y legislación aplicable.",
}

export default function AvisoLegalPage() {
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
          Aviso Legal
        </h1>
        <p className="mt-4 text-sm text-foreground/40">
          Última actualización: 3 de marzo de 2026
        </p>

        <div className="mt-12 space-y-12 text-foreground/70">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Información general</h2>
            <p className="mt-4">
              En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa que el presente sitio web pertenece a:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong className="text-foreground">Titular:</strong> Blas Bermejo SL</p>
              <p><strong className="text-foreground">NIF/CIF:</strong> B30041198</p>
              <p><strong className="text-foreground">Domicilio:</strong> Carretera de Madrid KM 380, Molina de Segura, 30500, Murcia, España</p>
              <p><strong className="text-foreground">Correo electrónico:</strong> blasbermejo@blasbermejo.com</p>
              <p><strong className="text-foreground">Sitio web:</strong> blasbermejo.com</p>
            </div>
            <p className="mt-4">
              El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación plena de las condiciones establecidas en este Aviso Legal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Objeto</h2>
            <p className="mt-4">
              El presente sitio web tiene como finalidad ofrecer información sobre los productos, servicios o contenidos ofrecidos por Pijo, así como permitir el contacto con usuarios interesados.
            </p>
            <p className="mt-4">
              El titular se reserva el derecho de modificar en cualquier momento los contenidos, servicios o condiciones del sitio web sin necesidad de previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Condiciones de uso</h2>
            <p className="mt-4">
              El usuario se compromete a utilizar el sitio web de conformidad con la ley, la buena fe, el orden público y las presentes condiciones.
            </p>
            <p className="mt-4">
              Queda prohibido el uso del sitio web con fines ilícitos, dañinos o que puedan impedir el normal funcionamiento del mismo.
            </p>
            <p className="mt-4">
              El titular del sitio web no se hace responsable del uso indebido que los usuarios puedan realizar del contenido de la página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Propiedad intelectual e industrial</h2>
            <p className="mt-4">
              Todos los contenidos del sitio web, incluyendo pero no limitándose a:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>Textos</li>
              <li>Imágenes</li>
              <li>Logotipos</li>
              <li>Diseño gráfico</li>
              <li>Código fuente</li>
              <li>Software</li>
              <li>Estructura del sitio</li>
            </ul>
            <p className="mt-4">
              Son propiedad del titular o cuentan con las licencias correspondientes y están protegidos por la normativa de propiedad intelectual e industrial.
            </p>
            <p className="mt-4">
              Queda prohibida la reproducción, distribución o modificación de los contenidos sin autorización expresa del titular.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Responsabilidad</h2>
            <p className="mt-4">
              El titular no se hace responsable de los daños o perjuicios derivados de:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2">
              <li>Interrupciones del servicio</li>
              <li>Errores en los contenidos</li>
              <li>Presencia de virus o software malicioso</li>
              <li>Uso indebido del sitio web por parte de los usuarios</li>
            </ul>
            <p className="mt-4">
              Asimismo, el titular no garantiza la disponibilidad permanente del sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Enlaces externos</h2>
            <p className="mt-4">
              Este sitio web puede contener enlaces a páginas externas. El titular no se responsabiliza del contenido, políticas de privacidad o prácticas de dichos sitios web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">7. Protección de datos</h2>
            <p className="mt-4">
              El tratamiento de los datos personales de los usuarios se realiza de conformidad con lo establecido en el Reglamento General de Protección de Datos y la normativa española vigente.
            </p>
            <p className="mt-4">
              Para más información, el usuario puede consultar nuestra{" "}
              <Link href="/privacidad" className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/70">
                Política de Privacidad
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">8. Legislación aplicable y jurisdicción</h2>
            <p className="mt-4">
              La relación entre el titular del sitio web y el usuario se regirá por la legislación española.
            </p>
            <p className="mt-4">
              En caso de conflicto o controversia, las partes se someterán a los juzgados y tribunales que correspondan conforme a la normativa vigente.
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
