import { Link, useLocation } from "@remix-run/react";
import { cn } from "@/lib/utils";

const toolsNavItems = [
    {
        title: "学习工具",
        items: [
            {
                title: "竖式计算生成器",
                href: "/tools/multiplication",
            },
        ],
    },
];

export function ToolsSidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <div className="h-full py-6 pr-6 lg:py-8">
                <div className="w-full">
                    {toolsNavItems.map((item, index) => (
                        <div key={index} className="pb-4">
                            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                                {item.title}
                            </h4>
                            {item.items?.length && (
                                <div className="grid grid-flow-row auto-rows-max text-sm">
                                    {item.items.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={subItem.href}
                                            className={cn(
                                                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                                                pathname === subItem.href
                                                    ? "text-foreground font-medium"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {subItem.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
