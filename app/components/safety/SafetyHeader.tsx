import { Card, CardContent } from "@/components/ui/card";
import { Info, Map, Layout, QrCode } from "lucide-react";

export function SafetyHeader() {
    return (
        <div className="space-y-6">
            {/* Top Banner Area - Core Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Model: Standard Basic Info */}
                <Card className="border-l-4 border-l-blue-500 shadow-sm bg-white">
                    <CardContent className="p-4 py-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <Info className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-blue-600 font-bold text-lg mb-1">EHS (环境、健康、安全)</h3>
                                <div className="space-y-1 text-sm text-slate-600">
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        核心理念: 0伤害、0事故、0环境污染
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        管理原则: 预防为主，全员参与，持续改进
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        业务范围: Process Safety, Occupational Health, Environment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Core Model: HOP Basic Info */}
                <Card className="border-l-4 border-l-blue-500 shadow-sm bg-white relative">
                    <div className="absolute top-4 right-4 bg-white p-1 rounded-md border shadow-sm">
                        <QrCode className="h-12 w-12 text-slate-800" />
                    </div>
                    <CardContent className="p-4 py-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <Map className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-blue-600 font-bold text-lg mb-1">HOP (人与组织绩效)</h3>
                                <div className="space-y-1 text-sm text-slate-600">
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        核心认知: 人非圣贤孰能无过，环境驱动行为
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        改进重点: 修复系统缺陷，而非责备个人
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        实施方法: 学习小组(Learning Team), 现场观察
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
