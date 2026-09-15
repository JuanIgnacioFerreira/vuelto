import { Barra } from '@/components/barra'
import { Hero } from '@/components/hero'
import { Motor } from '@/components/motor'
import { Pie } from '@/components/pie'
import { Beta, Cierre, ComoFunciona, CtaFija, Distinto, LaApp, Premios, Preguntas } from '@/components/secciones'

/* La landing de usuario. Vende una tarjeta en la wallet del teléfono, sin
   formulario, con la que sumás puntos por comprar en los locales de la red y
   los canjeás por productos; y la app que desbloquea la red entera. El
   objetivo es la prelista (mail, zona, lugares). El comercio entra por
   «¿Tenés un local?». */

export default function Page() {
  return (
    <div data-root="" className="raiz">
      <Barra inicio />
      <Hero />
      <Distinto />
      <Beta />
      <ComoFunciona />
      <Premios />
      <LaApp />
      <Preguntas />
      <Cierre />
      <Pie />
      <CtaFija />
      <Motor />
    </div>
  )
}
