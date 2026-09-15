import Link from 'next/link'
import { Logo } from '@/components/marca'

/* La barra: el logo a la izquierda; a la derecha el link al otro público y el
   botón. Fija arriba; el motor la compacta al bajar. Es la misma para la
   página de usuario y para la de locales, con los textos cambiados. En las
   páginas de texto (privacidad, términos) el botón vuelve a la landing. */

export function Barra({ para = 'usuario', inicio = false }: { para?: 'usuario' | 'local'; inicio?: boolean }) {
  const usuario = para === 'usuario'
  const ancla = usuario ? '#beta' : '#alta'
  const boton = inicio ? { href: ancla, 'data-goto': ancla } : { href: `${usuario ? '/' : '/locales'}${ancla}` }
  return (
    <header className="barra">
      <div className="barra-int" data-headbar="">
        <Link href="/" className="barra-logo" aria-label="Vuelto, inicio">
          <Logo />
        </Link>
        <nav className="barra-nav" aria-label="Principal">
          {usuario ? (
            <Link href="/locales" className="barra-enlace">
              <span className="largo">¿Tenés un local?</span>
              <span className="corto">Tu local</span>
            </Link>
          ) : (
            <Link href="/" className="barra-enlace">
              Soy cliente
            </Link>
          )}
          <a {...boton} className="boton boton-acento boton-chico">
            {usuario ? 'Anotarme a la beta' : 'Quiero que mi local esté'}
          </a>
        </nav>
      </div>
    </header>
  )
}
