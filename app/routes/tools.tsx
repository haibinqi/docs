import { Outlet } from "@remix-run/react";
import { Breadcrumbs } from "~/components/breadcrumbs";

export default function ToolsLayout() {
    return (
        <div className="max-w-[1200px] mx-auto px-4 py-6">
            <Breadcrumbs />
            <Outlet />
        </div>
    );
}
