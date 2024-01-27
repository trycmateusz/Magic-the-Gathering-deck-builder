import type { NavigationLink } from '@/types/Navigation'
import { useRouter } from 'next/router'
import style from './Navigation.module.scss'
import Link from 'next/link'
import BackgroundGlow from '@/src/components/BackgroundGlow'

export function Navigation () {
  const router = useRouter()
  const forCurrentRoute = (link: NavigationLink) => {
    return link.href === router.asPath
  }
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
            <BackgroundGlow conditionMet={forCurrentRoute(link)} />
          </li>
        ))}
      </ul>
    </nav>
  )
}