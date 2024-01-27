import style from './InputCheckboxWithLabel.module.scss'

export function InputCheckboxWithLabel ({
  label,
  name,
  onChange
}: Readonly<{
  label: string
  name: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}>) {
  return (
    <div className={style['box']}>
      <input
        onChange={onChange}
        className={`main-transition ${style['box__input']}`}
        type="checkbox"
        name={name}
        id={name} 
      />
      <label className={style['box__label']} htmlFor={name}>
        {label}
      </label>
    </div>
  )
}