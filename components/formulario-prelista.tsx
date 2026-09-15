'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { BARRIOS, MAIL_CONTACTO, ORIGENES, PUNTOS_BIENVENIDA, WHATSAPP_COMPARTIR } from '@/lib/sitio'
import { useQuery } from '@/lib/use-url'
import { leerUtm } from '@/lib/utm'

/* El formulario de la beta: mail, zona, los lugares y cómo se enteró, con el
   consentimiento obligatorio. Manda a /api/prelista junto con el UTM del
   anuncio. Según lo que haya del otro lado, la respuesta pide confirmar el
   mail, da por hecha el alta, o abre el correo del visitante con el mensaje
   armado para que nada se pierda. */

type Estado = 'quieto' | 'enviando' | 'confirmar' | 'listo' | 'correo' | 'error'

function correo(d: Record<string, string>) {
  const asunto = `Me anoto en la prelista de Vuelto · ${d.barrio === 'Otro' ? d.barrioOtro : d.barrio}`
  const cuerpo = [`Mail: ${d.email}`, `Zona: ${d.barrio === 'Otro' ? d.barrioOtro : d.barrio}`, `Lugares: ${d.lugares}`, `Me enteré por: ${d.origen}`].join('\n')
  return `mailto:${MAIL_CONTACTO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
}

export function FormularioPrelista() {
  const [estado, setEstado] = useState<Estado>('quieto')
  const [barrio, setBarrio] = useState('')
  // Al volver del link del mail, la página trae `?confirmado=1|0`.
  const confirmado = useQuery().get('confirmado')

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const datos = Object.fromEntries(new FormData(form)) as Record<string, string>
    if (datos.web) return
    setEstado('enviando')
    try {
      const r = await fetch('/api/prelista', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...datos, ...leerUtm() }) })
      const j = (await r.json()) as { ok: boolean; modo?: 'confirmar' | 'directo' | 'correo' }
      if (!r.ok || !j.ok) throw new Error('prelista')
      if (j.modo === 'correo') {
        window.location.href = correo(datos)
        setEstado('correo')
        return
      }
      form.reset()
      setBarrio('')
      setEstado(j.modo === 'confirmar' ? 'confirmar' : 'listo')
    } catch {
      setEstado('error')
    }
  }

  const ocupado = estado === 'enviando'

  if (confirmado === '1' || estado === 'listo' || estado === 'confirmar') {
    const pendiente = estado === 'confirmar' && confirmado !== '1'
    return (
      <div className="form form-listo" role="status" aria-live="polite">
        <div className="form-ojo">{pendiente ? 'Un paso más' : 'Listo'}</div>
        <h3 className="form-h3">{pendiente ? 'Revisá tu mail y confirmá.' : 'Listo. Te avisamos por mail cuando arranque la red.'}</h3>
        <p>
          {pendiente
            ? `Te mandamos un mail con un link. Con un toque quedás anotado y los ${PUNTOS_BIENVENIDA} puntos van a estar esperándote en la tarjeta.`
            : `Los ${PUNTOS_BIENVENIDA} puntos van a estar esperándote en la tarjeta. Si querés adelantarlo, mandale este link a tres personas con las que salís a comer.`}
        </p>
        <a href={WHATSAPP_COMPARTIR} target="_blank" rel="noopener" className="boton boton-whatsapp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z" />
          </svg>
          Compartir por WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={enviar}>
      {confirmado === '0' && (
        <p className="form-aviso" role="alert">
          Ese link ya venció o no es válido. Anotate de nuevo y te mandamos otro.
        </p>
      )}
      <label className="campo-l">
        <span>Tu mail</span>
        <input className="campo" name="email" type="email" inputMode="email" autoComplete="email" required placeholder="vos@mail.com" />
      </label>
      <label className="campo-l">
        <span>¿Por dónde salís a comer?</span>
        <select className="campo" name="barrio" required value={barrio} onChange={(e) => setBarrio(e.target.value)}>
          <option value="" disabled>
            Elegí la zona
          </option>
          {BARRIOS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
          <option value="Otro">Otro</option>
        </select>
      </label>
      {barrio === 'Otro' && (
        <label className="campo-l">
          <span>¿Cuál?</span>
          <input className="campo" name="barrioOtro" type="text" required placeholder="Ciudad de la Costa, Las Piedras…" />
        </label>
      )}
      <label className="campo-l">
        <span>Dos o tres lugares donde vas seguido</span>
        <input className="campo" name="lugares" type="text" placeholder="Café Rivera, La Pizzería de Brasil, Heladería…" />
      </label>
      <label className="campo-l">
        <span>
          Cómo te enteraste <em>(opcional)</em>
        </span>
        <select className="campo" name="origen" defaultValue="">
          <option value="">Elegí una opción</option>
          {ORIGENES.map(([v, t]) => (
            <option key={v} value={v}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="consent">
        <input type="checkbox" name="consentimiento" value="si" required />
        <span>
          Acepto que Vuelto use mis datos para avisarme cuando la tarjeta esté disponible y para armar la red de locales. Podés pedir que los borremos cuando quieras.{' '}
          <Link href="/privacidad">Política de privacidad</Link>.
        </span>
      </label>
      <input name="web" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="trampa" />

      <button type="submit" disabled={ocupado} className="boton boton-acento boton-grande">
        {ocupado ? 'Enviando…' : `Anotarme y reservar mis ${PUNTOS_BIENVENIDA} puntos`}
      </button>

      <p className="form-pie" role="status" aria-live="polite">
        {estado === 'correo' && (
          <>
            Se abrió tu correo con el mensaje armado. Si no se abrió, escribinos a <a href={`mailto:${MAIL_CONTACTO}`}>{MAIL_CONTACTO}</a>.
          </>
        )}
        {estado === 'error' && (
          <>
            No se pudo enviar. Probá de nuevo o escribinos a <a href={`mailto:${MAIL_CONTACTO}`}>{MAIL_CONTACTO}</a>.
          </>
        )}
        {(estado === 'quieto' || estado === 'enviando') && 'Un mail cada dos semanas, solo con novedades reales. Sin novedad, sin mail.'}
      </p>
    </form>
  )
}
