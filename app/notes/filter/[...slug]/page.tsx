import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes, TagType } from '@/lib/api';
import NotesClient from './Notes.client';

type NotesByTagsProps = {
  params: { slug?: string[] };
};

export default async function NotesByTags({ params }: NotesByTagsProps) {
  const queryClient = new QueryClient();
  const page = 1;
  const perPage = 12;

  const tag = params?.slug?.[0] === 'All' ? undefined : params?.slug?.[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', page, perPage, tag],
    queryFn: () => fetchNotes('', page, perPage, tag as TagType),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag as TagType} />
    </HydrationBoundary>
  );
}
