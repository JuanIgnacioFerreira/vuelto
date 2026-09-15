'use client'

import { useState, type FormEvent } from 'react'
import { BARRIOS, MAIL_CONTACTO, RUBROS } from '@/lib/sitio'
import { leerUtm } from '@/lib/utm'

/* El formulario del local: nombre, rubro, zona, WhatsApp o mail, y qué hace
   hoy para que la gente vuelva. Va a /api/locales; sin buzón, abre el correo
   del visitante con el mensaje armado. */

type Estado = 'quieto' | 'enviando' | 'enviado' | 'correo' | 'error'

function correo(d: Record<string, string>) {
  const asunto = `Quiero que mi local esté en Vuelto · ${d.local}`
  const cuerpo = [`Local: ${d.local}`, `WhatsApp: ${d.whatsapp}`, `Rubro: ${d.rubro}`, `Zona: ${d.barrio === 'Otro' ? d.barrioOtro : d.barrio}`, `Contacto: ${d.contacto}`, '', d.hoy].join('\n')
  return `mailto:${MAIL_CONTACTO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
}

export function FormularioLocal() {
  const [estado, setEstado] = useState<Estado>('quieto')
  const [barrio, setBarrio] = useState('')

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const datos = Object.fromEntries(new FormData(form)) as Record<string, string>
    if (datos.web) return
    setEstado('enviando')
    try {
      const r = await fetch('/api/locales', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...datos, ...leerUtm() }) })
      const j = (await r.json()) as { ok: boolean; enviado: boolean }
      if (!r.ok || !j.ok) throw new Error('local')
      if (j.enviado) {
        form.reset()
        setBarrio('')
        setEstado('enviado')
        return
      }
      window.location.href = correo(datos)
      setEstado('correo')
    } catch {
      setEstado('error')
    }
  }

  const ocupado = estado === 'enviando'

  if (estado === 'enviado') {
    return (
      <div className="form form-listo" role="status" aria-live="polite">
        <div className="form-ojo">Recibido</div>
        <h3 className="form-h3">Te escribimos por WhatsApp en 48 horas para agendar la visita.</h3>
        <p>Llevamos el catálogo armado para tu rubro. Lo aprobás o lo ajustás ahí mismo.</p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={enviar}>
      <label className="campo-l">
        <span>Nombre del local</span>
        <input className="campo" name="local" type="text" autoComplete="organization" required placeholder="Café Rivera" />
      </label>
      <label className="campo-l">
        <span>WhatsApp</span>
        <input className="campo" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required placeholder="099 000 000" />
      </label>
      <div className="campos-2">
        <label className="campo-l">
          <span>Rubro</span>
          <select className="campo" name="rubro" required defaultValue="">
            <option value="" disabled>
              Elegí el rubro
            </option>
            {RUBROS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="campo-l">
          <span>Zona</span>
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
      </div>
      {barrio === 'Otro' && (
        <label className="campo-l">
          <span>¿Cuál?</span>
          <input className="campo" name="barrioOtro" type="text" required placeholder="Ciudad de la Costa, Las Piedras…" />
        </label>
      )}
      <label className="campo-l">
        <span>WhatsApp o mail</span>
        <input className="campo" name="contacto" type="text" inputMode="email" autoComplete="email" required placeholder="099 000 000 o vos@tulocal.uy" />
      </label>
      <label className="campo-l">
        <span>
          ¿Qué hacés hoy para que la gente vuelva? <em>(opcional)</em>
        </span>
        <textarea className="campo" name="hoy" rows={3} placeholder="Una tarjeta de cartón con sellos, descuentos por Instagram, nada todavía…" />
      </label>
      <input name="web" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="trampa" />

      <button type="submit" disabled={ocupado} className="boton boton-acento boton-grande">
        {ocupado ? 'Enviando…' : 'Quiero que mi local esté'}
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
        {(estado === 'quieto' || estado === 'enviando') && 'Te escribimos por WhatsApp en 48 horas para agendar la visita.'}
      </p>
    </form>
  )
}
