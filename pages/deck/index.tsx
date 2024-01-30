import Layout from '@/app/layout'
import { useAppSelector } from '@/src/hooks/redux'
import { Aside } from '@/src/components/Aside/Aside'
import { CardList } from '@/src/components/CardList/CardList'

export default function Deck() {
  const deck = useAppSelector(state => state.card.deck)
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr]">
        <Aside fetchOnfilterChange={false} />
        <main className="p-5">
          <h1 className="text-3xl mb-5">
            My deck
          </h1>
          <CardList forAdding={false} cards={deck} />
        </main>
      </div>
    </Layout>
  )
}
