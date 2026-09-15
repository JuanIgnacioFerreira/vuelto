'use client'

import { useSyncExternalStore } from 'react'

/* Lee la query string de la URL en el cliente sin un setState en un efecto: el
   servidor ve una cadena vacía y el navegador, al hidratar, la de verdad. */

const nada = () => () => {}
const enServidor = () => ''
const enNavegador = () => window.location.search

export function useQuery() {
  const q = useSyncExternalStore(nada, enNavegador, enServidor)
  return new URLSearchParams(q)
}
