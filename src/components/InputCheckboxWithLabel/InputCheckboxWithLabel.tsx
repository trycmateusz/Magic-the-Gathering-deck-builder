import { useState } from 'react'
import style from './InputCheckboxWithLabel.module.scss'
import type { FilterLabel } from '@/src/types/Filter'

export function InputCheckboxWithLabel ({
  label,
  filterLabel,
  name,
  checkIfCheckedOnInit,
  onChange,
}: Readonly<{
  label: string
  filterLabel?: FilterLabel,
  name: string
  checkIfCheckedOnInit: (value: string) => boolean
  onChange: (value: string, filterLabel?: FilterLabel) => void
}>) {
  const [checked, setChecked] = useState(checkIfCheckedOnInit(name))
  const handleOnChange = () => {
    onChange(name, filterLabel)
    setChecked(prev => !prev)
  }
  return (
    <div className={style['box']}>
      <input
        onChange={handleOnChange}
        className={`main-transition ${style['box__input']}`}
        type="checkbox"
        checked={checked}
        name={name}
        value={name}
        id={name} 
      />
      <label className={style['box__label']} htmlFor={name}>
        {label}
      </label>
      <span aria-hidden="true" onClick={handleOnChange} className={style['checkbox']} />
    </div>
  )
}