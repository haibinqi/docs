import { Outlet } from "@remix-run/react";

export default function DocsLayout() {
    return (
        <div className="max-w-[960px] mx-auto px-4 py-6">
            <Outlet />
        </div>
    );
}
