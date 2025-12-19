import * as React from "react"
import { Link, useLocation } from "@remix-run/react"
import { cn } from "@/lib/utils"

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
        <Link
          to="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/docs") ? "text-foreground" : "text-foreground/60"
          )}
        >
          文档
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
