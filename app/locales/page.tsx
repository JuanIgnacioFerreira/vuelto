import type { Metadata } from 'next'
import { Barra } from '@/components/barra'
import { Faq, type Pregunta } from '@/components/faq'
import { FormularioLocal } from '@/components/formulario-local'
import { Foto } from '@/components/foto'
import { Motor } from '@/components/motor'
import { Pie } from '@/components/pie'

/* La página de comercios: corta, sin precios. El objetivo es que el dueño
   escriba. Son los únicos números de todo el sitio, y cada uno con su fuente. */

export const metadata: Metadata = {
  title: 'Vuelto para tu local · Los clientes de la red ya tienen puntos para gastar en el tuyo',
  description: 'Una tarjeta en la wallet de tus clientes, sin app y sin formulario. Vos ponés dos premios; nosotros ponemos la red. Los primeros locales de la red entran gratis.',
  alternates: { canonical: '/locales' },
  openGraph: { title: 'Vuelto para tu local', description: 'Los clientes de los otros locales de la red ya tienen puntos para gastar en el tuyo.', url: '/locales' },
}

const rv = (d = 0) => ({ 'data-rv': '', 'data-rv-d': String(d) })

const PASOS: [string, string, string, string][] = [
  ['/img/palanca-03.jpg', 'Dos personas conversan en una mesa de café', 'El alta es una visita.', 'Te traemos el catálogo armado para tu rubro: un premio cerca (el que pide compañía: un americano, unas papas) y uno para juntar (la merienda, el combo). Lo aprobás o lo ajustás. Vos decidís cuántos canjes por día aceptás.'],
  ['/img/hero-2-mano.jpg', 'Una mano con el teléfono sobre el mostrador', 'Sumás desde tu celular.', 'Escaneás la tarjeta del cliente y tocás un tramo de monto. Dos toques en tu celular, cinco segundos. Sin equipos y sin integrar la caja.'],
  ['/img/palanca-09.jpg', 'Cuatro cafés en fila sobre la barra, con luz de tarde', 'Te llega el resumen.', 'Cada semana, por WhatsApp: cuántos sumaron, cuántos canjearon, cuántos vinieron de otros locales de la red y cuántos de esos canjes se fueron con una compra más.'],
]

const RED: [string, string][] = [
  ['Llenar las horas muertas.', 'Puntos dobles de 15 a 18, o los martes, con un toque desde tu celular.'],
  ['Aparecer en el mapa.', 'Los clientes de la red miran el mapa para decidir dónde comer.'],
  ['Que un cliente le regale un canje a otro.', 'Es un cliente nuevo que entra sin que vos hagas nada.'],
]

const EVIDENCIA: [string, string, string, string][] = [
  ['19 → 34', 'de cada 100 tarjetas se completan', 'Sin sellos de regalo se completan 19 de cada 100 tarjetas; con dos sellos de regalo, 34.', 'Nunes y Drèze, Journal of Consumer Research, 2006'],
  ['+11 %', 'de tráfico en la franja', 'La Happy Hour de Starbucks sumó 11 % de tráfico en la franja sin canibalizar el resto del día.', 'inMarket'],
]

const PREGUNTAS: Pregunta[] = [
  { q: '¿Qué necesito?', a: 'Un celular con cámara. Nada más.' },
  {
    q: '¿Tengo que regalar producto a clientes de otros locales?',
    a: 'Solo hasta el tope que vos fijás por día, y a tu costo. Cada canje cruzado es alguien que entró a tu local y, en la mayoría de los casos, compró algo más.',
  },
  { q: '¿Puedo salir cuando quiera?', a: 'Sí, avisando con 60 días, y en ese tiempo seguís aceptando los canjes de tus propios puntos.' },
  { q: '¿Quién es responsable ante el cliente?', a: 'Vuelto. Vos solo entregás el premio cuando la tarjeta lo muestra.' },
]

