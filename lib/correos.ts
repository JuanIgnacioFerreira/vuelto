/* Los dos correos de la prelista, en texto y en HTML. Sin plantillas ni
   imágenes: un mail corto que se lee en el celular. */

import { MAIL_CONTACTO, PUNTOS_BIENVENIDA, TEXTO_COMPARTIR, URL_SITIO, WHATSAPP_COMPARTIR } from '@/lib/sitio'

const envolver = (cuerpo: string) => `<!doctype html><html lang="es"><body style="margin:0;background:#FCFAF8;color:#1B1614;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55">
<div style="max-width:520px;margin:0 auto;padding:32px 22px">
<div style="font-weight:700;font-size:22px;letter-spacing:-.02em;margin-bottom:24px">vuelto<span style="color:#D93E1E">.</span></div>
${cuerpo}
<p style="margin:32px 0 0;font-size:13px;color:#6B625D">Vuelto · Montevideo, Uruguay · <a href="${URL_SITIO}/privacidad" style="color:#6B625D">Privacidad</a> · Si no querés recibir más mails o querés que borremos tus datos, respondé a este correo o escribí a <a href="mailto:${MAIL_CONTACTO}" style="color:#6B625D">${MAIL_CONTACTO}</a>.</p>
</div></body></html>`

const boton = (href: string, texto: string) =>
  `<p style="margin:24px 0"><a href="${href}" style="display:inline-block;background:#D93E1E;color:#FCFAF8;text-decoration:none;font-weight:600;padding:14px 24px;border-radius:999px">${texto}</a></p>`

export function correoConfirmacion(linkConfirmar: string, zona: string) {
  const asunto = `Confirmá tu lugar en Vuelto${zona ? ` · ${zona}` : ''}`
  const html = envolver(`
<h1 style="margin:0 0 12px;font-size:24px;line-height:1.15;letter-spacing:-.02em">Un toque más y quedás anotado.</h1>
<p style="margin:0">Confirmá que este mail es tuyo. Así sabemos que la gente que se anota es de verdad y los ${PUNTOS_BIENVENIDA} puntos te esperan a vos cuando arranque la red.</p>
${boton(linkConfirmar, 'Confirmar mi mail')}
<p style="margin:0;font-size:14px;color:#6B625D">Si no te anotaste en Vuelto, ignorá este mail y no pasa nada. El link vence en 14 días.</p>`)
  const texto = `Un toque más y quedás anotado.\n\nConfirmá que este mail es tuyo: ${linkConfirmar}\n\nAsí sabemos que la gente que se anota es de verdad y los ${PUNTOS_BIENVENIDA} puntos te esperan cuando arranque la red.\n\nSi no te anotaste en Vuelto, ignorá este mail. El link vence en 14 días.`
  return { asunto, html, texto }
}

export function correoBienvenida(zona: string) {
  const asunto = 'Listo: estás en la prelista de Vuelto'
  const html = envolver(`
<h1 style="margin:0 0 12px;font-size:24px;line-height:1.15;letter-spacing:-.02em">Listo. Estás anotado.</h1>
<p style="margin:0 0 12px">Estamos armando la red de locales, y arrancamos por donde más gente se anota${zona ? ` (anotamos que salís por ${zona})` : ''}. Cuando arranque te avisamos por acá, y los ${PUNTOS_BIENVENIDA} puntos van a estar esperándote en la tarjeta.</p>
<p style="margin:0 0 12px">Mientras, te escribimos solo cuando haya una novedad de verdad: los locales que se sumaron, cuándo sale la app. Sin novedad, sin mail.</p>
<p style="margin:0"><strong>¿Querés adelantarlo?</strong> Mandale este link a tres personas con las que salís a comer:</p>
${boton(WHATSAPP_COMPARTIR, 'Compartir por WhatsApp')}
<p style="margin:0;font-size:14px;color:#6B625D">O copiá el mensaje: «${TEXTO_COMPARTIR}»</p>`)
  const texto = `Listo. Estás anotado.\n\nEstamos armando la red de locales, y arrancamos por donde más gente se anota. Cuando arranque te avisamos por acá, y los ${PUNTOS_BIENVENIDA} puntos van a estar esperándote en la tarjeta.\n\nTe escribimos solo cuando haya una novedad de verdad. Sin novedad, sin mail.\n\n¿Querés adelantarlo? Mandale este mensaje a tres personas con las que salís a comer:\n${TEXTO_COMPARTIR}`
  return { asunto, html, texto }
}
