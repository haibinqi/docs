import * as React from "react"
import { Link, useLocation } from "@remix-run/react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MainNav() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          Haibin
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {/* Dashboard Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            "flex items-center gap-1 transition-colors hover:text-foreground/80 focus:outline-none",
            pathname === "/" || pathname.startsWith("/quality") ? "text-foreground" : "text-foreground/60"
          )}>
            仪表盘 <ChevronDown className="h-3 w-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <Link to="/dashboard">运营综合管理</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/quality/ehs-hop">质检 (EHS & HOP)</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          // to="/docs"
          to="https://starlight-53z.pages.dev/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/docs") ? "text-foreground" : "text-foreground/60"
          )}
        >
          我的文档
        </Link>
        <Link
          to="/tools/prompts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/tools") ? "text-foreground" : "text-foreground/60"
          )}
        >
          工具
        </Link>
        <Link
          to="/animations"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/animations") ? "text-foreground" : "text-foreground/60"
          )}
        >
          动画
        </Link>
        <Link
          to="/navigation"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/navigation") ? "text-foreground" : "text-foreground/60"
          )}
        >
          导航
        </Link>
        <Link
          to="/about"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/about") ? "text-foreground" : "text-foreground/60"
          )}
        >
          关于
        </Link>
      </nav>
    </div>
  )
}