export default function Locales() {
  return (
    <div data-root="" className="raiz">
      <Barra para="local" inicio />

      <section className="sec sec-hero-local">
        <div className="int hero-local-grid">
          <div className="hero-local" {...rv()}>
            <div className="chip">
              <span className="chip-punto" />
              <span>Para tu local</span>
            </div>
            <h1 className="hero-h1">Los clientes de los otros locales de la red ya tienen puntos para gastar en el tuyo.</h1>
            <p className="hero-bajada">Una tarjeta en la wallet de tus clientes, sin app y sin formulario. Vos ponés dos premios; nosotros ponemos la red. Los primeros locales de la red entran gratis.</p>
            <div className="hero-botones">
              <a href="#alta" data-goto="#alta" className="boton boton-acento boton-grande">
                Quiero que mi local esté
              </a>
              <a href="#como" data-goto="#como" className="boton boton-linea boton-grande">
                Cómo funciona
              </a>
            </div>
          </div>
          <div className="hero-local-foto" {...rv(160)}>
            <Foto src="/img/palanca-06.jpg" alt="Un barista deja un café y un alfajor sobre la barra" sizes="(max-width: 980px) 92vw, 40vw" prioridad />
          </div>
        </div>
      </section>

      <section id="como" className="sec sec-superficie">
        <div className="int">
          <div className="cab" {...rv()}>
            <div className="ojo">Cómo funciona para el local</div>
            <h2 className="h2">Una visita, tu celular y un resumen por semana.</h2>
          </div>
          <ol className="pasos">
            {PASOS.map(([src, alt, t, d], i) => (
              <li key={t} className="paso paso-con-foto" {...rv(80 + i * 90)}>
                <Foto src={src} alt={alt} className="paso-foto" />
                <span className="paso-n">{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="sellos" className="sec">
        <div className="int int-angosto">
          <div className="cab" {...rv()}>
            <div className="ojo">La tarjeta</div>
            <h2 className="h2">Reemplaza la tarjeta de sellos.</h2>
            <p className="bajada">La tarjeta de cartón se pierde, se moja y se falsifica, y no te dice nada de quién volvió. Esta vive en la wallet del cliente, se actualiza sola y te deja ver cuántos vuelven.</p>
          </div>
        </div>
      </section>

      <section id="costo" className="sec sec-superficie">
        <div className="int int-angosto">
          <div className="cab" {...rv()}>
            <div className="ojo">Cuánto cuesta</div>
            <h2 className="h2">Gratis para entrar. Después, solo cuando alguien vuelve.</h2>
            <p className="bajada">
              Los primeros locales de la red entran gratis. Después, sin abono fijo: pagás cuando un cliente vuelve y canjea, y el premio lo ponés a tu costo, no al precio de carta. Te lo contamos en una llamada de quince minutos. Te vas cuando querés, sin plazo mínimo.
            </p>
          </div>
        </div>
      </section>

      <section id="red" className="sec sec-verde">
        <div className="int">
          <div className="cab" {...rv()}>
            <div className="ojo ojo-claro">Lo que te da la red</div>
            <h2 className="h2">Tres cosas que solo pasan en red.</h2>
          </div>
          <ul className="red">
            {RED.map(([t, d], i) => (
              <li key={t} {...rv(60 + i * 60)}>
                <span className="red-n">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{t}</strong> {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="evidencia" className="sec">
        <div className="int">
          <div className="cab" {...rv()}>
            <div className="ojo">Lo que dice la evidencia</div>
            <h2 className="h2">Dos números, cada uno con su fuente.</h2>
          </div>
          <div className="evidencias">
            {EVIDENCIA.map(([num, que, texto, fuente], i) => (
              <article key={fuente + num} className="evidencia" {...rv(80 + i * 80)}>
                <div className="evidencia-num">{num}</div>
                <div className="evidencia-que">{que}</div>
                <p>{texto}</p>
                <cite>{fuente}</cite>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="alta" className="sec sec-acento">
        <div className="int beta">
          <div className="beta-texto" {...rv()}>
            <div className="ojo ojo-claro">El alta</div>
            <h2 className="h2 h2-grande">Contanos de tu local y agendamos la visita.</h2>
            <p className="bajada">Te escribimos por WhatsApp en 48 horas. Llevamos el catálogo armado para tu rubro; lo aprobás o lo ajustás ahí mismo.</p>
          </div>
          <div className="beta-form" {...rv(120)}>
            <FormularioLocal />
          </div>
        </div>
      </section>

      <section id="preguntas" className="sec">
        <div className="int int-angosto">
          <div className="cab" {...rv()}>
            <div className="ojo">Preguntas del local</div>
            <h2 className="h2">Las cuatro que siempre nos hacen.</h2>
          </div>
          <Faq preguntas={PREGUNTAS} id="faq-local" />
        </div>
      </section>

      <Pie para="local" />
      <Motor />
    </div>
  )
}
