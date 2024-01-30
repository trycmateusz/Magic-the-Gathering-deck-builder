import Head from 'next/head'
import Layout from '@/app/layout'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux'
import { Aside } from '@/src/components/Aside/Aside'
import { CardList } from '@/src/components/CardList/CardList'
import { resetFilteredCards } from '@/redux/cardSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  const cardsFiltered = useAppSelector(state => state.card.cardsFiltered)
  useEffect(() => {
    dispatch(resetFilteredCards())
  }, [])
  function RenderCardList () {
    if(cardsFiltered){
      if(cardsFiltered.length > 0){
        return (
          <CardList forAdding={true} cards={cardsFiltered} />
        )
      }
      else {
        return (
          <span>
            No cards found. Try changing filters.
          </span>
        )

      }
    }
    else {
      return (
        <span>
          Get started by selecting some of the filters on the side.
        </span>
      )
    }
  }
  return (
    <Layout>
      <Head>
        <title>
          MTG - Make a deck
        </title>
        <meta property="description" content="Make your own Magic the Gathering decck using cards and info provided by magicthegathering.io" />
      </Head>
      <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr]">
        <Aside />
        <main className="p-5">
          <h1 className="text-3xl mb-5">
            Add new cards
          </h1>
          <RenderCardList />
        </main>
      </div>
    </Layout>
  )
}
