'use client';

import { useState } from 'react';
import Link from 'next/link';
import Note from '@/types/note';
import css from './TagsMenu.module.css';

type Props = {
  categories: Note[];
};

export default function CategoriesMenu({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.menuContsiner}>

      <button className={css.menuButton} onClick={toggle}>Notes </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li>
            <Link href={`/notes/filter/all`} onClick={toggle}>
              All notes
            </Link>
          </li>
          {categories.map((category) => (
            <li className={css.menuItem} key={category.id}>
              <Link className={css.menuLink} href={`/notes/filter/${category.id}`} onClick={toggle}>
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      )}


    </div>
  );
}
