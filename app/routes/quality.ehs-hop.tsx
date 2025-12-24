import { SafetyLayout } from "@/components/safety/SafetyLayout";
import { SafetyHeader } from "@/components/safety/SafetyHeader";
import { SafetyEHS } from "@/components/safety/SafetyEHS";
import { SafetyHOP } from "@/components/safety/SafetyHOP";
import { SafetyTools } from "@/components/safety/SafetyTools";
import { SafetyFAQ } from "@/components/safety/SafetyFAQ";
import { Link } from "@remix-run/react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SafetyDashboardRoute() {
    return (
        <SafetyLayout>


            <SafetyHeader />
            <SafetyEHS />
            <SafetyHOP />
            <SafetyTools />
            <SafetyFAQ />

            {/* Footer / Quick Access */}
            <div className="grid grid-cols-4 gap-4 mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="space-y-2">
                    <h4 className="text-blue-600 font-bold flex items-center gap-1"><span className="text-lg">⚲</span> 联动快速查询卡</h4>
                    <div className="text-xs text-slate-500 space-y-1">
                        <p>物料MSDS查询</p>
                        <p>事故案例库</p>
                        <p>法规标准数据库</p>
                    </div>
                </div>
                <div className="space-y-2 pt-8">
                    <div className="text-xs text-slate-500 space-y-1">
                        <p>应急预案在线</p>
                        <p>承包商资质查询</p>
                    </div>
                </div>
                <div className="space-y-2 pt-8">
                    <div className="text-xs text-slate-500 space-y-1">
                        <p>HOP学习视频库</p>
                        <p>EHS培训矩阵</p>
                    </div>
                </div>
                <div className="space-y-2 pt-8">
                    <div className="text-xs text-slate-500 space-y-1">
                        <p>PPE选型指南</p>
                        <p>特种作业许可</p>
                    </div>
                </div>
            </div>
        </SafetyLayout>
    );
}
