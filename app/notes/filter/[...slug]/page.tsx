import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes, TagType } from '@/lib/api';
import NotesClient from './Notes.client';

type AppPageProps<TParams extends Record<string, string | string[] | undefined>> = {
  params: TParams;
  searchParams?: { [key: string]: string | string[] | undefined };
};

const NotesByTags = async ({ params }: AppPageProps<{ slug?: string[] }>) => {
  const queryClient = new QueryClient();
  const page = 1;
  const perPage = 12;

  const tag =
    params?.slug?.[0] === 'all'
      ? undefined
      : (params?.slug?.[0] as TagType | undefined);

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
};

export default NotesByTags;
