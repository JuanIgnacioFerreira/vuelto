/* El teléfono con la tarjeta de Vuelto en la wallet. Todo lo que cambia entre
   un momento y otro (pantalla de bloqueo, hoja de «Agregar», tarjeta, haz del
   escaneo, «+14 puntos», aviso) se gobierna con variables CSS: en escritorio
   las escribe el motor cuadro a cuadro según el scroll; en celular, cada
   cuadro fijo las trae puestas (`fijo`). Es decorativo: el texto que importa
   está en el HTML de al lado. */

type Cuadro = 'bloqueo' | 'wallet' | 'escaneo' | 'aviso'

const CUADROS: Record<Cuadro, React.CSSProperties> = {
  bloqueo: { '--lock': 1, '--wal': 0, '--card': 0 } as React.CSSProperties,
  wallet: { '--lock': 0, '--wal': 1, '--card': 1 } as React.CSSProperties,
  escaneo: { '--lock': 0, '--wal': 1, '--card': 1, '--scan': 0.55, '--scanO': 1 } as React.CSSProperties,
  aviso: { '--lock': 0, '--wal': 1, '--card': 1, '--notif': 1, '--notifO': 1, '--listo': 1 } as React.CSSProperties,
}

export function Telefono({ fijo, escala = 1 }: { fijo?: Cuadro; escala?: number }) {
  return (
    <div className="tel-caja" style={{ '--esc': escala } as React.CSSProperties} aria-hidden="true">
      <div className="tel" style={fijo ? CUADROS[fijo] : undefined}>
        <div className="tel-pantalla">
          {/* pantalla de bloqueo */}
          <div className="tel-bloqueo">
            <div className="tel-estado tel-estado-claro">
              <span>14:32</span>
              <span className="tel-bateria" />
            </div>
            <div className="tel-hora">
              <div className="tel-fecha">martes 15 de setiembre</div>
              <div className="tel-hora-num">14:32</div>
            </div>
            <div className="tel-home" />
          </div>

          {/* la wallet, con la tarjeta */}
          <div className="tel-wallet">
            <div className="tel-estado">
              <span>14:33</span>
              <span className="tel-bateria tel-bateria-oscura" />
            </div>
            <div className="tel-wallet-titulo">Wallet</div>
            <div className="tel-tarjeta-caja">
              <div className="tarjeta">
                <div className="tarjeta-cab">
                  <span className="tarjeta-logo">
                    vuelto<span>.</span>
                  </span>
                  <span className="tarjeta-barrio">Café Rivera</span>
                </div>
                <div className="tarjeta-puntos">
                  <span className="tarjeta-num" data-puntos="">
                    340
                  </span>
                  <span className="tarjeta-unidad">puntos</span>
                </div>
                <div className="tarjeta-qr">
                  <svg viewBox="0 0 21 21" width="100%" height="100%" shapeRendering="crispEdges">
                    <path
                      fill="currentColor"
                      d="M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM14 0h7v7h-7zM15 1v5h5V1zM16 2h3v3h-3zM0 14h7v7H0zM1 15v5h5v-5zM2 16h3v3H2zM8 0h1v1H8zM10 0h1v2h-1zM12 0h1v1h-1zM8 2h2v1H8zM11 2h2v1h-2zM8 4h1v2H8zM10 4h1v1h-1zM12 4h1v2h-1zM9 6h1v1H9zM11 6h2v1h-2zM0 8h1v1H0zM2 8h2v1H2zM5 8h1v1H5zM7 8h2v1H7zM10 8h1v2h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h2v1h-2zM19 8h2v1h-2zM1 10h1v1H1zM3 10h1v2H3zM5 10h2v1H5zM8 10h1v1H8zM11 10h2v1h-2zM15 10h1v1h-1zM17 10h1v2h-1zM19 10h1v1h-1zM0 12h2v1H0zM4 12h2v1H4zM7 12h2v1H7zM10 12h1v1h-1zM12 12h3v1h-3zM16 12h1v1h-1zM18 12h1v1h-1zM20 12h1v1h-1zM8 14h1v1H8zM10 14h2v1h-2zM13 14h1v1h-1zM15 14h1v2h-1zM17 14h2v1h-2zM20 14h1v1h-1zM9 16h2v1H9zM12 16h2v1h-2zM16 16h1v1h-1zM18 16h1v1h-1zM8 18h1v1H8zM10 18h1v2h-1zM12 18h1v1h-1zM14 18h1v1h-1zM16 18h3v1h-3zM20 18h1v1h-1zM9 20h1v1H9zM11 20h2v1h-2zM14 20h1v1h-1zM17 20h1v1h-1zM19 20h2v1h-2z"
                    />
                  </svg>
                  <span className="tarjeta-haz" />
                </div>
                <div className="tarjeta-local">Premios del local</div>
                <ul className="tarjeta-premios">
                  <li>
                    <span>Americano</span>
                    <span className="tarjeta-precio">140</span>
                    <span className="tarjeta-listo">te alcanza</span>
                  </li>
                  <li>
                    <span>Merienda completa</span>
                    <span className="tarjeta-precio">420</span>
                    <span className="tarjeta-falta">
                      faltan <span data-faltan="">80</span>
                    </span>
                  </li>
                </ul>
                <div className="tarjeta-red">
                  Tenés <strong>380</strong> más en otros 3 locales. Con la app los usás en todos.
                </div>
                <span className="tarjeta-suma">+14 puntos</span>
              </div>
              <div className="tel-otra-tarjeta" />
            </div>
          </div>

          {/* la hoja «Agregar a Apple Wallet» */}
          <div className="tel-hoja">
            <div className="tel-hoja-asa" />
            <div className="tel-hoja-cab">
              <span className="tel-hoja-logo">
                v<span>.</span>
              </span>
              <span>
                <strong>Vuelto · Café Rivera</strong>
                <small>Tu tarjeta de puntos</small>
              </span>
            </div>
            <div className="tel-hoja-boton">
              Agregar a Apple Wallet
              <span className="tel-toque" />
            </div>
          </div>

          {/* el aviso */}
          <div className="tel-aviso">
            <span className="tel-aviso-icono">
              v<span>.</span>
            </span>
            <span className="tel-aviso-texto">
              <small>Vuelto · ahora</small>
              <strong>Te alcanza para el americano en Café Rivera.</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
