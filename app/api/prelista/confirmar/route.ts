/* El clic en el mail de confirmación. Verifica la firma del token, manda el
   registro al buzón como `confirmado`, envía el mail de bienvenida (con el
   link para compartir) y vuelve a la página con `?confirmado=1`, que muestra
   el aviso sobre el formulario. Con un token inválido o vencido vuelve con
   `?confirmado=0`. */

import { correoBienvenida } from '@/lib/correos'
import { alBuzon, enviarCorreo, verificar } from '@/lib/servidor'
import { URL_SITIO } from '@/lib/sitio'

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('t') ?? ''
  const registro = await verificar(token)
  if (!registro) return Response.redirect(`${URL_SITIO}/?confirmado=0#beta`, 302)

  const email = String(registro.email ?? '')
  const barrio = String(registro.barrio ?? '')
  await alBuzon(process.env.PRELISTA_WEBHOOK_URL, { ...registro, estado: 'confirmado', confirmado: new Date().toISOString() })
  const { asunto, html, texto } = correoBienvenida(barrio)
  await enviarCorreo(email, asunto, html, texto)
  return Response.redirect(`${URL_SITIO}/?confirmado=1#beta`, 302)
}
