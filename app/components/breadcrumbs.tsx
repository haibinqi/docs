import { useLocation } from "@remix-run/react";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Convert path segment to display title
    const getTitle = (value: string) => {
        const titleMap: Record<string, string> = {
            docs: "文档",
            notes: "记录",
            tags: "标签",
            tools: "工具",
        };
        return titleMap[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
    };

    return (
        <div className="mb-4 flex items-center text-sm text-muted-foreground">
            {pathnames.map((value, index) => {
                const title = getTitle(value);
                const isLast = index === pathnames.length - 1;

                return (
                    <div key={value + index} className="flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
                        <span className={isLast ? "font-medium text-foreground" : ""}>
                            {title}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
