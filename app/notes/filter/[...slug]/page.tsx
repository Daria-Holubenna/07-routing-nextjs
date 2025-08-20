import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes, TagType, tagTypeArr } from '@/lib/api';
import NotesClient from './Notes.client';

interface PageProps {
  params: {
    slug?: string[];
  };
}


function isTagType(tag: string | undefined): tag is TagType {
  if (!tag) {
    return false;
  }
  return tagTypeArr.slice(1).some(validTag => validTag === tag);
}

const NotesByTags = async ({ params }: PageProps) => {
  const queryClient = new QueryClient();
  const page = 1;
  const perPage = 12;

  const urlTag = params?.slug?.[0];

  const tag = isTagType(urlTag) ? urlTag : undefined;

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', page, perPage, tag],
    queryFn: () => fetchNotes(
      '',
      page,
      perPage,
      tag
    ),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByTags;
