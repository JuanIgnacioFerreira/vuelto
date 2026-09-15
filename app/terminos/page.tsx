import type { Metadata } from 'next'
import { Legal } from '@/components/legal'
import { MAIL_CONTACTO } from '@/lib/sitio'

export const metadata: Metadata = {
  title: 'Términos · Vuelto',
  description: 'Las reglas de los puntos de Vuelto, en diez líneas.',
  alternates: { canonical: '/terminos' },
  robots: { index: false },
}

const PUNTOS: [string, string][] = [
  ['Qué son los puntos.', 'Unidades de recompensa sin valor monetario. No se cambian por dinero, no se venden y no se transfieren entre usuarios.'],
  ['Cómo se suman.', 'Por compras en locales adheridos, según la tasa de cada local, con una acreditación por local por día.'],
  ['Cómo se canjean.', 'Por los productos del catálogo de cada local, sujetos a los topes de canje que cada local publica.'],
  ['Cuándo vencen.', 'A los doce meses de sumados. Se usan primero los más viejos, y te avisamos antes de que venzan.'],
  ['Regalar sí, transferir no.', 'Podés regalar un canje: usás tus puntos y otra persona se lleva el premio. No podés pasarle puntos a nadie.'],
  ['Si un local deja la red.', 'Sigue aceptando canjes de sus propios puntos durante 60 días.'],
  ['Quién responde.', `Vuelto es el responsable ante vos por los puntos emitidos y publicados. Si un local no te acepta un canje que la tarjeta muestra, escribinos a ${MAIL_CONTACTO} y lo resolvemos ese día.`],
  ['Si cambian las reglas.', 'Los cambios rigen hacia adelante; los puntos ya sumados conservan las reglas con las que nacieron.'],
  ['Datos.', 'Mail y zona para la beta; comportamiento de uso de la tarjeta para operar el programa. A los comercios, solo datos agregados. Base inscripta en la URCDP; derecho a acceso y borrado por mail. Más en la política de privacidad.'],
  ['Lo que vale.', 'Los locales adheridos, sus catálogos y sus topes se muestran en la tarjeta y en el sitio. Nada que no esté ahí es una promesa.'],
]

export default function Terminos() {
  return <Legal ojo="Términos" titulo="Las reglas de los puntos, en diez líneas." bajada="Sin letra chica: esto es todo." puntos={PUNTOS} fecha="15 de setiembre de 2026" />
}
