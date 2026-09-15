'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { capturarUtm } from '@/lib/utm'

/* El motor. Lenis suaviza el scroll; ScrollTrigger ata el hero de escritorio
   al tramo de página que ocupa. Además: los reveals al entrar, la barra que se
   compacta, las anclas con scroll suave y la captura del UTM. No pinta nada:
   escribe variables CSS y clases sobre lo que el servidor ya renderizó. */

gsap.registerPlugin(ScrollTrigger)

// ── el hero: la secuencia nueva, seis tiempos ─────────────────────────────
//   0 %  bloqueo, mostrador desenfocado           → el titular
//  20 %  el sticker; la hoja «Agregar a Apple Wallet» → «Agregala una vez.»
//  40 %  la tarjeta abierta; el local la escanea  → «Sumá al pagar.»
//  60 %  «+14 puntos» con un pulso                → «Y aparece solo.»
//  80 %  «340 puntos · el americano son 140»      → «Siempre sabés cuánto te falta.»
// 100 %  el aviso; badges y botón                 → «Anotarme a la beta»

const CAMARA: [number, number, number][] = [
  [0, 0.5, 1], [0.14, 0.72, 1.32], [0.3, 0.72, 1.32], [0.38, 0.46, 1.22], [0.54, 0.46, 1.22],
  [0.58, 0.44, 1.55], [0.7, 0.44, 1.55], [0.76, 0.5, 1.18], [0.86, 0.5, 1.18], [0.92, 0.22, 1.36], [1, 0.5, 1.04],
]
const suave = (x: number) => x * x * (3 - 2 * x)
const rebote = (x: number) => {
  const c = 1.35
  const y = x - 1
  return 1 + (c + 1) * y * y * y + c * y * y
}

function pintarHero(stage: HTMLElement, tel: HTMLElement, p: number, escalaBase: number) {
  const R = (a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)))
  const set = (n: string, v: number | string) => stage.style.setProperty(n, String(v))
  set('--p', p)
  // fondos
  set('--bg1', 1 - suave(R(0.16, 0.28)))
  set('--bg2', suave(R(0.18, 0.3)) - suave(R(0.46, 0.56)))
  set('--bg3', suave(R(0.48, 0.58)) - suave(R(0.72, 0.82)))
  set('--bg4', suave(R(0.74, 0.84)))
  // textos
  set('--t0', 1 - suave(R(0.05, 0.14)))
  set('--t1', suave(R(0.1, 0.18)) - suave(R(0.3, 0.36)))
  set('--t2', suave(R(0.34, 0.42)) - suave(R(0.5, 0.56)))
  set('--t3', suave(R(0.54, 0.62)) - suave(R(0.68, 0.74)))
  set('--t4', suave(R(0.72, 0.8)) - suave(R(0.84, 0.9)))
  set('--t5', suave(R(0.88, 0.96)))
  // el teléfono
  set('--sheet', rebote(R(0.13, 0.22)) - suave(R(0.27, 0.33)))
  set('--tap', R(0.2, 0.27))
  set('--tapO', Math.max(0, (1 - R(0.22, 0.3)) * R(0.19, 0.21)))
  set('--lock', 1 - suave(R(0.3, 0.38)))
  set('--wal', suave(R(0.3, 0.38)))
  set('--card', rebote(R(0.33, 0.45)))
  set('--scan', R(0.4, 0.52))
  set('--scanO', suave(R(0.38, 0.42)) - suave(R(0.52, 0.56)))
  const suma = R(0.56, 0.63)
  set('--suma', rebote(suma))
  set('--sumaO', suave(R(0.56, 0.6)) - suave(R(0.68, 0.73)))
  set('--pulse', R(0.57, 0.72))
  set('--pulseO', Math.max(0, (1 - R(0.6, 0.74)) * R(0.56, 0.59)))
  set('--falta', suave(R(0.74, 0.8)) - suave(R(0.88, 0.92)))
  set('--listo', suave(R(0.9, 0.96)))
  set('--notif', rebote(R(0.88, 0.96)))
  set('--notifO', suave(R(0.88, 0.94)))
  set('--glow', suave(R(0.58, 0.66)) * (1 - R(0.9, 1)) * 0.9)
  // cámara
  let ka = CAMARA[0]
  let kb = CAMARA[CAMARA.length - 1]
  for (let i = 0; i < CAMARA.length - 1; i++) {
    if (p >= CAMARA[i][0] && p <= CAMARA[i + 1][0]) {
      ka = CAMARA[i]
      kb = CAMARA[i + 1]
      break
    }
  }
  const ku = suave(Math.min(1, Math.max(0, (p - ka[0]) / Math.max(0.0001, kb[0] - ka[0]))))
  const zTy = ka[1] + (kb[1] - ka[1]) * ku
  set('--zoom', ka[2] + (kb[2] - ka[2]) * ku)
  set('--zdy', (0.5 - zTy) * 612)
  set('--ry', -10 * (1 - suave(R(0, 0.36))))
  set('--rx', 4 * (1 - suave(R(0, 0.36))))
  set('--s', escalaBase)
  // al final, los botones que se ven son los del último tiempo
  stage.classList.toggle('hero-final', p > 0.9)
  // el contador de puntos: 326 → 340 cuando entran los 14
  const total = 326 + Math.round(14 * suave(suma))
  const puntos = tel.querySelector<HTMLElement>('[data-puntos]')
  if (puntos) puntos.textContent = String(total)
  const faltan = tel.querySelector<HTMLElement>('[data-faltan]')
  if (faltan) faltan.textContent = String(420 - total)
}

