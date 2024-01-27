import type { Metadata } from 'next'
import Layout from '@/app/layout'
import Aside from '@/src/components/Aside'

export const metadata: Metadata = {
  title: 'MTG - Make a deck',
  description: 'Make your own Magic the Gathering deck using cards and info provided by magicthegathering.io'
}

export default function Home() {
  return (
    <Layout>
      <div>
        <Aside />
        <main className="p-5">
        
        </main>
      </div>
    </Layout>
  )
}
