'use client'

import { useLayoutEffect, useRef, useState } from 'react'

/* El acordeón de preguntas. Recibe las preguntas: la página de usuario y la de
   locales tienen cada una las suyas. Sin JS, las respuestas quedan abiertas. */

export type Pregunta = { q: string; a: string }

export function Faq({ preguntas, id = 'faq' }: { preguntas: Pregunta[]; id?: string }) {
  const [abierta, setAbierta] = useState<number | null>(null)
  const respuestas = useRef<(HTMLDivElement | null)[]>([])

  // El alto se mide sobre el contenido real, y se vuelve a medir si cambia el
  // ancho y el texto reflota.
  useLayoutEffect(() => {
    const aplicar = () => {
      respuestas.current.forEach((el, i) => {
        if (!el) return
        const abierto = i === abierta
        el.style.maxHeight = abierto ? `${el.scrollHeight + 24}px` : '0px'
        el.style.opacity = abierto ? '1' : '0'
      })
    }
    aplicar()
    window.addEventListener('resize', aplicar)
    return () => window.removeEventListener('resize', aplicar)
  }, [abierta])

  return (
    <div className="faq" data-rv="" data-rv-d="80">
      {preguntas.map(({ q, a }, i) => {
        const abierto = i === abierta
        return (
          <div key={q} className="faq-item">
            <button type="button" className="faq-q" id={`${id}-q-${i}`} aria-expanded={abierto} aria-controls={`${id}-a-${i}`} onClick={() => setAbierta(abierto ? null : i)}>
              <span>{q}</span>
              <span className="faq-icono" aria-hidden="true" style={abierto ? { transform: 'rotate(45deg)' } : undefined}>
                +
              </span>
            </button>
            <div
              className="faq-a"
              data-faq-a=""
              id={`${id}-a-${i}`}
              role="region"
              aria-labelledby={`${id}-q-${i}`}
              ref={(el) => {
                respuestas.current[i] = el
              }}
            >
              <p>{a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
