import { getTag } from "@/lib/api"
import Link from "next/link"

export default async function NotesSidebar(){
const categories = await getTag();
console.log(categories.notes, 'default')

    return (
        <ul>
            <li>
                <Link href={`/notes/filter/all`}>All Notes</Link>
            </li>
            {categories.notes.map((category)=>(
                <li key={category.id}>
                    <Link href={`notes/filter/${category.id}`}>{category.title}</Link>
                </li>
            ))}
        </ul>
    );
};
