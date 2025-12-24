import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Factory, FlaskConical, Gauge, Archive, Activity } from "lucide-react";

export function SafetyEHS() {
    return (
        <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl border-b pb-2 border-slate-200">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                <h2>EHS 实操指引</h2>
            </div>

            {/* Row 1: General Reqs & Trial Support */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Col 1: Project Safety */}
                <div className="space-y-4">
                    <h3 className="text-orange-500 font-bold flex items-center gap-2 text-sm uppercase">
                        <span className="p-1 border border-orange-200 rounded bg-orange-50">📂</span>
                        一、项目执行阶段
                    </h3>

                    <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3 text-sm">
                        <div className="space-y-1">
                            <p className="font-bold text-slate-700">1. 选址与总图布局</p>
                            <ul className="list-disc pl-4 text-slate-500 space-y-0.5 text-xs">
                                <li>安全距离: 防火间距符合GB50016</li>
                                <li>风向考虑: 散发有害气体设施置于下风侧</li>
                                <li>交通物流: 人流物流分开，消防通道畅通</li>
                            </ul>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-slate-700">2. 工艺安全设计(PSD)</p>
                            <ul className="list-disc pl-4 text-slate-500 space-y-0.5 text-xs">
                                <li>反应风险评估: 涉及高危反应需做反应热测试</li>
                                <li>本质安全: 尽量减少危险化学品在线量</li>
                                <li>自控水平: 高危工艺DCS/SIS全覆盖</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Col 2: Trial Production */}
                <div className="space-y-4">
                    <h3 className="text-orange-500 font-bold flex items-center gap-2 text-sm uppercase">
                        <span className="p-1 border border-orange-200 rounded bg-orange-50">📑</span>
                        二、设备全生命周期
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3 text-sm">
                        <div className="space-y-1">
                            <p className="font-bold text-slate-700">1. 机械完整性(MI)</p>
                            <ul className="list-disc pl-4 text-slate-500 space-y-0.5 text-xs">
                                <li>关键设备: 压力容器、安全阀、防爆片台账</li>
                                <li>预防性维护: 建立PM计划并严格执行</li>
                                <li>备件管理: 关键备件最低库存预警</li>
                            </ul>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-slate-700">2. 变更管理(MOC)</p>
                            <ul className="list-disc pl-4 text-slate-500 space-y-0.5 text-xs">
                                <li>变更申请: 任何工艺、设备、人员变更需申请</li>
                                <li>风险评估: 变更前进行PSSR (启动前安全检查)</li>
                                <li>文档更新: PID图、操作规程同步更新</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Col 3: High Risk Warning */}
                <div className="space-y-4">
                    <h3 className="text-blue-600 font-bold flex items-center gap-2 text-sm uppercase">
                        <span className="p-1 border border-blue-200 rounded bg-blue-50">⚠️</span>
                        危险与可操作性分析 (HAZOP)
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-2 text-sm">
                        <p className="font-bold text-blue-800">1. 节点划分原则</p>
                        <p className="text-blue-600 text-xs">按工艺流程顺序，明确每个节点的边界 (Node Boundary)</p>

                        <p className="font-bold text-blue-800 mt-2">2. 分析方法</p>
                        <ul className="text-blue-600 text-xs space-y-1">
                            <li>• 引导词: MORE, LESS, NO, REVERSE</li>
                            <li>• 偏差: 流量过大、温度过高、压力过低</li>
                            <li>• 后果: 也就是这个偏差导致的最终安全事故</li>
                        </ul>

                        <p className="font-bold text-blue-800 mt-2">3. 保护层分析 (LOPA)</p>
                        <p className="text-blue-600 text-xs">对HAZOP识别出的高风险场景进行半定量分析，确定SIL等级</p>
                    </div>
                </div>
            </div>

            {/* Row 2: High Risk Process Grid (Grid Table Style) */}
            <div className="space-y-4">
                <h3 className="text-green-600 font-bold flex items-center gap-2 text-sm uppercase">
                    <span className="p-1 border border-green-200 rounded bg-green-50">⚗️</span>
                    三、高危工艺核心要点
                </h3>
                <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
                    <div className="grid grid-cols-4 bg-slate-50 text-slate-700 font-bold text-xs p-3 border-b">
                        <div>工艺名称</div>
                        <div>关键控制点</div>
                        <div>核心安全措施</div>
                        <div>重点关注</div>
                    </div>

                    {/* Item 1 */}
                    <div className="grid grid-cols-4 text-xs p-3 border-b hover:bg-slate-50 transition-colors">
                        <div className="font-bold text-slate-800">硝化工艺</div>
                        <div className="text-slate-500">反应温度、加料速度、搅拌速率</div>
                        <div className="text-slate-500">双重温度报警、紧急终止系统(Dump)</div>
                        <div className="text-orange-600">分解爆炸风险高，需严格控温</div>
                    </div>
                    {/* Item 2 */}
                    <div className="grid grid-cols-4 text-xs p-3 border-b hover:bg-slate-50 transition-colors">
                        <div className="font-bold text-slate-800">氧化工艺</div>
                        <div className="text-slate-500">氧含量、反应釜压力、尾气成分</div>
                        <div className="text-slate-500">氧含量在线分析、氮气保护系统</div>
                        <div className="text-orange-600">过氧化物积累、气相爆炸</div>
                    </div>
                    {/* Item 3 */}
                    <div className="grid grid-cols-4 text-xs p-3 border-b hover:bg-slate-50 transition-colors">
                        <div className="font-bold text-slate-800">氯化工艺</div>
                        <div className="text-slate-500">氯气压力、反应温度、尾气吸收</div>
                        <div className="text-slate-500">氯气泄漏报警、全密闭操作、碱液吸收</div>
                        <div className="text-orange-600">剧毒气体泄漏、设备腐蚀</div>
                    </div>
                    {/* Item 4 */}
                    <div className="grid grid-cols-4 text-xs p-3 hover:bg-slate-50 transition-colors">
                        <div className="font-bold text-slate-800">加氢工艺</div>
                        <div className="text-slate-500">氢气压力、催化剂活性、反应热</div>
                        <div className="text-slate-500">氢气泄漏报警、高压紧急切断阀</div>
                        <div className="text-orange-600">高压氢气泄漏爆炸、催化剂自燃</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
