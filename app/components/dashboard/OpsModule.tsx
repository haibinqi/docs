import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const opsIssues = [
    { id: "OP-1001", cat: "系统缺陷", title: "SAP接口超时 (504)", priority: "High", sla: "Breach", owner: "DevOps" },
    { id: "OP-1002", cat: "数据问题", title: "月结报表数据不平", priority: "Critical", sla: "Breach", owner: "DataTeam" },
    { id: "OP-1003", cat: "配置异常", title: "WMS 打印机配置丢失", priority: "Medium", sla: "4h Left", owner: "Ops" },
    { id: "OP-1004", cat: "操作错误", title: "用户误删单据恢复", priority: "Low", sla: "24h Left", owner: "Support" },
    { id: "OP-1005", cat: "系统缺陷", title: "登录页面偶发卡顿", priority: "Low", sla: "48h Left", owner: "Dev" },
];

export function OpsModule() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-red-500">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">4</span>
                    <h3>问题与运维工单</h3>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <div className="grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0">
                    <div className="col-span-2">工单号</div>
                    <div className="col-span-2">分类</div>
                    <div className="col-span-4">标题</div>
                    <div className="col-span-2">SLA</div>
                    <div className="col-span-2 text-right">处理组</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {opsIssues.map((issue) => (
                        <div key={issue.id} className="grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm">
                            <div className="col-span-2 font-mono text-xs text-slate-500">{issue.id}</div>
                            <div className="col-span-2 text-slate-600 text-xs">{issue.cat}</div>
                            <div className="col-span-4 truncate pr-1 font-bold text-slate-700" title={issue.title}>{issue.title}</div>
                            <div className="col-span-2">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${issue.sla === 'Breach' ? 'bg-red-100 text-red-600 font-bold' : 'bg-green-100 text-green-600'}`}>
                                    {issue.sla}
                                </span>
                            </div>
                            <div className="col-span-2 text-right text-slate-500 text-xs">{issue.owner}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
