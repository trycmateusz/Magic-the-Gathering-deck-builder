'use client'

import { BackgroundGlow } from '@/src/components/BackgroundGlow/BackgroundGlow'
import type { NavigationLink } from '@/types/Navigation'
import { usePathname } from 'next/navigation'

export function NavigationBackgroundGlow ({ 
  link 
}: Readonly<{
  link: NavigationLink
}>) {
  const pathname = usePathname()
  const forCurrentRoute = (link: NavigationLink) => {
    if(pathname){
      return link.href === pathname
    }
    return false
  }
  return (
    <BackgroundGlow conditionMet={forCurrentRoute(link)} />
  )
}