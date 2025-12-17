import { Outlet, useLoaderData, useMatches, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getNotesByTag } from "~/lib/content-reader.server";
import { FolderOpen } from "lucide-react";

export async function loader() {
  const notesByTag = getNotesByTag();
  return json({ notesByTag });
}

export default function DocsLayout() {
  const { notesByTag } = useLoaderData<typeof loader>();
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];
  const toc: Array<{ id: string; text: string; level: number }> = (lastMatch?.data as any)?.toc ?? [];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="grid grid-cols-[240px,1fr,260px] gap-8">
        <aside className="hidden md:block">
          <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            笔记列表
          </div>
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-160px)] pr-2">
            {notesByTag.map(({ tag, notes }) => (
              <div key={tag}>
                <div className="text-[12px] font-semibold mb-2">{tag} <span className="text-muted-foreground">({notes.length})</span></div>
                <div className="space-y-1">
                  {notes.map((note) => (
                    <Link
                      key={note.filePath}
                      to={`/docs/${encodeURIComponent(note.tag)}/${encodeURIComponent(note.slug)}`}
                      className="block text-sm text-foreground/80 hover:text-foreground truncate"
                      title={note.title}
                    >
                      {note.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>

        <aside className="hidden lg:block">
          {toc.length > 0 && (
            <div className="sticky top-20 border-l pl-6">
              <div className="text-sm font-semibold mb-3">目录</div>
              <nav className="text-sm space-y-1.5">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-muted-foreground hover:text-foreground transition-colors truncate"
                    style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
