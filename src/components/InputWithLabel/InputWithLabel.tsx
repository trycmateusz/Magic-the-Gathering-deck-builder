import style from './InputWithLabel.module.scss'

export function InputWithLabel ({
  label,
  type,
  name,
  onChange,
  value
}: Readonly<{
  label: string
  type: string
  name: string
  onChange: (value: string) => void
  value: string
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
        onChange={handleOnChange}
        className={`main-transition ${style['box__input']}`}
        type={type} 
        name={name}
        value={value}
        id={name} 
      />
    </div>
  )
}