export function Motor() {
  useEffect(() => {
    capturarUtm()

    const root = document.querySelector<HTMLElement>('[data-root]')
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const limpiezas: (() => void)[] = []
    const q = <T extends Element = HTMLElement>(s: string, base: ParentNode = root) => base.querySelector<T>(s)
    const qa = <T extends Element = HTMLElement>(s: string, base: ParentNode = root) => [...base.querySelectorAll<T>(s)]

    // ── scroll suavizado (solo con rueda; el táctil queda nativo) ─────────
    let lenis: Lenis | undefined
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (t: number) => lenis?.raf(t * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      limpiezas.push(() => {
        gsap.ticker.remove(tick)
        lenis?.destroy()
      })
    }
    ScrollTrigger.config({ ignoreMobileResize: true })
    const MARGEN = 84
    const irA = (destino: Element) => {
      if (lenis) lenis.scrollTo(destino as HTMLElement, { offset: -MARGEN })
      else window.scrollTo({ top: destino.getBoundingClientRect().top + window.scrollY - MARGEN, behavior: 'auto' })
    }

    // ── anclas ────────────────────────────────────────────────────────────
    qa('[data-goto]').forEach((b) => {
      const ir = (e: Event) => {
        const destino = b.dataset.goto ? root.querySelector(b.dataset.goto) : null
        if (!destino) return
        e.preventDefault()
        irA(destino)
      }
      b.addEventListener('click', ir)
      limpiezas.push(() => b.removeEventListener('click', ir))
    })
    // si la URL ya trae un ancla (p. ej. al volver de la confirmación), ir ahí
    if (window.location.hash) {
      const destino = root.querySelector(window.location.hash)
      if (destino) setTimeout(() => irA(destino), 60)
    }

    // ── reveals ───────────────────────────────────────────────────────────
    const reveals = qa('[data-rv]')
    if (reduce) reveals.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }))

    const ctx = gsap.context(() => {
      if (!reduce) {
        reveals.forEach((el) => {
          gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: Number(el.dataset.rvD || 0) / 1000, scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
        })
        // un parallax corto en las fotos: la imagen se mueve unos píxeles dentro de su caja
        qa('[data-plx]').forEach((el) => {
          const d = Number(el.dataset.plx) || 14
          gsap.fromTo(el, { y: d, scale: 1.1 }, { y: -d, scale: 1.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
        })
      }

      // ── la barra se compacta al bajar ─────────────────────────────────
      const headbar = q('[data-headbar]')
      let compacta: boolean | undefined
      const chrome = () => {
        if (!headbar) return
        const quiere = window.scrollY > 80
        if (quiere !== compacta) {
          compacta = quiere
          headbar.classList.toggle('compacta', quiere)
        }
      }
      gsap.ticker.add(chrome)
      limpiezas.push(() => gsap.ticker.remove(chrome))

      // ── el botón fijo del celular ─────────────────────────────────────
      // Aparece cuando el hero quedó arriba y se esconde cuando el formulario
      // de la beta está a la vista: así nunca tapa lo que hay que completar.
      const hero0 = q('#hero')
      const beta0 = q('#beta')
      const cta = q('#cta-fija')
      if (hero0 && beta0 && cta && 'IntersectionObserver' in window) {
        let pasoHero = false
        let betaVisible = false
        const pintar = () => {
          const ver = pasoHero && !betaVisible
          cta.classList.toggle('visible', ver)
          cta.setAttribute('aria-hidden', ver ? 'false' : 'true')
        }
        const oHero = new IntersectionObserver(
          ([e]) => {
            pasoHero = !e.isIntersecting && e.boundingClientRect.top < 0
            pintar()
          },
          { threshold: 0 },
        )
        const oBeta = new IntersectionObserver(
          ([e]) => {
            betaVisible = e.isIntersecting
            pintar()
          },
          { threshold: 0.15 },
        )
        oHero.observe(hero0)
        oBeta.observe(beta0)
        limpiezas.push(() => {
          oHero.disconnect()
          oBeta.disconnect()
        })
      }

      // ── el hero, ligado al scroll (solo escritorio) ───────────────────
      const scrub = reduce ? false : 0.35
      const mm = gsap.matchMedia()
      mm.add('(min-width: 981px)', () => {
        const hero = q('#hero')
        const stage = q('[data-stage]')
        const tel = q('.hero-telefono', stage ?? root)
        if (!hero || !stage || !tel) return
        let escalaBase = 0.7
        const medir = () => {
          const celda = q('[data-phone-cell]', stage)
          let cw = window.innerWidth * 0.44
          let ch = window.innerHeight * 0.74
          if (celda) {
            const r = celda.getBoundingClientRect()
            if (r.width > 20 && r.height > 20) {
              cw = r.width
              ch = r.height
            }
          }
          escalaBase = Math.min(1, (ch * 0.92) / 612, (cw * 0.84) / 300)
        }
        medir()
        pintarHero(stage, tel, 0, escalaBase)
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: () => '+=' + Math.max(1, hero.offsetHeight - window.innerHeight),
          scrub,
          onRefresh: medir,
          onUpdate: (self) => pintarHero(stage, tel, self.progress, escalaBase),
        })
        document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
      })
      limpiezas.push(() => mm.revert())
    }, root)

    // los reveals que no llegaron a verse, igual se ven
    const red = setTimeout(() => reveals.forEach((el) => { if (getComputedStyle(el).opacity === '0' && el.getBoundingClientRect().top < window.innerHeight) gsap.set(el, { autoAlpha: 1, y: 0 }) }), 6000)
    limpiezas.push(() => clearTimeout(red))

    return () => {
      ctx.revert()
      limpiezas.forEach((f) => f())
    }
  }, [])

  return null
}
