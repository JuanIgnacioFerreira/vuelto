import Image from 'next/image'

/* La marca: «vuelto.» en minúscula con el punto en el acento. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`.trim()}>
      vuelto<span className="logo-punto">.</span>
    </span>
  )
}

/* Los dos badges de wallet. Usan los íconos oficiales que ya están en
   public/img; los archivos del badge completo («Add to Apple Wallet» /
   «Add to Google Wallet») hay que bajarlos de los kits de cada marca y
   usarlos según sus reglas —no dibujarlos—: cuando estén, van acá. */
export function Badges({ oscuro = false }: { oscuro?: boolean }) {
  return (
    <div className={`badges ${oscuro ? 'badges-oscuro' : ''}`.trim()}>
      <span className="badge">
        <Image src="/img/apple-wallet.svg" alt="" width={26} height={20} unoptimized />
        <span>Apple Wallet</span>
      </span>
      <span className="badge">
        <Image src="/img/google-wallet.svg" alt="" width={22} height={20} unoptimized />
        <span>Google Wallet</span>
      </span>
    </div>
  )
}
