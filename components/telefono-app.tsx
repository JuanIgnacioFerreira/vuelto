/* El teléfono con la app abierta: el mapa de la red, qué hay cerca ahora y
   cuánto te falta en cada local. Es decorativo (el texto que importa está al
   lado); comparte el marco con `Telefono`. */

const CERCA: [string, string, string, string, boolean][] = [
  // local, distancia, puntos, estado, ¿te alcanza?
  ['Café Rivera', '120 m', '340', 'Te alcanza el americano', true],
  ['Pizzería', '300 m', '270', 'Faltan 150 para la muzzarella', false],
  ['Heladería', '450 m', '160', 'Te alcanza el cucurucho', true],
  ['Restaurante', '600 m', '210', 'Faltan 120 para el plato', false],
]

const PINES: [number, number][] = [
  [58, 46], [150, 34], [206, 78], [96, 104], [176, 128],
]

export function TelefonoApp({ escala = 1 }: { escala?: number }) {
  return (
    <div className="tel-caja" style={{ '--esc': escala } as React.CSSProperties} aria-hidden="true">
      <div className="tel tel-fijo">
        <div className="tel-pantalla app">
          <div className="tel-estado">
            <span>19:40</span>
            <span className="tel-bateria" />
          </div>
          <div className="app-cab">
            <span className="app-logo">
              vuelto<span>.</span>
            </span>
            <span className="app-total">
              <strong>980</strong> puntos en 4 locales
            </span>
          </div>

          {/* el mapa */}
          <div className="app-mapa">
            <svg viewBox="0 0 246 160" width="100%" height="100%">
              <defs>
                <pattern id="app-manzanas" width="62" height="52" patternUnits="userSpaceOnUse">
                  <rect x="4" y="4" width="54" height="44" rx="7" fill="var(--mapa-manzana)" />
                </pattern>
              </defs>
              <rect width="246" height="160" fill="var(--mapa-fondo)" />
              <g transform="rotate(-6 123 80)">
                <rect x="-40" y="-40" width="330" height="240" fill="url(#app-manzanas)" />
                <rect x="-40" y="72" width="330" height="12" fill="var(--mapa-fondo)" />
                <rect x="118" y="-40" width="10" height="240" fill="var(--mapa-fondo)" />
              </g>
              {PINES.map(([x, y], i) => (
                <g key={i}>
                  <path d={`M${x} ${y + 12} C${x - 7} ${y + 4} ${x - 8} ${y} ${x - 8} ${y - 3} a8 8 0 1 1 16 0 c0 3 -1 7 -8 15z`} fill="var(--acento)" />
                  <circle cx={x} cy={y - 3} r="3" fill="var(--mapa-fondo)" />
                </g>
              ))}
              <circle cx="128" cy="92" r="12" fill="rgba(60,78,31,.18)" />
              <circle cx="128" cy="92" r="5" fill="var(--verde)" stroke="var(--fondo)" strokeWidth="2.5" />
            </svg>
            <span className="app-mapa-chip">Cerca de vos ahora</span>
          </div>

          {/* la lista */}
          <ul className="app-lista">
            {CERCA.map(([local, dist, pts, estado, alcanza]) => (
              <li key={local}>
                <span className="app-local">
                  <strong>{local}</strong>
                  <small>{dist}</small>
                </span>
                <span className="app-pts">
                  <strong>{pts}</strong>
                  <small className={alcanza ? 'app-ok' : ''}>{estado}</small>
                </span>
              </li>
            ))}
          </ul>
          <div className="app-mas">+ 2 locales más en la red</div>

          <div className="app-accion">Regalar un canje</div>
        </div>
      </div>
    </div>
  )
}
