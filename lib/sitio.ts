/* Lo que la página necesita saber de sí misma y que no está en el código de
   ningún bloque: dónde vive, adónde escribirle, qué dice cuando se comparte.
   Todo lo que depende de una decisión pendiente (dominio, mail, Instagram) se
   lee de variables de entorno, con un valor por defecto que no promete nada. */

// El dominio no está decidido (vuelto.uy es de otra empresa). Hasta entonces
// la URL pública es la de Vercel.
export const URL_SITIO = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vuelto-inky.vercel.app').replace(/\/$/, '')

// El mail de contacto. Sin dominio propio todavía, hay que definirlo en Vercel
// (`NEXT_PUBLIC_MAIL_CONTACTO`): a este buzón cae el fallback de los formularios.
export const MAIL_CONTACTO = process.env.NEXT_PUBLIC_MAIL_CONTACTO ?? 'hola@vuelto.co'

// El Instagram se muestra solo si está configurado.
export const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM_URL

export const PUNTOS_BIENVENIDA = 200

// El link que se comparte por WhatsApp después de anotarse, con su UTM para
// medir cuánto trae el boca a boca.
export const LINK_COMPARTIR = `${URL_SITIO}/?utm_source=whatsapp&utm_medium=referido&utm_campaign=prelista`
export const TEXTO_COMPARTIR = `Me anoté en Vuelto, la tarjeta que te devuelve puntos por salir a comer. Anotate vos también: ${LINK_COMPARTIR}`
export const WHATSAPP_COMPARTIR = `https://wa.me/?text=${encodeURIComponent(TEXTO_COMPARTIR)}`

// Los tres titulares del test. La A es la de Juan Ignacio y la que se ve por
// defecto; B y C entran con `?t=b` / `?t=c` o con `utm_content=b|c` en el
// link del anuncio.
export const TITULARES = {
  a: 'Salís a comer igual. Que te vuelva algo.',
  b: 'Una tarjeta para todos tus lugares.',
  c: 'El café de la esquina no está en ninguna promo del banco. Acá sí.',
} as const
export type Titular = keyof typeof TITULARES

// Las zonas de Montevideo para la lista «¿Por dónde salís a comer?». «Otro»
// abre un campo de texto. El dato ordena a qué locales visitar primero.
export const BARRIOS = [
  'Aguada', 'Aires Puros', 'Atahualpa', 'Barrio Sur', 'Bella Vista', 'Belvedere', 'Brazo Oriental', 'Buceo',
  'Capurro', 'Carrasco', 'Carrasco Norte', 'Casavalle', 'Centro', 'Cerrito', 'Cerro', 'Ciudad Vieja', 'Colón',
  'Cordón', 'Flor de Maroñas', 'Goes', 'Ituzaingó', 'Jacinto Vera', 'Jardines del Hipódromo', 'La Blanqueada',
  'La Comercial', 'La Figurita', 'La Teja', 'Larrañaga', 'Las Acacias', 'Lezica', 'Malvín', 'Malvín Norte',
  'Manga', 'Maroñas', 'Mercado Modelo', 'Nuevo París', 'Palermo', 'Parque Batlle', 'Parque Rodó',
  'Paso de la Arena', 'Paso de las Duranas', 'Paso Molino', 'Peñarol', 'Piedras Blancas', 'Pocitos', 'Prado',
  'Punta Carretas', 'Punta Gorda', 'Punta de Rieles', 'Reducto', 'Sayago', 'Tres Cruces', 'Tres Ombúes', 'Unión',
  'Villa Española', 'Villa García', 'Villa Muñoz',
] as const

export const RUBROS = ['Cafetería', 'Hamburguesería', 'Pizzería', 'Heladería', 'Restaurante', 'Bar', 'Panadería', 'Otro'] as const

export const ORIGENES = [
  ['instagram', 'Instagram'],
  ['amigo', 'Un amigo'],
  ['local', 'En un local'],
  ['otro', 'Otro'],
] as const
