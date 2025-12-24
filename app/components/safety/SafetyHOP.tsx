import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Milestone, Workflow, MessageSquare } from "lucide-react";

export function SafetyHOP() {
    return (
        <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl border-b pb-2 border-slate-200">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                <h2>HOP 实操指引</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Col 1: Core Cognition */}
                <div className="space-y-4">
                    <h3 className="text-orange-500 font-bold flex items-center gap-2 text-sm uppercase">
                        <span className="p-1 border border-orange-200 rounded bg-orange-50">💡</span>
                        一、核心认知: 错误 vs 坏蛋
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Error Box */}
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 p-4">
                            <p className="font-bold text-orange-700 text-sm mb-2">🔴 误解 (传统观点)</p>
                            <ul className="text-orange-600 text-xs space-y-1 list-disc pl-4">
                                <li>事故是"坏苹果"造成的 (Blame culture)</li>
                                <li>惩罚可以减少错误</li>
                                <li>追求"零失误"</li>
                            </ul>
                        </div>
                        {/* Truth Box */}
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 p-4">
                            <p className="font-bold text-green-700 text-sm mb-2">🟢 真相 (HOP观点)</p>
                            <ul className="text-green-600 text-xs space-y-1 list-disc pl-4">
                                <li>错误是正常的生理属性 (Error is normal)</li>
                                <li>环境/系统 驱动行为</li>
                                <li><span className="font-bold">安全能力</span>: 即使犯错也不崩溃</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Col 2: Accident Analysis Flow */}
                <div className="space-y-4">
                    <h3 className="text-blue-600 font-bold flex items-center gap-2 text-sm uppercase">
                        <span className="p-1 border border-blue-200 rounded bg-blue-50">🔍</span>
                        二、事故分析四步法
                    </h3>
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                            <div className="text-xs font-bold text-slate-700">人员复述</div>
                            <p className="text-[10px] text-slate-500 max-w-[80px]">让我们听听当事人的视角</p>
                        </div>
                        <div className="h-[2px] w-8 bg-slate-200"></div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                            <div className="text-xs font-bold text-slate-700">发生背景</div>
                            <p className="text-[10px] text-slate-500 max-w-[80px]">当时的环境、压力、工具是什么?</p>
                        </div>
                        <div className="h-[2px] w-8 bg-slate-200"></div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">3</div>
                            <div className="text-xs font-bold text-slate-700">构建防线</div>
                            <p className="text-[10px] text-slate-500 max-w-[80px]">如何在未来"可以犯错"?</p>
                        </div>
                        <div className="h-[2px] w-8 bg-slate-200"></div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">4</div>
                            <div className="text-xs font-bold text-slate-700">修复PDCA</div>
                            <p className="text-[10px] text-slate-500 max-w-[80px]">修改系统，验证有效性</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: HOP Elements Matrix */}
            <div className="space-y-4">
                <h3 className="text-green-600 font-bold flex items-center gap-2 text-sm uppercase">
                    <span className="p-1 border border-green-200 rounded bg-green-50">🧩</span>
                    三、HOP防御体系要素
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {/* Element 1 */}
                    <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                        <Badge className="bg-green-500 text-white hover:bg-green-600 shrink-0">L1 行为 (Human)</Badge>
                        <div className="text-xs text-slate-600">
                            <p>关键操作必须双人确认 (Four Eyes Principle), 操作前各类核对/许可。</p>
                        </div>
                    </div>
                    {/* Element 2 */}
                    <div className="flex items-start gap-3 p-3 bg-yellow-50/50 rounded-lg border border-yellow-100">
                        <Badge className="bg-yellow-500 text-white hover:bg-yellow-600 shrink-0">L2 管理 (Admin)</Badge>
                        <div className="text-xs text-slate-600">
                            <p>操作规程 (SOP) 清晰可视化; 培训不是签到而是实操考核; 轮班交接记录。</p>
                        </div>
                    </div>
                    {/* Element 3 */}
                    <div className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                        <Badge className="bg-orange-500 text-white hover:bg-orange-600 shrink-0">L3 物理 (Physical)</Badge>
                        <div className="text-xs text-slate-600">
                            <p>物理隔离、连锁系统 (Interlock), 溢出围堰，声光报警装置。</p>
                        </div>
                    </div>
                    {/* Element 4 */}
                    <div className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border border-red-100">
                        <Badge className="bg-red-500 text-white hover:bg-red-600 shrink-0">L4 消除 (Inherent)</Badge>
                        <div className="text-xs text-slate-600">
                            <p>改变工艺路线取消高危化学品; 采用微通道反应器降低在线量。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
