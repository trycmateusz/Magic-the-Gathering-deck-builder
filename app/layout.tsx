import { Navigation } from '@/src/components/Navigation/Navigation'
import './index.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper min-h-[100svh] border-main-black-lighter xl:border-l xl:border-r">
      <Navigation />
      {children}
    </div>
  )
}
