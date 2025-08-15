// import NoteList from '@/components/NoteList/NoteList';
// import { getTag } from '@/lib/api';
// type Props = {
//   params: Promise<{ slug: string[] }>;
// };

// export default async function NotesByCategory({ params }: Props) {
//   const { slug } = await params;
//   const category = slug[0] === 'all' ? undefined : slug[0];
//   const response = await getTag(category);

//   return (
//     <div>
//       <h1>Note List</h1>
//       {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
//     </div>
//   );
// }

import NoteList from '@/components/NoteList/NoteList';
import { getTag } from '@/lib/api';
import type Note from '@/types/note';
import type { CategoriesHttpResp } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];

  let notesToDisplay: Note[] = [];

  try {
    const response: CategoriesHttpResp = await getTag(category);
    
    // Перевіряємо, чи отримали дані та чи є вони масивом
    if (response && Array.isArray(response.notes)) {
      notesToDisplay = response.notes;
    }
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return (
      <div>
        <h1>Note List</h1>
        <p>Something went wrong while fetching notes. Please try again later.</p>
      </div>
    );
  }

  if (notesToDisplay.length > 0) {
    return (
      <div>
        <h1>Note List</h1>
        <NoteList notes={notesToDisplay} />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Note List</h1>
        <p>No notes found for this category.</p>
      </div>
    );
  }
}

