'use client'

import { TITULARES } from '@/lib/sitio'
import { useQuery } from '@/lib/use-url'
import { titularDe } from '@/lib/utm'

/* El titular del hero. El servidor manda la A; si el link trae `?t=b`, `?t=c`
   o `utm_content=b…|c…`, el navegador muestra esa. El registro guarda cuál se vio. */
export function TitularHero() {
  const cual = titularDe(useQuery()) ?? 'a'
  return (
    <h1 className={`hero-h1 hero-h1-${cual}`} data-titular={cual}>
      {TITULARES[cual]}
    </h1>
  )
}
