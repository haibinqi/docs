import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const demands = [
    { id: "REQ-001", title: "财务报表新增利润中心维度", status: "开发中", priority: "P0", requester: "财务部" },
    { id: "REQ-002", title: "WMS手持端适配新款PDA", status: "方案确认", priority: "P1", requester: "物流部" },
    { id: "REQ-003", title: "销售预测算法优化 (V2.0)", status: "待评估", priority: "P2", requester: "销售部" },
    { id: "REQ-004", title: "OA流程：差旅报销单", status: "上线验证", priority: "P1", requester: "HR" },
    { id: "REQ-005", title: "生产看板增加OEE指标", status: "已完成", priority: "P2", requester: "生产部" },
    { id: "REQ-006", title: "SRM供应商门户SSO集成", status: "开发中", priority: "P1", requester: "IT" },
];

export function DemandModule() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-indigo-500">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
                    <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">7</span>
                    <h3>需求与变更排期</h3>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <div className="grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0">
                    <div className="col-span-2">编号</div>
                    <div className="col-span-5">需求标题</div>
                    <div className="col-span-2">提出部门</div>
                    <div className="col-span-1">级</div>
                    <div className="col-span-2 text-right">状态</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {demands.map((r) => (
                        <div key={r.id} className="grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm">
                            <div className="col-span-2 text-xs text-slate-500">{r.id}</div>
                            <div className="col-span-5 truncate pr-2 font-bold text-slate-700" title={r.title}>{r.title}</div>
                            <div className="col-span-2 text-slate-500 text-xs">{r.requester}</div>
                            <div className="col-span-1">
                                <span className={`text-[10px] font-bold ${r.priority === 'P0' ? 'text-red-600' : 'text-blue-600'}`}>{r.priority}</span>
                            </div>
                            <div className="col-span-2 text-right">
                                <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
                                    {r.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
