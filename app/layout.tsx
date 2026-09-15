import type { Metadata, Viewport } from 'next'
import { Familjen_Grotesk, Figtree, Fredoka, JetBrains_Mono } from 'next/font/google'
import { URL_SITIO } from '@/lib/sitio'
import './globals.css'

const display = Familjen_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

/* La del logo: Fredoka en negrita, solo para la marca. */
const logo = Fredoka({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-logo',
  display: 'swap',
})

const TITULO = 'Vuelto · Salís a comer igual. Que te vuelva algo.'
const BAJADA =
  'Sumás puntos por lo que comprás en los cafés, pizzerías y heladerías de la red y los canjeás por lo que ellos ponen: un americano, unas papas, una porción. ' +
  'La tarjeta vive en la wallet de tu teléfono; con la app, tus puntos sirven en toda la red.'

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: { default: TITULO, template: '%s' },
  description: BAJADA,
  applicationName: 'Vuelto',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    siteName: 'Vuelto',
    title: TITULO,
    description: BAJADA,
    url: '/',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'El mostrador de un café al atardecer, con el teléfono sobre la barra' }],
  },
  twitter: { card: 'summary_large_image', title: TITULO, description: BAJADA, images: ['/og.jpg'] },
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#FCFAF8',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

// Marca el documento antes del primer pintado: sin JS la página se ve entera
// (los reveals visibles, el teléfono con la tarjeta), con JS entran las animaciones.
const MARCA_JS = 'document.documentElement.dataset.js="on"'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${logo.variable}`}
      suppressHydrationWarning /* el script de arriba escribe data-js antes de hidratar */
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MARCA_JS }} />
        {/* La primera foto del hero de escritorio es un `background-image`: el
            navegador la descubriría tarde. En celular no se usa. */}
        <link rel="preload" as="image" href="/img/hero-1-mostrador.jpg" fetchPriority="high" media="(min-width: 981px)" />
      </head>
      <body>{children}</body>
    </html>
  )
}
