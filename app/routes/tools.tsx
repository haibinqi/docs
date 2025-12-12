import { Outlet } from "@remix-run/react";

export default function ToolsLayout() {
    return (
        <div className="container mx-auto max-w-[960px] flex-1 py-6 lg:py-8">
            <main className="relative">
                <div className="mx-auto w-full min-w-0">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
