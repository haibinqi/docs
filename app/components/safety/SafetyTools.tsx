import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ClipboardCheck, Users, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SafetyTools() {
    return (
        <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl border-b pb-2 border-slate-200">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                <h2>评估工具速查</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* EHS Tools */}
                <Card className="border-t-4 border-t-blue-500 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800">EHS评估工具</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                                <div className="mt-1"><ClipboardCheck className="h-4 w-4 text-blue-500" /></div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                                        General Inspection <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1">通用检查表: 涵盖消防、电气、化学品</p>
                                </div>
                            </div>

                            <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                                <div className="mt-1"><AlertTriangle className="h-4 w-4 text-orange-500" /></div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                                        JSA (Job Safety Analysis) <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1">作业安全分析: 针对非常规作业的风险辨识</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t text-center">
                            <Button variant="link" className="text-blue-600 h-auto p-0 text-xs">查看所有EHS工具 &rarr;</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* HOP Tools */}
                <Card className="border-t-4 border-t-blue-500 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800">HOP评估工具</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                                <div className="mt-1"><BarChart3 className="h-4 w-4 text-indigo-500" /></div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                                        成熟度评估表 <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1">HOP Deployment Maturity Matrix: 评估组织文化现状</p>
                                </div>
                            </div>

                            <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                                <div className="mt-1"><MessageSquare className="h-4 w-4 text-green-500" /></div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                                        学习小组 (Learning Team) <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1">事故后复盘工具: 引导式提问清单</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t text-center">
                            <Button variant="link" className="text-blue-600 h-auto p-0 text-xs">查看所有HOP工具 &rarr;</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h4 className="font-bold text-sm mb-3">各阶段系统性要求</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div className="space-y-1">
                        <p className="font-bold text-slate-700">PSD阶段 (研发)</p>
                        <p className="text-slate-500">反应热数据, 工艺包完整性</p>
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-slate-700">Design阶段 (工程)</p>
                        <p className="text-slate-500">HAZOP/LOPA, 消防设施设计</p>
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-slate-700">Construction阶段 (建设)</p>
                        <p className="text-slate-500">JSA, 特种作业许可, 承包商管理</p>
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-slate-700">Commissioning阶段 (试车)</p>
                        <p className="text-slate-500">PSSR, 吹扫试压, 员工培训</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper icons
import { AlertTriangle, MessageSquare } from "lucide-react";
