import Image from 'next/image'
import style from './CardCounter.module.scss'
import { BackgroundGlow } from '@/src/components/BackgroundGlow/BackgroundGlow'

export function CardCounter () {
  const cardsLength = 22
  const maxCards = 30
  const minCards = 20
  const hasMinimumAmountOfCards = () => {
    return cardsLength >= minCards
  }
  const cardCounterMinTextClassname = (() => {
    if(hasMinimumAmountOfCards()){
      return `${style['card-counter__min-text']} ${style['card-counter__min-text--active']}`
    }
    else {
      return `${style['card-counter__min-text']}`
    }
  })()
  return (
    <div className={style['card-counter']}>
      <div className={style['card-counter__count']}>
        <span>
          {cardsLength}
        </span>
        <Image 
          src="/text-breaker.svg" 
          alt="" 
          width="4" 
          height="10" 
        />
        <span>
          {maxCards}
        </span>
        <Image
          className={style['card-counter__image']}
          src="/cards.svg" 
          alt="" 
          width="30" 
          height="30" 
        />
      </div>
      <div className={style['card-counter__min']}>
        <span className={cardCounterMinTextClassname}>
          min. {minCards}
        </span>
        <BackgroundGlow conditionMet={hasMinimumAmountOfCards()} />
      </div>
    </div>
  )
}