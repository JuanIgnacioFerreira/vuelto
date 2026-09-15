import { Barra } from '@/components/barra'
import { Motor } from '@/components/motor'
import { Pie } from '@/components/pie'

/* La plantilla de las páginas de texto (privacidad, términos): la barra, un
   título, los puntos numerados y el pie. */

export function Legal({ ojo, titulo, bajada, puntos, fecha }: { ojo: string; titulo: string; bajada: string; puntos: [string, string][]; fecha: string }) {
  return (
    <div data-root="" className="raiz">
      <Barra />
      <section className="sec sec-legal">
        <div className="int int-angosto">
          <div className="cab" data-rv="">
            <div className="ojo">{ojo}</div>
            <h1 className="h2">{titulo}</h1>
            <p className="bajada">{bajada}</p>
          </div>
          <ol className="legal">
            {puntos.map(([t, d], i) => (
              <li key={t} data-rv="" data-rv-d={String(40 + i * 40)}>
                <h2>{t}</h2>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <p className="legal-fecha">Última actualización: {fecha}.</p>
        </div>
      </section>
      <Pie />
      <Motor />
    </div>
  )
}
