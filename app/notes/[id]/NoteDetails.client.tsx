'use client';
import css from './NoteDetails.module.css';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';
import { useRouter } from 'next/router';

type Params = {
  id: string;
};



export default function NoteDetailsClient() {
   const params: Params = useParams();
   const router = useRouter();
const { id } = params;
  const {
    data: note,
    isPending,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id,
  });
  const handleGoBack = ()=>{
    const isSure = confirm('Are you sure?');
    if(isSure){
      router.back();
    }
  }
  return (
       <>
       <button onClick={handleGoBack}>Back</button>
      {isPending && <Loading />}
        {error && !isPending && <p>Something went wrong.</p>}
      {note && !isPending && !error && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
    </>
)}
