/* Lo que comparten las rutas de la API: el buzón (una URL que acepta un POST
   con JSON: una hoja de Google vía Apps Script, un Make, un Zap), el correo
   (Resend, por su API HTTP; sin SDK) y el token firmado de la doble
   confirmación. Solo lo importan las rutas de la API: nunca un componente. */

export const texto = (datos: Record<string, unknown>, k: string, max = 500) => String(datos[k] ?? '').trim().slice(0, max)

export const esMail = (m: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)

/* Reenvía un registro al buzón. Devuelve si llegó. */
export async function alBuzon(url: string | undefined, registro: Record<string, unknown>) {
  if (!url) return false
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(registro) })
    return r.ok
  } catch {
    return false
  }
}

/* Manda un correo con Resend. Devuelve si salió. Sin RESEND_API_KEY no manda
   nada y devuelve false: las rutas eligen el camino sin correo. */
export const hayCorreo = () => Boolean(process.env.RESEND_API_KEY && process.env.MAIL_REMITENTE)

export async function enviarCorreo(a: string, asunto: string, html: string, textoPlano: string) {
  if (!hayCorreo()) return false
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: process.env.MAIL_REMITENTE, to: [a], subject: asunto, html, text: textoPlano }),
    })
    return r.ok
  } catch {
    return false
  }
}

// ── el token de la confirmación: el registro entero, firmado ───────────────
// No hay base de datos: el link del mail lleva el registro codificado y su
// firma HMAC. Al hacer clic se verifica la firma y recién ahí se da por
// confirmado. Nadie puede fabricar un confirmado sin el secreto.

const secreto = () => process.env.PRELISTA_SECRET ?? process.env.RESEND_API_KEY ?? ''

const b64url = (bytes: ArrayBuffer | Uint8Array) =>
  Buffer.from(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)).toString('base64url')

async function hmac(mensaje: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secreto()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return b64url(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(mensaje)))
}

export async function firmar(registro: Record<string, unknown>) {
  const cuerpo = b64url(new TextEncoder().encode(JSON.stringify(registro)))
  return `${cuerpo}.${await hmac(cuerpo)}`
}

/* Devuelve el registro si la firma es válida y el token tiene menos de 14
   días; si no, null. */
export async function verificar(token: string): Promise<Record<string, unknown> | null> {
  const [cuerpo, firma] = token.split('.')
  if (!cuerpo || !firma || !secreto()) return null
  const esperada = await hmac(cuerpo)
  if (esperada.length !== firma.length) return null
  let iguales = 0
  for (let i = 0; i < esperada.length; i++) iguales |= esperada.charCodeAt(i) ^ firma.charCodeAt(i)
  if (iguales !== 0) return null
  try {
    const registro = JSON.parse(Buffer.from(cuerpo, 'base64url').toString('utf8')) as Record<string, unknown>
    const fecha = Date.parse(String(registro.fecha ?? ''))
    if (!fecha || Date.now() - fecha > 14 * 24 * 3600 * 1000) return null
    return registro
  } catch {
    return null
  }
}
