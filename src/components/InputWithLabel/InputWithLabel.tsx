import style from './InputWithLabel.module.scss'

export function InputWithLabel ({
  label,
  type,
  name,
  value,
  onBlur,
  onChange,
  onFocus,
  onMouseDown
}: Readonly<{
  label: string
  type: string
  name: string
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onMouseDown?: (e: Event) => void
}>) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange(value)
  }
  return (
    <div className={style['box']}>
      <label className={style['box__label']} htmlFor={name}>
        {label}
      </label>
      <input
        autoComplete="off"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleOnChange}
        onMouseDown={() => onMouseDown}
        className={`main-transition ${style['box__input']}`}
        type={type} 
        name={name}
        value={value}
        id={name} 
      />
    </div>
  )
}