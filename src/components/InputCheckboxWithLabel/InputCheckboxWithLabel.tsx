import { useState, useEffect, useRef } from 'react'
import style from './InputCheckboxWithLabel.module.scss'
import type { FilterLabel } from '@/src/types/Filter'

export function InputCheckboxWithLabel ({
  label,
  filterLabel,
  name,
  wasReset,
  checkIfChecked,
  onChange,
}: Readonly<{
  label: string
  filterLabel?: FilterLabel,
  name: string
  wasReset: boolean[]
  checkIfChecked: (value: string) => boolean
  onChange: (value: string, filterLabel?: FilterLabel) => void
}>) {
  const [checked, setChecked] = useState(checkIfChecked(name))
  const hasInitiallyRendered = useRef(false)
  const handleOnChange = () => {
    onChange(name, filterLabel)
    setChecked(prev => !prev)
  }
  useEffect(() => {
    if(hasInitiallyRendered.current) {
      setChecked(() => false)
    }
    hasInitiallyRendered.current = true
  }, [wasReset])
  return (
    <div className={style['box']}>
      <input
        onChange={handleOnChange}
        className={`main-transition ${style['box__input']}`}
        type="checkbox"
        checked={checked}
        name={filterLabel}
        value={name}
        id={name} 
      />
      <label className={style['box__label']} htmlFor={name}>
        {label}
      </label>
      <span tabIndex={0} aria-hidden="true" onClick={handleOnChange} className={style['checkbox']} />
    </div>
  )
}