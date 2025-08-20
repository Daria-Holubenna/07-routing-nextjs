import { fetchNotes, NoteHttpResp } from '@/lib/api';
import NotesClient from './Notes.client';
type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesByTags({ params }: Props) {
  const { slug } = await params;
  const page = 1;
  const search = '';
  const perPage = 12;

  const tag = slug?.[0] === 'All' ? undefined : slug?.[0];

  const initialData: NoteHttpResp = await fetchNotes(
    search,
    page,
    perPage,
    tag
  );
  return <NotesClient initialData={initialData} tag={tag} perPage={perPage} />;
}
