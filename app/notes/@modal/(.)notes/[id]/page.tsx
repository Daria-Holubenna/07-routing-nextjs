import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/NoteModal/NoteModal";

type Props = {
    params: Promise<{id: string}>
}
export default async function NotePreview({params}: Props){
    const {id} =  await params;
    const note = await fetchNoteById(id);
    return (
        <Modal close={()=>{!true}}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        </Modal>
    )
}