/* Los UTM del anuncio que trajo a la persona. Se leen de la URL la primera vez
   y se guardan en sessionStorage: así, aunque navegue a «Para locales» y
   vuelva, el registro sale con el anuncio que lo trajo. Corre solo en el
   navegador. */

import type { Titular } from '@/lib/sitio'

export const CLAVES_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
export type Utm = Partial<Record<(typeof CLAVES_UTM)[number], string>> & { titular?: Titular; landing?: string }

const CLAVE = 'vuelto-utm'

export function capturarUtm(): Utm {
  if (typeof window === 'undefined') return {}
  const q = new URLSearchParams(window.location.search)
  const nuevo: Utm = {}
  for (const k of CLAVES_UTM) {
    const v = q.get(k)
    if (v) nuevo[k] = v.slice(0, 120)
  }
  const t = titularDe(q)
  if (t) nuevo.titular = t
  let previo: Utm = {}
  try {
    previo = JSON.parse(sessionStorage.getItem(CLAVE) ?? '{}') as Utm
  } catch {}
  // Lo nuevo de la URL pisa lo guardado; lo guardado completa lo que falta.
  const utm: Utm = { ...previo, ...nuevo }
  if (!utm.landing) utm.landing = window.location.pathname + window.location.search
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(utm))
  } catch {}
  return utm
}

export function leerUtm(): Utm {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE) ?? '{}') as Utm
  } catch {
    return {}
  }
}

/* Qué titular mostrar: `?t=b`, o `utm_content` que empiece con b/c (los
   anuncios llevan `utm_content=b-barrio`, por ejemplo). Sin nada, la A. */
export function titularDe(q: URLSearchParams): Titular | undefined {
  const crudo = (q.get('t') ?? q.get('utm_content') ?? '').toLowerCase()
  const letra = crudo.charAt(0)
  return letra === 'a' || letra === 'b' || letra === 'c' ? letra : undefined
}
