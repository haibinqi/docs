import { Link, useLocation } from "@remix-run/react"
import { cn } from "@/lib/utils"
import { Calculator, FileText, GanttChartSquare, Sparkles } from "lucide-react"

const tools = [
  {
    title: "Prompt Library",
    href: "/tools/prompts",
    icon: Sparkles,
  },
  {
    title: "Math Generator",
    href: "/tools/math",
    icon: Calculator,
  },
]

export function ToolsSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <aside className="fixed top-[calc(3.5rem+5px)] z-30 -ml-2 hidden h-[calc(100vh-3.5rem-5px)] w-full shrink-0 md:sticky md:block">
      <div className="h-full pr-6">
        <div className="w-full">
          <div className="pb-4">
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {tools.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                    pathname === item.href || pathname.startsWith(item.href)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
