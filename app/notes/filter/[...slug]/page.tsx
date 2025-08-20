import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes, TagType } from '@/lib/api';
import NotesClient from './Notes.client';

interface Props {
  params: {
    slug?: string[];
  };
}

const NotesByTags = async ({ params }: Props) => {
  const {slug} = await params;
  const page = 1;
  const perPage = 12;

  const tag =
    params?.slug?.[0] === 'all'
      ? undefined
      : (params?.slug?.[0] as TagType | undefined);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', page, perPage, tag],
    queryFn: () => fetchNotes('', page, perPage, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByTags;
