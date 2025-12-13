import { Outlet } from "@remix-run/react";
import { Breadcrumbs } from "~/components/breadcrumbs";

export default function ToolsLayout() {
    return (
        <div className="max-w-[960px] mx-auto px-4 py-6">
            <Breadcrumbs />
            <Outlet />
        </div>
    );
}
