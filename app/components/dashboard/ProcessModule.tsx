import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

// Updated to data-centric list
const processList = [
    { id: "P-001", name: "采购流程", phase: "订单审批", owner: "张三", status: "normal", updated: "10:00" },
    { id: "P-002", name: "生产计划", phase: "排产确认", owner: "李四", status: "warning", updated: "09:45" },
    { id: "P-003", name: "质量检验", phase: "入库检", owner: "王五", status: "normal", updated: "10:15" },
    { id: "P-004", name: "发货物流", phase: "装车", owner: "赵六", status: "critical", updated: "Draft" },
    { id: "P-005", name: "财务结算", phase: "月结", owner: "孙七", status: "normal", updated: "Yesterday" },
    { id: "P-006", name: "工程变更", phase: "ECN审核", owner: "钱八", status: "normal", updated: "09:30" },
];

export function ProcessModule() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-blue-500">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                    <h3>核心业务流程列表</h3>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <div className="grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0">
                    <div className="col-span-3">流程名称</div>
                    <div className="col-span-3">当前节点</div>
                    <div className="col-span-2">责任人</div>
                    <div className="col-span-2">状态</div>
                    <div className="col-span-2 text-right">更新</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {processList.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm">
                            <div className="col-span-3 font-bold text-slate-700">{item.name}</div>
                            <div className="col-span-3 text-slate-500 text-xs flex items-center gap-1">
                                <ArrowRight className="h-3 w-3" /> {item.phase}
                            </div>
                            <div className="col-span-2 text-slate-600 text-xs">{item.owner}</div>
                            <div className="col-span-2">
                                <Badge variant="outline" className={`h-5 px-1.5 text-[10px] font-normal border-0 ${item.status === 'normal' ? 'bg-green-100 text-green-700' :
                                        item.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    {item.status}
                                </Badge>
                            </div>
                            <div className="col-span-2 text-right text-slate-400 text-xs font-mono">{item.updated}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
