import type { Metadata } from 'next'
import { Legal } from '@/components/legal'
import { MAIL_CONTACTO } from '@/lib/sitio'

export const metadata: Metadata = {
  title: 'Privacidad · Vuelto',
  description: 'Qué datos pide Vuelto, para qué los usa y cómo pedir que los borre.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false },
}

const PUNTOS: [string, string][] = [
  ['Qué datos pedimos.', 'Para la tarjeta, ninguno. Para la prelista, tu mail, la zona por donde salís a comer y, si querés contarlo, los lugares donde vas seguido y cómo te enteraste de Vuelto. Cuando la tarjeta esté andando, el uso que hagas de ella (dónde sumaste, qué canjeaste) para operar el programa.'],
  ['Para qué los usamos.', 'Para avisarte cuando la tarjeta esté disponible, para decidir con qué locales arrancamos, y para operar el programa de puntos. Nada más.'],
  ['Qué mails vas a recibir.', 'Uno para confirmar que el mail es tuyo, uno de bienvenida, y después uno cada dos semanas como máximo, solo con novedades reales: los locales que se sumaron, cuándo sale la app. Sin novedad, sin mail.'],
  ['Qué ven los locales.', 'Datos agregados: cuántas personas de la red los visitan, cuánto suman y canjean, en qué otros rubros consume su gente. Nunca tu nombre, tu mail ni tu historial individual.'],
  ['A quién no se los damos.', 'No vendemos ni cedemos datos individuales a nadie. Los proveedores que usamos para guardar los registros y mandar los mails los tratan por cuenta de Vuelto, solo para eso.'],
  ['Cuánto tiempo los guardamos.', 'Los de la prelista, hasta que la tarjeta arranque y te la demos, o hasta que pidas que los borremos. Los de uso de la tarjeta, mientras tengas puntos vigentes y hasta doce meses después.'],
  ['Tus derechos.', `Podés pedir acceso, corrección o borrado de tus datos cuando quieras, escribiendo a ${MAIL_CONTACTO} o respondiendo cualquier mail que te mandemos. Lo resolvemos en el día.`],
  ['El marco legal.', 'Vuelto trata los datos según la Ley 18.331 de Protección de Datos Personales de Uruguay y su reglamentación. La base de datos se inscribe en la Unidad Reguladora y de Control de Datos Personales (URCDP) antes del lanzamiento.'],
  ['Cambios.', 'Si esta política cambia, te avisamos por mail antes de que rija. Lo que ya nos diste sigue bajo las reglas con las que lo diste.'],
]

export default function Privacidad() {
  return <Legal ojo="Privacidad" titulo="Qué datos pedimos y qué hacemos con ellos." bajada="Nueve puntos, en el mismo idioma que el resto de la página." puntos={PUNTOS} fecha="15 de setiembre de 2026" />
}
