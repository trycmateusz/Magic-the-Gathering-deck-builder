import style from './BackgroundGlow.module.scss'

export default function BackgroundGlow ({ 
  conditionMet
}: Readonly<{
  conditionMet: boolean;
}>) { 
  const renderElement = () => {
    if(conditionMet){
      return (
        <div className={style['background-glow']} />
      )
    }
  }
  return (
    renderElement()
  )  
}