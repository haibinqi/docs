import { Outlet, useLoaderData, useMatches, Link, useLocation } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getNotesByTag } from "~/lib/content-reader.server";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export async function loader() {
  const notesByTag = getNotesByTag();
  return json({ notesByTag });
}

export default function DocsLayout() {
  const { notesByTag } = useLoaderData<typeof loader>();
  const matches = useMatches();
  const location = useLocation();
  const lastMatch = matches[matches.length - 1];
  const toc: Array<{ id: string; text: string; level: number }> = (lastMatch?.data as any)?.toc ?? [];

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-[5px] pt-[5px] pb-6">
        <aside className="fixed top-[calc(3.5rem+5px)] z-30 -ml-2 hidden h-[calc(100vh-3.5rem-5px)] w-full shrink-0 md:sticky md:block">
          <div className="h-full pr-6">
            <div className="w-full">
               <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2">
                {notesByTag.map(({ tag, notes }) => (
                  <div key={tag}>
                    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                      {tag} <span className="text-muted-foreground font-normal">({notes.length})</span>
                    </h4>
                    <div className="grid grid-flow-row auto-rows-max text-sm">
                      {notes.map((note) => {
                        const href = `/docs/${encodeURIComponent(note.tag)}/${encodeURIComponent(note.slug)}`;
                        return (
                          <Link
                            key={note.filePath}
                            to={href}
                            className={cn(
                              "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                              location.pathname === href
                                ? "text-foreground font-medium"
                                : "text-muted-foreground"
                            )}
                            title={note.title}
                          >
                            {note.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </aside>

      <main className="relative min-w-0 mt-[5px]">
        <Outlet />
      </main>

      <aside className="fixed top-[calc(3.5rem+5px)] hidden h-[calc(100vh-3.5rem-5px)] w-60 shrink-0 overflow-y-auto border-l pl-6 pt-6 xl:block right-[max(0px,calc(50%-45rem))]">
        {toc.length > 0 && (
          <div className="pb-6">
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
  );
}
