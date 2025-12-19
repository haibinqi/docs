import { Outlet } from "@remix-run/react"
import { ToolsSidebar } from "@/components/tools-sidebar"

export default function ToolsLayout() {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-2 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-4 px-[5px] pt-[5px]">
      <ToolsSidebar />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  )
}
