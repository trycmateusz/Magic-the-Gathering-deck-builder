import Head from 'next/head'
import Layout from '@/app/layout'
import { useAppSelector } from '@/src/hooks/redux'
import { Aside } from '@/src/components/Aside/Aside'
import { CardList } from '@/src/components/CardList/CardList'

export default function Home() {
  const cards = useAppSelector(state => state.card.cards)
  return (
    <Layout>
      <Head>
        <title>
          MTG - Make a deck
        </title>
        <meta property="description" content="Make your own Magic the Gathering decck using cards and info provided by magicthegathering.io" />
      </Head>
      <div className="grid grid-cols-2">
        <Aside />
        <main className="p-5">
        <h1 className="text-3xl mb-5">
          Add new cards
        </h1>
          <CardList cards={cards} />
        </main>
      </div>
    </Layout>
  )
}
