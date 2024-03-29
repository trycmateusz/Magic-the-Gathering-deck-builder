/* eslint-disable @next/next/no-sync-scripts */
'use client'

import './index.css'
import Head from 'next/head'
import { Navigation } from '@/src/components/Navigation/Navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper min-h-[100svh] border-main-black-lighter xl:border-l xl:border-r">
      <Head>
        <script src="http://localhost:3000"></script>
      </Head>
      <Navigation />
      {children}
    </div>
  )
}
