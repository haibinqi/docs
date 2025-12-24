import { ProcessModule } from "./ProcessModule";
import { AuthorityModule } from "./AuthorityModule";
import { SystemHealthModule } from "./SystemHealthModule";
import { OpsModule } from "./OpsModule";
import { RiskModule } from "./RiskModule";
import { DataModule } from "./DataModule";
import { DemandModule } from "./DemandModule";
import { KnowledgeModule } from "./KnowledgeModule";

export function DashboardLayout() {
    return (
        <div className="flex flex-col flex-1 bg-[#F5F7FA] dark:bg-slate-950 font-sans text-slate-800">
            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900/50">


                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Row 1: Process (2), Authority (1), Health (1) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[400px]">
                        <ProcessModule />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[400px]">
                        <AuthorityModule />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[400px]">
                        <SystemHealthModule />
                    </div>

                    {/* Row 2: Ops (1), Risk (1), Data (2) */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[350px]">
                        <OpsModule />
                    </div>
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[350px]">
                        <RiskModule />
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[350px]">
                        <DataModule />
                    </div>

                    {/* Row 3: Demand (2), Knowledge (2) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[350px]">
                        <DemandModule />
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[350px]">
                        <KnowledgeModule />
                    </div>
                </div>
            </main>
        </div>
    );
}
