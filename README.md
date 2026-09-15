# Vuelto — la página web

La landing de Vuelto según el documento «La página web, todo junto» (10 de
setiembre de 2026), en la versión con app (la de Juan Ignacio y la reunión del
7/9): una tarjeta en la wallet del teléfono, sin formulario, con la que sumás
puntos por comprar en los locales adheridos y los canjeás por productos en el
local donde los sumaste; y **la app que desbloquea la red**: usar los puntos en
cualquier local, el mapa, qué hay cerca ahora, cuánto te falta en cada uno y
regalar un canje. La página vende eso y una sola cosa más: **anotarse en la
prelista** (mail, zona y dos o tres lugares) para decidir a qué comercios ir
primero. La app todavía no existe: se cuenta lo que va a hacer, nunca
«descargala».

Las versiones anteriores siguen en git: la **V1** (la landing para comercios
a partir del diseño de Claude Design) en la rama `main` y la etiqueta `v1`; la
**V2** (fotos como actores, palancas, precios) en los commits de la rama `v2`
hasta `6b38fb3`. Para volver a cualquiera: `git checkout <ref>`.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript ·
  GSAP + ScrollTrigger + Lenis para el hero de escritorio
- **Tipografías:** Familjen Grotesk (títulos), Figtree (texto), JetBrains Mono
  (números y etiquetas), Fredoka 700 solo para el logo, con `next/font`
- **Logo:** «vuelto.» en Fredoka, crema `#E8E2CA` con el punto celeste
  `#B9D4FF` sobre el verde `#4F5B2A` (el logo oficial desde el 15/9). Sobre
  fondos claros va como emblema con su verde detrás (`.logo`, `.app-logo`);
  el pie, la tarjeta de la wallet y los íconos (`public/icon.svg`,
  `app/favicon.ico`, `app/apple-icon.png`) lo llevan directo.
- **Paleta:** `#D93E1E` acento · `#1B1614` tinta · `#FCFAF8` fondo ·
  `#4F5B2A` secundario (el oliva que pidió Pablo el 15/9, un paso más verde
  que su referencia `#595629`) · `#F4F0EC` superficie (tokens en `globals.css`)

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run lint
```

## Las páginas

| Ruta | Qué es |
|---|---|
| `/` | La landing de usuario: barra, hero, cómo funciona, los puntos (comprás, sumás, canjeás, con una semana de movimientos de ejemplo), la app (lo que desbloquea la red, con el teléfono mostrando el mapa y qué hay cerca), lo que te llevás, por qué es distinto, la beta con el formulario, preguntas, pie |
| `/locales` | La página de comercios, corta y sin precios: hero, cómo funciona para el local, lo que te da la red, los cuatro números con fuente, cuánto cuesta, el formulario del local, preguntas |
| `/privacidad`, `/terminos` | Las diez líneas de términos y la política de privacidad, con la misma plantilla (`components/legal.tsx`) |
| `POST /api/prelista` | El alta en la prelista (ver «Formularios») |
| `GET /api/prelista/confirmar?t=` | El clic del mail de confirmación |
| `POST /api/locales` | El formulario del local |

## Estructura

```
app/
  layout.tsx          tipografías, metadata, Open Graph, preload del hero
  page.tsx            la landing de usuario
  locales/page.tsx    la página de comercios (con todo su copy adentro)
  privacidad/, terminos/
  api/                las tres rutas
  globals.css         tokens, piezas comunes, hero, bloques, formularios, celular
components/
  barra.tsx, pie.tsx  la barra fija y el pie con el logo grande
  hero.tsx            el hero: el texto una vez, dos visuales (escritorio/celular)
  telefono.tsx        el mock del teléfono con la tarjeta, gobernado por variables CSS
  telefono-app.tsx    el mock del teléfono con la app: mapa, cerca de vos, regalar un canje
  motor.tsx           (cliente) Lenis, el hero por scroll, reveals, barra, anclas, UTM
  secciones.tsx       los bloques de la landing de usuario
  formulario-prelista.tsx, formulario-local.tsx   (cliente)
  faq.tsx             el acordeón, recibe las preguntas
  mapa-barrio.tsx     el mapa simplificado con pines, sin nombres
  foto.tsx            una foto que llena su caja, con parallax corto
  marca.tsx           el logo «vuelto.» y los badges de wallet
  titular.tsx         (cliente) el titular A/B/C según la URL
  legal.tsx           la plantilla de las páginas de texto
lib/
  sitio.ts            URL, mail, textos de compartir, titulares, barrios, rubros
  utm.ts              (navegador) captura y lectura del UTM
  use-url.ts          (navegador) leer la query string sin efectos
  servidor.ts         buzón, correo (Resend por HTTP) y token firmado
  correos.ts          los dos mails de la prelista
