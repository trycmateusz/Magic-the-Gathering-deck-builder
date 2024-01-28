import type { NavigationLink } from '@/src/types/Navigation'
import Link from 'next/link'
import style from './Navigation.module.scss'
import { NavigationBackgroundGlow } from '@/src/components/NavigationBackgroundGlow/NavigationBackgroundGlow'

export function Navigation () {
  const links: NavigationLink[] = [
    {
      id: crypto.randomUUID(),
      text: 'Add cards',
      href: '/'
    },
    {
      id: crypto.randomUUID(),
      text: 'My deck',
      href: '/deck'
    }
  ] 
  return (
    <nav className={style['nav']}>
      <ul className={style['nav__list']}>
        {links.map((link) => (
          <li className={style['nav__list-item']} key={link.id}>
            <Link className={`main-transition ${style['nav__list-item-link']}`} href={link.href}>
              {link.text}
            </Link>
            <NavigationBackgroundGlow link={link} />
          </li>
        ))}
      </ul>
    </nav>
  )
}