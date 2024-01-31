'use client'

import type { Card } from '@/src/types/Card'
import Image from 'next/image'
import { ManaSymbolEnum, ManaSymbol } from '@/src/types/Mana'
import style from './CardList.module.scss'
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux'
import { addCardToDeck } from '@/redux/cardSlice'

export function CardList ({
  cards,
  forAdding
}: Readonly<{
  cards: Card[]
  forAdding: boolean
}>) {
  function ManaCost ({ 
    manaCost 
  }: Readonly<{
    manaCost?: string
  }>) {
    function ManaCostElement ({ 
      mana 
    }: Readonly<{
      mana: ManaSymbol | string
    }>) {
      if(mana in ManaSymbolEnum){
        return (
          <Image src={`/mana-${mana}-mini.svg`} alt="" width="25" height="25" />
        )
      }
      else {
        return (
          <span>
            {mana}
          </span>
        )
      }
    }
    if(manaCost){
      const manaCostArray: (ManaSymbolEnum | string)[] = manaCost?.substring(1, manaCost.length - 1).split('}{')
      return (
        <div className={style['card-list-item__header-mana']}>
          {manaCostArray.map((mana, index) => (
            <ManaCostElement key={index} mana={mana} />
          ))}
        </div>
      )
    }
    else {
      return (
        null
      )
    }
  }
  function CardListItemAdd ({ 
    card,
    disabled
  }: Readonly<{
    card: Card
    disabled: boolean
  }>) {
    if(forAdding){
      return (
        <button onClick={() => dispatch(addCardToDeck(card))} disabled={disabled} className={cardListItemFooterAddClassname}>
          +
        </button>
      )
    }
    else {
      return (
        null
      )
    }
  }
  const dispatch = useAppDispatch()
  const deck = useAppSelector(state => state.card.deck)
  const convertName = (name: string) => {
    return name.split(' // ')[0]
  }
  const cardListItemFooterAddClassname = (() => {
    return `${style['card-list-item__footer-add']} main-transition`
  })()
  if(cards.length > 0){
    return (
      <ul className={style['card-list']}>
        {cards.map(card => (
          <li data-in-deck-when-adding={forAdding && !!deck?.find(item => item.id === card.id)} key={card.id} className={style['card-list-item']}>
            <div className={style['card-list-item__header']}>
              <span>
                {convertName(card.name)}
              </span>
              <ManaCost manaCost={card.manaCost} />
            </div>
            <span className={style['card-list-item__type']}>
              {card.type}
            </span>
            <p className={style['card-list-item__info']}>
              {card.text}
            </p>
            <div className={style['card-list-item__footer']}>
              <span className="text-mana-gray">
                {card.types?.includes('Land') ? 'Land' : `${card.cmc} CMC`}
              </span>
              <CardListItemAdd disabled={deck ? (deck.length >= 30 || deck.includes(card)) : false} card={card} />
            </div>
          </li>
        ))}
      </ul>
    )
  }
  else {
    return (
      null
    )
  }
}