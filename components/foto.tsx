import Image from 'next/image'

/* Una foto que llena su caja, con un parallax corto adentro (el motor mueve
   `[data-plx]`). Las fotos son textura y contexto: el texto nunca va encima. */
export function Foto({ src, alt, sizes = '(max-width: 980px) 92vw, 33vw', className = '', prioridad = false }: { src: string; alt: string; sizes?: string; className?: string; prioridad?: boolean }) {
  return (
    <div className={`foto ${className}`.trim()}>
      <div data-plx="14" className="foto-int">
        <Image src={src} alt={alt} fill sizes={sizes} priority={prioridad} style={{ objectFit: 'cover' }} />
      </div>
    </div>
  )
}
