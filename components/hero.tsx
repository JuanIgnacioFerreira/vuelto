import { Badges } from '@/components/marca'
import { Telefono } from '@/components/telefono'
import { TitularHero } from '@/components/titular'
import { PUNTOS_BIENVENIDA } from '@/lib/sitio'

/* El hero. Una sola sección con el texto una vez (el titular y la bajada), y
   dos visuales: en escritorio, el teléfono animado con el scroll —cinco
   tiempos, y los textos que se relevan al costado—; en celular, tres cuadros
   fijos (la tarjeta en la wallet, el escaneo en la caja, el aviso). Cuál se ve
   lo decide el CSS; el motor solo mueve el de escritorio. */

const TIEMPOS: [string, string, string][] = [
  ['Paso 1', 'Agregala una vez.', 'Apoyás el teléfono en el sticker del mostrador o escaneás el QR de la mesa. Tocás «Agregar» y queda en tu wallet.'],
  ['Paso 2', 'Sumá al pagar.', 'Mostrás la tarjeta y el local la escanea con su celular. Nada que bajar, nada que llenar.'],
  ['Paso 2', 'Y aparece solo.', 'Los puntos entran a la tarjeta en el momento, y te avisa sola.'],
  ['Paso 3', 'Siempre sabés cuánto te falta.', 'Cada premio tiene su precio en puntos, ahí en la tarjeta.'],
  ['Paso 3', 'Te alcanza para algo.', 'El aviso llega a la pantalla de bloqueo, como cualquier notificación.'],
]

const CUADROS = [
  ['wallet', 'Queda en tu wallet', 'Sin app y sin formulario.'],
  ['escaneo', 'El local la escanea', 'Y los puntos aparecen solos.'],
  ['aviso', 'Te avisa cuando te alcanza', 'Para el americano, para la porción.'],
] as const

export function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-stage" data-stage="">
        {/* las cuatro fotografías del fondo, una por momento del scroll (solo escritorio) */}
        <div className="hero-fondos" aria-hidden="true">
          <div className="hero-fondo" style={{ backgroundImage: "url('/img/hero-1-mostrador.jpg')", opacity: 'var(--bg1,1)' }} />
          <div className="hero-fondo" style={{ backgroundImage: "url('/img/hero-2-mano.jpg')", opacity: 'var(--bg2,0)' }} />
          <div className="hero-fondo" style={{ backgroundImage: "url('/img/hero-3-barista.jpg')", opacity: 'var(--bg3,0)' }} />
          <div className="hero-fondo" style={{ backgroundImage: "url('/img/hero-4-golden.jpg')", opacity: 'var(--bg4,0)' }} />
          <div className="hero-velo hero-velo-x" />
          <div className="hero-velo hero-velo-y" />
          <div className="hero-brillo" />
        </div>

        <div className="hero-grid">
          <div className="hero-texto">
            {/* el tiempo cero: lo que se lee al llegar */}
            <div className="beat beat-0">
              <div className="chip">
                <span className="chip-punto" />
                <span>Puntos por salir a comer · Montevideo</span>
              </div>
              <TitularHero />
              <p className="hero-bajada">Sumás puntos por lo que comprás en los cafés, pizzerías y heladerías de la red y los canjeás por lo que ellos ponen.</p>
              <p className="hero-oferta">
                Estamos por arrancar. Anotate a la beta y te regalamos <strong>{PUNTOS_BIENVENIDA} puntos</strong>.
              </p>
              <p className="hero-urgencia">Arrancamos por los barrios donde más gente se anota.</p>
              <div className="hero-botones">
                <a href="#beta" data-goto="#beta" className="boton boton-acento boton-grande">
                  Anotarme a la beta
                </a>
                <a href="#como-funciona" data-goto="#como-funciona" className="boton boton-linea boton-grande">
                  Ver cómo funciona
                </a>
              </div>
              <div className="hero-wallets">
                <span>Apple Wallet y Google Wallet</span>
                <Badges />
              </div>
            </div>

            {/* los cinco tiempos que se relevan al scrollear (solo escritorio) */}
            {TIEMPOS.map(([paso, t, d], i) => (
              <div key={t} className={`beat beat-n beat-${i + 1}`} aria-hidden="true">
                <div className="ojo">{paso}</div>
                <p className="beat-h">{t}</p>
                <p className="beat-p">{d}</p>
                {i === 4 && (
                  <div className="beat-cierre">
                    <a href="#beta" data-goto="#beta" className="boton boton-acento boton-grande" tabIndex={-1}>
                      Anotarme a la beta
                    </a>
                    <Badges />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hero-visual">
            {/* escritorio: un teléfono, animado por el motor */}
            <div className="hero-telefono solo-esc" data-phone-cell="">
              <div className="hero-telefono-pos">
                <Telefono />
              </div>
            </div>
            {/* celular: los tres cuadros fijos */}
            <div className="hero-cuadros solo-m" aria-label="Cómo se ve la tarjeta en el teléfono">
              {CUADROS.map(([cuadro, t, d], i) => (
                <figure key={cuadro} className="cuadro">
                  <Telefono fijo={cuadro} escala={0.52} />
                  <figcaption>
                    <span className="cuadro-n">{i + 1}</span>
                    <strong>{t}</strong>
                    <span>{d}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-avance solo-esc" aria-hidden="true" />
        <div className="hero-pista solo-esc" aria-hidden="true">
          <span>Scrolleá</span>
          <i />
        </div>
      </div>
    </section>
  )
}
