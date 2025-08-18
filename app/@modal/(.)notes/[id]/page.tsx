import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
// import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import NotePreview from './NotePreview.client';
type NoteDetailsProps = {
  params: { id: string };
};

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <NoteDetailsClient /> */}
      <NotePreview/>
    </HydrationBoundary>
  );
};

export default NoteDetails;
