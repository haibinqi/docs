import { ReactNode } from "react";

interface SafetyLayoutProps {
    children: ReactNode;
}

export function SafetyLayout({ children }: SafetyLayoutProps) {
    return (
        <div className="min-h-screen bg-[#F5F7FA] font-sans text-slate-800 p-4 md:p-8">
            <div className="max-w-[1400px] mx-auto space-y-6">
                {children}
            </div>
        </div>
    );
}
