import Link from 'next/link'
import { INSTAGRAM, MAIL_CONTACTO } from '@/lib/sitio'

/* El pie: el logo «vuelto.» a lo grande, como en la versión anterior, los
   links y una línea con la ciudad. */

const LETRAS = ['v', 'u', 'e', 'l', 't', 'o']

export function Pie({ para = 'usuario' }: { para?: 'usuario' | 'local' }) {
  const enlaces: [string, string][] = [
    para === 'usuario' ? ['Para locales', '/locales'] : ['Para clientes', '/'],
    ['Preguntas', para === 'usuario' ? '/#preguntas' : '/locales#preguntas'],
    ['Privacidad', '/privacidad'],
    ['Términos', '/terminos'],
    ...(INSTAGRAM ? ([['Instagram', INSTAGRAM]] as [string, string][]) : []),
    ['Contacto', `mailto:${MAIL_CONTACTO}`],
  ]
  return (
    <footer className="pie">
      <div className="pie-int">
        <div className="pie-marca" role="img" aria-label="Vuelto">
          {LETRAS.map((l, i) => (
            <span key={i} aria-hidden="true" data-rv="" data-rv-d={String(i * 55)}>
              {l}
            </span>
          ))}
          <span aria-hidden="true" className="pie-punto" data-rv="" data-rv-d="360" />
        </div>
        <nav className="pie-nav" aria-label="Pie">
          {enlaces.map(([texto, href]) =>
            href.startsWith('/') ? (
              <Link key={texto} href={href}>
                {texto}
              </Link>
            ) : (
              <a key={texto} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                {texto}
              </a>
            ),
          )}
        </nav>
        <div className="pie-abajo">
          <span>Montevideo, Uruguay</span>
          <span>© 2026 Vuelto</span>
        </div>
      </div>
    </footer>
  )
}
