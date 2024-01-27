import style from './InputWithLabel.module.scss'

export function InputWithLabel ({
  label,
  type,
  name,
  onChange
}: Readonly<{
  label: string
  type: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}>) {
  return (
    <div className={style['box']}>
      <label className={style['box__label']} htmlFor={name}>
        {label}
      </label>
      <input
        onChange={onChange}
        className={`main-transition ${style['box__input']}`}
        type={type} 
        name={name}
        id={name} 
      />
    </div>
  )
}