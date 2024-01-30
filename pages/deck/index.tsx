'use client'

import Layout from '@/app/layout'
import Link from 'next/link'
import { Aside } from '@/src/components/Aside/Aside'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux'
import { CardList } from '@/src/components/CardList/CardList'
import { resetFilteredCards } from '@/redux/cardSlice'
import { redirect } from 'next/navigation'

export default function Deck() {
  function RenderCardList () {
    if(deck){
      if(deck.length > 0){
        return (
          <CardList forAdding={true} cards={deck} />
        )
      }
      else {
        return (
          <div>
            <span>
              It seems you haven't added any cards.
            </span>
            <span>
              Go on and <Link href="/">add some!</Link>
            </span>
          </div>
        )
      }
    }
    else {
      return (
        null
      )
    }
  }
  const dispatch = useAppDispatch()
  const deck = useAppSelector(state => state.card.deck)
  useEffect(() => {
    dispatch(resetFilteredCards())
  }, [])
  useEffect(() => { //sprawdzic server side reduxa bo sie da spradzic initial state
    if(!deck){
      redirect('/')
    }
  }, [])
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr]">
        <Aside />
        <main className="p-5">
        <h1 className="text-3xl mb-5">
          My deck
        </h1>
        <RenderCardList />
        </main>
      </div>
    </Layout>
  )
}
