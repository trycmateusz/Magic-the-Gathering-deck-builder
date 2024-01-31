import style from './AsideExpander.module.scss'

export function AsideExpander ({ 
  expanded,
  setExpanded
}: Readonly<{
  expanded: boolean
  setExpanded: (value: boolean) => void
}>) {
  if(expanded){
    return (
      <div className={style['aside__expander']}>
        <button onClick={() => setExpanded(false)} className={style['aside__expander-btn']}>
          Close
        </button>
      </div>
    )
  }
  else {
    return (
      <div className={style['aside__expander']}>
        <button onClick={() => setExpanded(true)} className={style['aside__expander-btn']}>
          Open filters
        </button>
      </div>
    )
  }
}