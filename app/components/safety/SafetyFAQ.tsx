import { HelpCircle } from "lucide-react";

export function SafetyFAQ() {
    return (
        <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl border-b pb-2 border-slate-200">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">?</span>
                <h2>常见问题 (FAQ)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* EHS FAQ */}
                <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold">
                        <HelpCircle className="h-5 w-5" />
                        <h3>EHS常见问题</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs font-bold text-slate-800 mb-1">Q1: 为什么要做本质安全，成本太高?</p>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                A1: 本质安全 (Inherently Safer Design) 可以在项目早期通过改变工艺路线彻底消除风险。虽然初期研发成本高，但相比后期增加大量的保护层(LOPA)和事故处理成本，全生命周期成本(TCO)是最低的。
                            </p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs font-bold text-slate-800 mb-1">Q2: 变更管理(MOC) 流程太繁琐?</p>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                A2: 历史上70%的工艺事故都与未经评估的变更有关 (如Flixborough事故)。MOC不是为了阻碍变更，而是识别变更带来的新风险 (New Risks)。
                            </p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs font-bold text-slate-800 mb-1">Q3: 承包商管不好，该怎么办?</p>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                A3: 建立严格的准入机制 (Pre-qualification) 和黑名单制度; 实施属地化管理，将承包商纳入本厂班组统一管理和培训。
                            </p>
                        </div>
                    </div>
                </div>

                {/* HOP FAQ */}
                <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold">
                        <HelpCircle className="h-5 w-5" />
                        <h3>HOP常见问题</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs font-bold text-slate-800 mb-1">Q1: 既然环境决定行为，那员工就没责任了?</p>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                A1: HOP不否认个人责任，但强调系统责任优先。如果一个老员工在正常情况下犯错，大概率是系统诱导的 (Error-Precursors)。
                            </p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs font-bold text-slate-800 mb-1">Q2: 学习小组(Learning Team) 和事故调查的区别?</p>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                A2: 传统调查侧重"What happened & Who did it" (定责); 学习小组侧重"How it happened & Why it made sense to them" (理解上下文)。
                            </p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs font-bold text-slate-800 mb-1">Q3: 怎样才算建立了HOP文化?</p>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                A3: 当一线员工敢于并在会议上主动分享自己的"失误"或"违规"操作，而不用担心受到惩罚时，HOP文化就初步建立了。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
