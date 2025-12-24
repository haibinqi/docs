import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const risks = [
    { id: "R-001", area: "连续性", desc: "核心岗位(DBA)无备岗方案", level: "High", status: "Open", due: "2024-06-30" },
    { id: "R-002", area: "合规", desc: "部分合同附件缺失签字页", level: "Medium", status: "Scanning", due: "2024-05-15" },
    { id: "R-003", area: "数据安全", desc: "测试环境存在敏感数据", level: "High", status: "Open", due: "Immediate" },
    { id: "R-004", area: "权限", desc: "离职人员账号未及时禁用", level: "Medium", status: "Fixed", due: "-" },
    { id: "R-005", area: "流程", desc: "变更流程缺失回滚验证", level: "Low", status: "Open", due: "2024-12-31" },
];

export function RiskModule() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-purple-500">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-purple-600 font-bold text-lg">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">5</span>
                    <h3>风险与合规事项</h3>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <div className="grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0">
                    <div className="col-span-2">领域</div>
                    <div className="col-span-6">风险描述</div>
                    <div className="col-span-2">等级</div>
                    <div className="col-span-2 text-right">截止</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {risks.map((r) => (
                        <div key={r.id} className="grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm">
                            <div className="col-span-2 text-slate-600 text-xs">{r.area}</div>
                            <div className="col-span-6 truncate pr-2 font-bold text-slate-700" title={r.desc}>{r.desc}</div>
                            <div className="col-span-2">
                                <Badge variant="outline" className={`h-5 px-1.5 text-[10px] border-0 ${r.level === 'High' ? 'bg-red-100 text-red-700' :
                                    r.level === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {r.level}
                                </Badge>
                            </div>
                            <div className="col-span-2 text-right text-xs text-slate-500">{r.due}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
