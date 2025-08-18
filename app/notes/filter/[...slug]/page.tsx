// import { fetchNotes } from '../../../../lib/api';
// import { NoteHttpResp } from '../../../../lib/api';
// import NotesClient from './Notes.client';

// type NotesByTagsProps ={
//   params: Promise<{slug?: string[]}>;
// }

// const NotesByTags = async ({ params }: NotesByTagsProps) => {
//   const { slug } = await params;
//   const category = slug?.[0] === 'All' ? undefined : slug?.[0];
// const page = 1;
// const search = '';
// const perPage = 12;
//   const initialData: NoteHttpResp = await fetchNotes({
//    search,
//   page,
//   perPage,
//   category,
//   });

//   return (<NotesClient initialData={initialData} category={category}/>);
// };

// export default NotesByTags;


import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import { NoteHttpResp } from '../../../../lib/api';
import NotesClient from './Notes.client';

type NotesByTagsProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesByTags({ params }: NotesByTagsProps){
  const { slug } = await params;

  const page = 1;
  const search = '';
  const perPage = 12;
  
  const tag = slug?.[0] === 'All' ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  const initialData: NoteHttpResp = await queryClient.fetchQuery({
    queryKey: ['notes', search, page, perPage, tag],
    queryFn: () => fetchNotes(search, page, perPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={initialData} tag={tag} />
    </HydrationBoundary>
  );
};