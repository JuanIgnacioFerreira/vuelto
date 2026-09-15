import { Faq, type Pregunta } from '@/components/faq'
import { FormularioPrelista } from '@/components/formulario-prelista'
import { Foto } from '@/components/foto'
import { MapaBarrio } from '@/components/mapa-barrio'
import { TelefonoApp } from '@/components/telefono-app'
import { PUNTOS_BIENVENIDA } from '@/lib/sitio'

/* Los bloques de la página de usuario, en orden: cómo funciona, los puntos
   (con el ejemplo), la app (lo que desbloquea la red), lo que te llevás, por
   qué es distinto, la beta con el formulario y las preguntas.

   La versión implementada es la del documento de Juan Ignacio y la reunión:
   sin app, los puntos se usan en el local donde se sumaron; la app desbloquea
   la red (el mapa, qué hay cerca ahora, cuánto te falta en cada uno, regalar
   un canje, usar los puntos en cualquier local). La app todavía no existe:
   se cuenta lo que va a hacer, nunca «descargala». */

const rv = (d = 0) => ({ 'data-rv': '', 'data-rv-d': String(d) })

/* ── cómo funciona ─────────────────────────────────────────────────────── */

const PASOS: [string, string, string, string, React.ReactNode][] = [
  [
    '/img/hero-2-mano.jpg',
    'Una mano apoya el teléfono en el mostrador de un café',
    'Agregala una vez.',
    'Apoyá el teléfono en el sticker del mostrador o escaneá el QR de la mesa. Tocás «Agregar» y la tarjeta queda en tu wallet. No bajás nada, no llenás nada.',
    <svg key="1" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="14" height="26" rx="3" />
      <path d="M13 7h6M16 25h.01" />
      <path d="M4 12a6 6 0 0 1 0 8M28 12a6 6 0 0 0 0 8" />
    </svg>,
  ],
  [
    '/img/hero-3-barista.jpg',
    'Del otro lado del mostrador, el barista cierra un paquete de café',
    'Sumá al pagar.',
    'Mostrás la tarjeta y el local la escanea. O sumás la compra vos desde el ticket, en el momento o después. Los puntos aparecen en la tarjeta y te avisa sola.',
    <svg key="2" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10V6a2 2 0 0 1 2-2h4M22 4h4a2 2 0 0 1 2 2v4M28 22v4a2 2 0 0 1-2 2h-4M10 28H6a2 2 0 0 1-2-2v-4" />
      <path d="M9 16h14" />
      <path d="M12 11h8M12 21h8" opacity=".5" />
    </svg>,
  ],
  [
    '/img/cafe-gratis.jpg',
    'Sobre el mostrador, una mano le alcanza un capuchino a otra',
    'Canjeá cuando quieras.',
    'Cada local pone dos premios: uno cerca, como un americano o unas papas, y uno para juntar, como la merienda completa o la pizza grande. Siempre ves cuánto te falta. Con la app, canjeás en cualquier local de la red.',
    <svg key="3" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 13h20l-2 14H8z" />
      <path d="M6 13a5 5 0 0 1 20 0" />
      <path d="M26 15h2a2 2 0 0 1 0 4h-3" />
      <path d="M12 7c0-2 2-2 2-4M17 7c0-2 2-2 2-4" opacity=".6" />
    </svg>,
  ],
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="sec">
      <div className="int">
        <div className="cab" {...rv()}>
          <div className="ojo">Cómo funciona</div>
          <h2 className="h2">Tres pasos. El primero, una sola vez.</h2>
        </div>
        <ol className="pasos">
          {PASOS.map(([src, alt, t, d, icono], i) => (
            <li key={t} className="paso paso-con-foto" {...rv(80 + i * 90)}>
              <Foto src={src} alt={alt} className="paso-foto" />
              <span className="paso-icono">{icono}</span>
              <span className="paso-n">{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <Puntos />
      </div>
    </section>
  )
}

/* ── los puntos: el ejemplo de una semana ──────────────────────────────── */

/* Una semana en Café Rivera. Los movimientos van sin el detalle de cuántos
   puntos dio cada compra: el único número es el canje. */
const MOVIMIENTOS: [string, string, string][] = [
  ['lun', 'Un cortado', ''],
  ['mié', 'Una medialuna', ''],
  ['vie', 'Desayuno', ''],
  ['sáb', 'Canje · Americano', '−140'],
]

export function Puntos() {
  return (
    <div className="puntos" style={{ marginTop: 'clamp(40px, 6vh, 72px)' }}>
      <p className="nota" style={{ margin: 0 }} {...rv()}>
        Solo cuenta lo que comprás en los locales adheridos a la red. Los puntos no se cambian por dinero.
      </p>

      <div className="puntos-visual" {...rv(120)}>
        <Foto src="/img/palanca-03.jpg" alt="Dos personas en una mesa de café, cada una con su taza" className="puntos-foto" sizes="(max-width: 980px) 92vw, 44vw" />
        <div className="movs" aria-label="Ejemplo de una semana de movimientos en la tarjeta de un local">
          <div className="movs-cab">
            <span>Tu tarjeta · esta semana</span>
            <span className="movs-barrio">Café Rivera</span>
          </div>
          <ul>
            {MOVIMIENTOS.map(([dia, que, pts]) => (
              <li key={dia + que} className={pts.startsWith('−') ? 'mov mov-canje' : 'mov'}>
                <span className="mov-dia">{dia}</span>
                <span className="mov-que">
                  <strong>{que}</strong>
                </span>
                {pts && <span className="mov-pts">{pts}</span>}
              </li>
            ))}
          </ul>
          <div className="movs-saldo">
            <span>Saldo en Café Rivera</span>
            <span>
              <strong>340</strong> puntos
            </span>
          </div>
          <div className="movs-falta">
            <span className="movs-barra">
              <i style={{ width: '80.95%' }} />
            </span>
            <span>Te faltan 80 para la merienda completa</span>
          </div>
          <div className="movs-red">
            <strong>+380</strong> en otros 3 locales · con la app los usás en todos
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── la app: lo que desbloquea la red ──────────────────────────────────── */

const APP: [string, string, React.ReactNode][] = [
  [
    'Tus puntos, en toda la red.',
    'Lo que sumaste en la cafetería lo usás en la pizzería, en la heladería o en el restaurante. Un solo saldo, todos los locales.',
    <svg key="a" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="4" />
      <circle cx="23" cy="9" r="4" />
      <circle cx="9" cy="23" r="4" />
      <circle cx="23" cy="23" r="4" />
      <path d="M13 9h6M9 13v6M23 13v6M13 23h6" />
    </svg>,
  ],
  [
    'El mapa de la red.',
    'Todos los locales adheridos y cuál te queda cerca ahora. Para decidir dónde comer con los puntos en la mano.',
    <svg key="b" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 29s-9-8.5-9-15a9 9 0 0 1 18 0c0 6.5-9 15-9 15z" />
      <circle cx="16" cy="14" r="3.2" />
    </svg>,
  ],
  [
    'Cuánto te falta en cada uno.',
    'De un vistazo: dónde ya te alcanza para algo y dónde estás cerca. Sin abrir tarjeta por tarjeta.',
    <svg key="c" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 24h24" />
      <path d="M8 24V14M14 24V8M20 24v-8M26 24V11" />
    </svg>,
  ],
  [
    'Regalar un canje.',
    'Usás tus puntos y otra persona se lleva el premio. Un café para alguien, desde el teléfono.',
    <svg key="d" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="12" width="24" height="16" rx="2" />
      <path d="M4 18h24M16 12v16" />
      <path d="M16 12c-3 0-6-1.5-6-4a3 3 0 0 1 6 0M16 12c3 0 6-1.5 6-4a3 3 0 0 0-6 0" />
    </svg>,
  ],
]

export function LaApp() {
  return (
    <section id="app" className="sec sec-verde">
      <div className="int app-sec">
        <div className="app-texto">
          <div className="cab" {...rv()}>
            <div className="ojo ojo-claro">La app</div>
            <h2 className="h2">Sumás en todos. Canjeás donde quieras.</h2>
            <p className="bajada">Sin app, tus puntos se usan en el local donde los sumaste. Con la app, en cualquier local de la red: el mapa, qué hay cerca ahora, cuánto te falta en cada uno y regalar un canje.</p>
          </div>
          <ul className="app-lista-f">
            {APP.map(([t, d, icono], i) => (
              <li key={t} {...rv(80 + i * 70)}>
                <span className="app-icono">{icono}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="app-nota" {...rv(380)}>
            La tarjeta sale primero; la app llega con la red. Si estás en la prelista, te avisamos por mail.
          </p>
        </div>
        <div className="app-visual" {...rv(140)}>
          <div className="app-mapa-fondo" aria-hidden="true">
            <MapaBarrio />
          </div>
          <div className="app-tel">
            <TelefonoApp escala={0.82} />
          </div>
          <p className="app-pie">Los locales de la red se anuncian acá cuando se suman.</p>
        </div>
      </div>
    </section>
  )
}

/* ── lo que te llevás ──────────────────────────────────────────────────── */

const PREMIOS: [string, string, string][] = [
  ['Cafetería', 'Americano o capuchino', 'Merienda completa'],
  ['Hamburguesería', 'Papas con bacon', 'Combo entero'],
  ['Pizzería', 'Porción', 'Muzzarella grande'],
  ['Heladería', 'Cucurucho', 'Kilo o postre'],
  ['Restaurante', 'Entrada o postre', 'Plato principal'],
]

export function Premios() {
  return (
    <section id="premios" className="sec">
      <div className="int">
        <div className="premios-cab">
          <div className="cab" {...rv()}>
            <div className="ojo">Lo que te llevás</div>
            <h2 className="h2">Productos, no cupones.</h2>
            <p className="bajada">Cada premio tiene su precio en puntos y lo ves en la tarjeta antes de ir. Uno cerca, para el gusto de la semana; uno para juntar.</p>
          </div>
          <div className="premios-fotos" {...rv(100)}>
            <figure className="premio-foto">
              <Foto src="/img/latte.jpg" alt="Un capuchino recién servido, con la leche dibujando una flor" sizes="(max-width: 980px) 46vw, 22vw" />
              <figcaption>
                <strong>170</strong> puntos · el capuchino
              </figcaption>
            </figure>
            <figure className="premio-foto premio-foto-2">
              <Foto src="/img/palanca-05.jpg" alt="Una medialuna con un moño, en un plato sobre la barra de mármol" sizes="(max-width: 980px) 46vw, 22vw" />
              <figcaption>
                <strong>420</strong> puntos · la merienda completa
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="premios-caja" {...rv(80)}>
          <table className="premios">
            <thead>
              <tr>
                <th scope="col">Local</th>
                <th scope="col">Premio cerca</th>
                <th scope="col">Premio para juntar</th>
              </tr>
            </thead>
            <tbody>
              {PREMIOS.map(([local, cerca, juntar]) => (
                <tr key={local}>
                  <th scope="row">{local}</th>
                  <td data-col="Premio cerca">{cerca}</td>
                  <td data-col="Para juntar">{juntar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="nota" {...rv(140)}>
          Los premios los pone cada local. No son descuentos ni cupones: son productos, y los ves en la tarjeta con su precio en puntos antes de ir.
        </p>
      </div>
    </section>
  )
}

/* ── por qué es distinto ───────────────────────────────────────────────── */

const DISTINTO: [string, string, string, string][] = [
  ['/img/carton.jpg', 'Una tarjeta de cartón con sellos, gastada, bajo una taza vacía', 'No es un cupón.', 'Los puntos se ganan comprando y se gastan comprando. No hay letra chica ni día de la semana.'],
  ['/img/local-montevideo.jpg', 'El mostrador de una cafetería de barrio, con plantas y medialunas en la vitrina', 'No es la promo del banco.', 'El descuento del banco está en las cadenas. Esto está en el café de la esquina, la pizzería de siempre y la heladería de la vuelta.'],
  ['/img/palanca-08.jpg', 'Dos teléfonos boca abajo sobre la mesa, junto a dos cafés', 'No es una app más.', 'La tarjeta vive en la wallet, al lado de tus tarjetas y tus entradas: se actualiza sola y te avisa cuando te alcanza para algo. La app la bajás si querés más.'],
]

export function Distinto() {
  return (
    <section id="distinto" className="sec sec-superficie">
      <div className="int">
        <div className="cab" {...rv()}>
          <div className="ojo">Por qué es distinto</div>
          <h2 className="h2">Tres cosas que no es.</h2>
        </div>
        <div className="distintos">
          {DISTINTO.map(([src, alt, t, d], i) => (
            <article key={t} className="distinto" {...rv(80 + i * 90)}>
              <Foto src={src} alt={alt} className="distinto-foto" />
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── la beta: el formulario ────────────────────────────────────────────── */

export function Beta() {
  return (
    <section id="beta" className="sec sec-acento sec-con-fondo">
      <div className="sec-fondo" aria-hidden="true">
        <Foto src="/img/mostrador.jpg" alt="" sizes="100vw" />
      </div>
      <div className="int beta">
        <div className="beta-texto" {...rv()}>
          <div className="ojo ojo-claro">La beta</div>
          <h2 className="h2 h2-grande">Los primeros 500 arrancan con {PUNTOS_BIENVENIDA} puntos.</h2>
          <p className="bajada">Estamos armando la red de locales. Decinos por dónde salís a comer y cuáles son tus lugares: arrancamos por donde más gente se anota.</p>
        </div>
        <div className="beta-form" {...rv(120)}>
          <FormularioPrelista />
        </div>
      </div>
    </section>
  )
}

/* ── preguntas ─────────────────────────────────────────────────────────── */

const PREGUNTAS: Pregunta[] = [
  {
    q: '¿Tengo que bajar una app?',
    a: 'Para la tarjeta, no: se guarda en Apple Wallet o Google Wallet, la misma wallet donde tenés las tarjetas y las entradas, y con eso sumás y canjeás. La app es opcional y suma: con ella usás tus puntos en cualquier local de la red, ves el mapa y podés regalar un canje.',
  },
  {
    q: '¿Cuánto vale un punto?',
    a: 'Los premios tienen precio en puntos, y lo ves en la tarjeta: por ejemplo, un americano puede ser 140 puntos y una merienda completa 420. Los puntos no se cambian por dinero.',
  },
  { q: '¿Cómo sumo?', a: 'Mostrás la tarjeta al pagar y el local la escanea. Si te olvidaste o pediste delivery, sumás la compra vos desde el link de la tarjeta con el ticket.' },
  {
    q: '¿Dónde sirve?',
    a: 'Sin app, en el local donde sumaste los puntos. Con la app, en cualquier local de la red. Los locales los ves en la tarjeta, en el mapa de la app y en esta página a medida que se suman.',
  },
  { q: '¿Cuándo sale la app?', a: 'Después de la tarjeta. Primero armamos la red de locales; la app llega con ella. Si estás en la prelista, te avisamos por mail.' },
  { q: '¿Los puntos vencen?', a: 'Sí, a los doce meses de sumados, y te avisamos antes solo cuando te alcanza para algo.' },
  { q: '¿Puedo pasarle puntos a alguien?', a: 'No. Lo que sí podés, con la app, es regalar un canje: usás tus puntos y la otra persona se lleva el premio.' },
  { q: '¿Qué datos piden?', a: 'Para la tarjeta, ninguno. Para la beta, un mail y por dónde salís a comer. Nunca vendemos tus datos; los locales solo ven cuántas personas de la red los visitan.' },
]

export function Preguntas() {
  return (
    <section id="preguntas" className="sec">
      <div className="int int-angosto">
        <div className="cab" {...rv()}>
          <div className="ojo">Preguntas</div>
          <h2 className="h2">Las ocho que siempre nos hacen.</h2>
        </div>
        <Faq preguntas={PREGUNTAS} />
      </div>
    </section>
  )
}

/* ── el cierre y el botón fijo del celular ─────────────────────────────── */

/* El último empujón, después de las preguntas: repite la oferta y lleva al
   formulario. */
export function Cierre() {
  return (
    <section id="cierre" className="sec sec-verde cierre">
      <div className="int int-angosto">
        <div className="cab" {...rv()}>
          <h2 className="h2">Los primeros 500 arrancan con {PUNTOS_BIENVENIDA} puntos.</h2>
          <p className="bajada">Estamos armando la red. Dejanos tu mail y por dónde salís a comer.</p>
          <div className="cierre-botones">
            <a href="#beta" data-goto="#beta" className="boton boton-cierre boton-grande">
              Anotarme a la beta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* La barra fija de abajo, solo en celular: el motor la muestra al pasar el
   hero y la esconde cuando el formulario está a la vista. */
export function CtaFija() {
  return (
    <div className="cta-fija" id="cta-fija" aria-hidden="true">
      <a href="#beta" data-goto="#beta" className="boton boton-acento boton-grande">
        Anotarme a la beta
      </a>
    </div>
  )
}
