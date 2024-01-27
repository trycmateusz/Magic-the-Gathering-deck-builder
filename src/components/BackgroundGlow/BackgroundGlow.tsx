'use client'

import style from './BackgroundGlow.module.scss'

export function BackgroundGlow ({ 
  conditionMet
}: Readonly<{
  conditionMet: boolean;
}>) {
  const className = (() => {
    if(conditionMet){
      return `${style['background-glow']}`
    }
    else {
      return `${style['background-glow--hidden']}`
    }
  })()
  return (
    <div className={className} />
  ) 
}