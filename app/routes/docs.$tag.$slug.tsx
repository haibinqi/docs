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

// ... existing code ...

export default function NoteDetailPage() {
    const { note, htmlContent } = useLoaderData<typeof loader>();

    return (
        <div className="min-w-0">
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
    );
}

import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary">{error.status}</h1>
                <p className="text-xl text-muted-foreground">{error.statusText}</p>
                <Link to="/docs" className="text-sm text-primary hover:underline">返回文档列表</Link>
            </div>
        );
    }

    let errorMessage = "Unknown error";
    if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
            <h1 className="text-2xl font-bold text-destructive">Application Error</h1>
            <p className="text-muted-foreground max-w-lg mx-auto break-words bg-muted p-4 rounded text-left font-mono text-xs">
                {errorMessage}
            </p>
            <Link to="/docs" className="text-sm text-primary hover:underline">返回文档列表</Link>
        </div>
    );
}