public/img/           las fotos (hero, pasos, premios, «por qué es distinto», locales), el wallpaper y los íconos de wallet
```

## El hero

**Escritorio** (≥ 981 px): 480vh con un bloque `sticky` de 100vh. El motor lee
el progreso del scroll y escribe variables CSS sobre el bloque; todo lo demás
son `var(--x)` en los estilos. La secuencia, corregida para no prometer lo que
no existe (nada de «al pagar se acredita solo»):

| Scroll | Teléfono | Texto |
|---|---|---|
| 0 % | Pantalla de bloqueo, mostrador desenfocado | El titular |
| 20 % | La hoja «Agregar a Apple Wallet» con el toque | «Agregala una vez.» |
| 40 % | La tarjeta abierta; el haz del escaneo sobre el QR | «Sumá al pagar.» |
| 60 % | «+14 puntos» con un pulso; el contador 326 → 340 | «Y aparece solo.» |
| 80 % | 340 puntos · el americano son 140 · faltan 10 para la merienda · «Tenés 1.860 más en otros 5 locales. Con la app los usás en todos.» | «Siempre sabés cuánto te falta.» |
| 100 % | El aviso «Te alcanza para el americano en Café Rivera»; badges y botón | «Quiero la tarjeta» |

**Celular** (≤ 980 px): sin animación. El mismo texto y, debajo, tres cuadros
fijos que se deslizan con el dedo: la tarjeta en la wallet, el escaneo en la
caja, el aviso. El mismo componente `Telefono` con las variables ya puestas
(`fijo="wallet" | "escaneo" | "aviso"`).

Sin JS la página se ve entera (reveals visibles, acordeón abierto, el teléfono
con la tarjeta) gracias a `html[data-js="on"]`, que un script inline marca
antes del primer pintado. Todo respeta `prefers-reduced-motion`.

## Las fotos

Son las de las versiones anteriores (Higgsfield, `nano_banana_pro`; misma
dirección de arte: luz de tarde, madera y crema, un acento naranja, sin caras,
sin texto). Cada bloque lleva una: los tres pasos (la mano con el teléfono, el
barista en la caja, la mano que entrega el café), los puntos (dos personas con
sus cafés, con la tarjeta de movimientos encima), los premios (el latte a 140 y
la medialuna a 350), por qué es distinto (la tarjeta de cartón, el café de la
esquina, los teléfonos boca abajo) y el mostrador como textura de la beta. La
app va con su propio teléfono sobre el mapa. Todas por `components/foto.tsx`,
con un parallax de 14 px que mueve el motor. Lo que falta de otros rubros
(pizza, hamburguesa, helado) hay que generarlo con la misma dirección de arte.

## El titular del test

Tres titulares (`lib/sitio.ts`), uno por anuncio (la B pasó de «Una tarjeta
para todo el barrio» a «Una tarjeta para todos tus lugares»). La A se ve por defecto; B y
C entran con `?t=b` / `?t=c` o con `utm_content` que empiece con esa letra
(`utm_content=b-barrio`). El registro guarda cuál se vio (`titular`).

## Formularios

**La prelista** (`/api/prelista`) guarda mail, zona (campo `barrio`), lugares, cómo se
enteró, el consentimiento con fecha y el UTM del anuncio que lo trajo (se
captura al llegar y se guarda en `sessionStorage`, así sobrevive al paseo por
«Para locales»). Tres caminos, según lo configurado:

1. **Con correo** (`RESEND_API_KEY` + `MAIL_REMITENTE`): manda el mail de
   confirmación con un link firmado (HMAC del registro entero; no hace falta
   base de datos) y el registro llega al buzón como `pendiente`. Al hacer clic,
   `/api/prelista/confirmar` verifica la firma, lo manda como `confirmado`,
   envía el mail de bienvenida con el link para compartir y vuelve a
   `/?confirmado=1#beta`. El link vence a los 14 días.
2. **Con buzón pero sin correo** (`PRELISTA_WEBHOOK_URL`): el registro va
   directo, como `sin-confirmar`.
3. **Sin nada:** el formulario abre el correo del visitante con el mensaje
   armado. Ninguna alta se pierde.

El buzón es cualquier URL que acepte un POST con JSON: una hoja de Google vía
Apps Script, un Make, un Zap. Cada registro trae `tipo`, `estado`, los campos
y `utm_*`; la hoja de medición se arma sobre eso (costo por registro, registros
por barrio, lugares más nombrados, de qué anuncio vino cada uno).

**El local** (`/api/locales`): nombre, rubro, barrio, WhatsApp o mail, y qué
hace hoy. Va a `LOCALES_WEBHOOK_URL`; sin buzón, abre el correo.

Los dos tienen un campo trampa para bots. Ver `.env.example`.

## Decisiones que la página deja abiertas

- **Saldo único de red vs. canje por local + app.** Está implementada la
  segunda (decisión de Pablo del 15/9). Volver a la primera cambia el bloque
  «La app», el mock del hero (`tarjeta-red`), el ejemplo de movimientos y tres
  preguntas.
- **Sin «barrio por barrio».** Montevideo no se segmenta por barrio como
  Buenos Aires: la página habla de «la red» y de «la zona por donde salís a
  comer». El campo `barrio` del formulario sigue existiendo (con la lista de
  zonas) porque ordena a qué locales visitar primero.
- **Dominio y mail.** `vuelto.uy` es de otra empresa. La URL pública, el mail de
  contacto y el Instagram se leen de variables de entorno
  (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_MAIL_CONTACTO`, `NEXT_PUBLIC_INSTAGRAM_URL`);
  hay que definirlos en Vercel antes de encender los anuncios.
- **Badges oficiales.** Los chips «Apple Wallet» y «Google Wallet» usan los
  íconos que ya estaban en `public/img`; los badges completos hay que bajarlos
  de los kits de cada marca y ponerlos en `components/marca.tsx`.
- **Foto de Open Graph.** `public/og.jpg` sigue siendo la del mostrador.

## Publicación

Proyecto `vuelto` en Vercel (equipo `alammoits-projects`),
**https://vuelto-inky.vercel.app**. Se publica desde la carpeta con la CLI:

```bash
vercel deploy --prod
```

`.vercelignore` deja afuera `higgsfield-source/`, `public/media/` y las
capturas. Las variables del `.env.example` se cargan con `vercel env add`.
