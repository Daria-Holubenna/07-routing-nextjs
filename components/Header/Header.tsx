import css from './Header.module.css';
import Link from 'next/link';
import { getTag } from '@/lib/api';
import TagsMenu from '../TagsMenu/TagsMenu';

export default async function Header() {
  const categories = await getTag();
  // console.log(categories);
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
             {categories && categories.notes && (
              <TagsMenu categories={categories.notes} />
            )}
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
