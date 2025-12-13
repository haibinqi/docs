import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getNotesByTag, type ContentNote } from "~/lib/content-reader.server";
import { Tag, FileText, FolderOpen } from "lucide-react";

export async function loader() {
    const notesByTag = getNotesByTag();
    return json({ notesByTag });
}

export default function DocsIndexPage() {
    const { notesByTag } = useLoaderData<typeof loader>();

    if (notesByTag.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-muted-foreground">
                <FileText className="h-16 w-16 mb-4 opacity-20" />
                <p>暂无笔记</p>
                <p className="text-sm mt-2">在 <code className="bg-muted px-2 py-1 rounded">content/</code> 目录创建 md 文件</p>
            </div>
        );
    }

    return (
        <div className="mt-4 text-[13px]">
            <div className="flex items-center justify-between mb-2">
            </div>

            <div className="space-y-8">
                {notesByTag.map(({ tag, notes }) => (
                    <div key={tag} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/50 px-4 py-3 flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{tag}</span>
                            <span className="text-muted-foreground">({notes.length})</span>
                        </div>
                        <div className="divide-y">
                            {notes.map((note) => (
                                <Link
                                    key={note.filePath}
                                    to={`/docs/${encodeURIComponent(note.tag)}/${encodeURIComponent(note.slug)}`}
                                    className="px-4 py-3 hover:bg-muted/30 transition-colors flex items-center justify-between block"
                                >
                                    <h3 className="font-medium">{note.title}</h3>
                                    <span className="text-muted-foreground">{note.modifiedAt}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
