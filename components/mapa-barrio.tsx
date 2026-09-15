/* Un mapa simplificado del barrio: manzanas, calles y pines del mismo color,
   sin nombres de locales —no hay ninguno firmado todavía—. El pin más grande
   es «vos». */

const PINES: [number, number][] = [
  [92, 78], [214, 64], [318, 118], [148, 176], [262, 214], [372, 236], [86, 266], [206, 300],
]

export function MapaBarrio() {
  return (
    <svg className="mapa" viewBox="0 0 440 360" role="img" aria-label="Un mapa del barrio con ocho locales de la red marcados">
      <defs>
        <pattern id="manzanas" width="110" height="94" patternUnits="userSpaceOnUse">
          <rect x="7" y="7" width="96" height="80" rx="10" fill="var(--mapa-manzana)" />
        </pattern>
      </defs>
      <rect width="440" height="360" rx="24" fill="var(--mapa-fondo)" />
      <g transform="rotate(-6 220 180)">
        <rect x="-60" y="-60" width="560" height="480" fill="url(#manzanas)" />
        {/* la avenida y la diagonal */}
        <rect x="-60" y="164" width="560" height="22" fill="var(--mapa-fondo)" />
        <rect x="150" y="-60" width="18" height="480" fill="var(--mapa-fondo)" />
        {/* la plaza */}
        <rect x="285" y="102" width="86" height="66" rx="33" fill="var(--mapa-plaza)" />
      </g>
      {PINES.map(([x, y], i) => (
        <g key={i} className="pin" style={{ '--i': i } as React.CSSProperties}>
          <ellipse cx={x} cy={y + 22} rx="9" ry="3.5" fill="rgba(27,22,20,.16)" />
          <path d={`M${x} ${y + 20} C${x - 12} ${y + 6} ${x - 14} ${y - 2} ${x - 14} ${y - 6} a14 14 0 1 1 28 0 c0 4 -2 12 -14 26z`} fill="var(--acento)" />
          <circle cx={x} cy={y - 6} r="5.5" fill="var(--mapa-fondo)" />
        </g>
      ))}
      {/* vos */}
      <g>
        <circle cx="228" cy="150" r="22" fill="rgba(60,78,31,.18)" className="pin-vos-halo" />
        <circle cx="228" cy="150" r="8" fill="var(--verde)" stroke="var(--fondo)" strokeWidth="3" />
      </g>
    </svg>
  )
}
