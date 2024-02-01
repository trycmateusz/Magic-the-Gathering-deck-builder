import Image from 'next/image'
import style from './AverageMana.module.scss'
import manaWheel from '@/public/mana-wheel.svg'
export function AverageMana({ 
  mana,
  labeledById
}: Readonly<{
  mana: number
  labeledById: string
}>) {
  return (
    <div className={style['general-mana']}>
      <Image
        src={manaWheel}
        priority={true}
        width="195"
        height="185"
        alt="A pentagon shape wheel consisting of all Magic the Gathering different manas." 
      />
      <span aria-labelledby={labeledById} className={style['general-mana__counter']}>
        {mana}
      </span>
    </div>
  )
}