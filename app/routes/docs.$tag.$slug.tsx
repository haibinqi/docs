import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getNoteByPath } from "~/lib/content-reader.server";
import { ArrowLeft, List } from "lucide-react";
import { marked } from "marked";
import "github-markdown-css/github-markdown.css";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

// Consistent slugify function for both TOC and Renderer
function slugify(text: string): string {
    return text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
}

function extractToc(content: string): TocItem[] {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const toc: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = slugify(text);
        toc.push({ id, text, level });
    }

    return toc;
}

export async function loader({ params }: LoaderFunctionArgs) {
    const { tag, slug } = params;
    if (!tag || !slug) {
        throw new Response("Not Found", { status: 404 });
    }

    const note = getNoteByPath(decodeURIComponent(tag), decodeURIComponent(slug));
    if (!note) {
        throw new Response("Not Found", { status: 404 });
    }

    // Configure marked to add IDs to headings
    const renderer = new marked.Renderer();
    // @ts-ignore - Marked v12+ uses object argument
    renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
        const id = slugify(text.replace(/&[#\w]+;/g, '')); // simple unescape attempt
        return `<h${depth} id="${id}">${text}</h${depth}>`;
    };

    // Fix for marked Async: marked.parse is async by default in v12+? No, synchronous if no async extensions.
    // Explicitly handle as Promise or string depending on version. 
    // Types say: string | Promise<string>. We await it to be safe.
    marked.use({ renderer });

    // GFM is on by default.
    const htmlContent = await marked.parse(note.content);

    const toc = extractToc(note.content);

    return json({ note, toc, htmlContent });
}

export default function NoteDetailPage() {
    const { note, toc, htmlContent } = useLoaderData<typeof loader>();

    return (
        <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
                <Link
                    to="/docs"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    返回列表
                </Link>

                <div className="border-b pb-4 mb-8">
                    <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-muted px-2 py-1 rounded text-xs">{note.tag}</span>
                        <span>最后更新: {note.modifiedAt}</span>
                    </div>
                </div>

                <article
                    className="markdown-body"
                    style={{ fontSize: '13px', backgroundColor: 'transparent' }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>

            {/* TOC Sidebar */}
            {toc.length > 0 && (
                <aside className="hidden lg:block w-64 shrink-0 pl-8 border-l">
                    <div className="sticky top-20">
                        <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                            <List className="h-4 w-4" />
                            目录
                        </div>
                        <nav className="text-sm space-y-1.5">
                            {toc.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`} // Use ID from slugify
                                    className="block text-muted-foreground hover:text-foreground transition-colors truncate"
                                    style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                                >
                                    {item.text}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>
            )}
        </div>
    );
}
