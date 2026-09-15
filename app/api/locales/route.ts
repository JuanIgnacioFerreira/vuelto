/* El formulario de la página de locales. Va al buzón (LOCALES_WEBHOOK_URL);
   sin buzón, o si falla, responde `enviado: false` y el formulario abre el
   correo del visitante con el mensaje armado. */

import { alBuzon, texto } from '@/lib/servidor'

export async function POST(req: Request) {
  let datos: Record<string, unknown>
  try {
    datos = (await req.json()) as Record<string, unknown>
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  if (texto(datos, 'web')) return Response.json({ ok: true, enviado: true })

  const registro = {
    tipo: 'local',
    local: texto(datos, 'local', 120),
    whatsapp: texto(datos, 'whatsapp', 40),
    rubro: texto(datos, 'rubro', 40),
    barrio: texto(datos, 'barrio', 80) === 'Otro' ? texto(datos, 'barrioOtro', 80) || 'Otro' : texto(datos, 'barrio', 80),
    contacto: texto(datos, 'contacto', 200),
    hoy: texto(datos, 'hoy', 1000),
    utm_source: texto(datos, 'utm_source', 120),
    utm_medium: texto(datos, 'utm_medium', 120),
    utm_campaign: texto(datos, 'utm_campaign', 120),
    fecha: new Date().toISOString(),
  }
  if (!registro.local || !registro.contacto || !registro.barrio) return Response.json({ ok: false }, { status: 400 })

  const llego = await alBuzon(process.env.LOCALES_WEBHOOK_URL, registro)
  return Response.json({ ok: true, enviado: llego })
}
