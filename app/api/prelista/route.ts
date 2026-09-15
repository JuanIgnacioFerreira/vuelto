/* El alta en la prelista. Guarda mail, barrio, lugares, cómo se enteró y el
   UTM del anuncio que lo trajo.

   Tres caminos, según lo que haya configurado:
   - Con correo (RESEND_API_KEY + MAIL_REMITENTE): manda el mail de
     confirmación con un link firmado y responde `modo: 'confirmar'`. El
     registro llega al buzón como `pendiente`; cuando la persona hace clic,
     /api/prelista/confirmar lo manda de nuevo como `confirmado`.
   - Sin correo pero con buzón (PRELISTA_WEBHOOK_URL): el registro va directo,
     como `sin-confirmar`, y responde `modo: 'directo'`.
   - Sin nada: responde `modo: 'correo'` y el formulario abre el correo del
     visitante con el mensaje armado. Ninguna alta se pierde. */

import { correoConfirmacion } from '@/lib/correos'
import { alBuzon, enviarCorreo, esMail, firmar, hayCorreo, texto } from '@/lib/servidor'
import { URL_SITIO } from '@/lib/sitio'

export async function POST(req: Request) {
  let datos: Record<string, unknown>
  try {
    datos = (await req.json()) as Record<string, unknown>
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  if (texto(datos, 'web')) return Response.json({ ok: true, modo: 'directo' }) // el campo trampa: solo lo llena un bot

  const email = texto(datos, 'email', 200).toLowerCase()
  const barrio = texto(datos, 'barrio', 80) === 'Otro' ? texto(datos, 'barrioOtro', 80) || 'Otro' : texto(datos, 'barrio', 80)
  if (!esMail(email) || !barrio || texto(datos, 'consentimiento') !== 'si') return Response.json({ ok: false }, { status: 400 })

  const registro = {
    tipo: 'prelista',
    email,
    barrio,
    lugares: texto(datos, 'lugares', 400),
    origen: texto(datos, 'origen', 40),
    utm_source: texto(datos, 'utm_source', 120),
    utm_medium: texto(datos, 'utm_medium', 120),
    utm_campaign: texto(datos, 'utm_campaign', 120),
    utm_content: texto(datos, 'utm_content', 120),
    utm_term: texto(datos, 'utm_term', 120),
    titular: texto(datos, 'titular', 1),
    landing: texto(datos, 'landing', 300),
    consentimiento: new Date().toISOString(),
    fecha: new Date().toISOString(),
  }

  const buzon = process.env.PRELISTA_WEBHOOK_URL

  if (hayCorreo()) {
    const token = await firmar(registro)
    const link = `${URL_SITIO}/api/prelista/confirmar?t=${encodeURIComponent(token)}`
    const { asunto, html, texto: plano } = correoConfirmacion(link, barrio)
    const salio = await enviarCorreo(email, asunto, html, plano)
    if (salio) {
      await alBuzon(buzon, { ...registro, estado: 'pendiente' })
      return Response.json({ ok: true, modo: 'confirmar' })
    }
  }

  const llego = await alBuzon(buzon, { ...registro, estado: 'sin-confirmar' })
  return Response.json({ ok: true, modo: llego ? 'directo' : 'correo' })
}
