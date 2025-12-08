import { Outlet } from "@remix-run/react";
import { Sidebar } from "~/components/sidebar";

export default function DocsLayout() {
    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <Sidebar />
            <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                <div className="mx-auto w-full min-w-0">
                    <Outlet />
                </div>
                <div className="hidden text-sm xl:block">
                    <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-y-auto pt-4">
                        <p className="font-medium">On This Page</p>
                        <ul className="m-0 list-none">
                            <li className="mt-0 pt-2">
                                <a href="#" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">
                                    Top
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
