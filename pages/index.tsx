import Head from 'next/head'
import Layout from '@/app/layout'
import { Aside } from '@/src/components/Aside/Aside'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>
          MTG - Make a deck
        </title>
        <meta property="description" content="Make your own Magic the Gathering decck using cards and info provided by magicthegathering.io" />
      </Head>
      <div>
        <Aside />
        <main className="p-5">

        </main>
      </div>
    </Layout>
  )
}
