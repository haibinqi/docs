import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const knowledgeItems = [
    { title: "2025年度财务报销规范 V2.0", type: "制度", date: "10:00", cat: "财务", status: "New" },
    { title: "MES系统操作手册-注塑车间", type: "SOP", date: "09:30", cat: "制造", status: "" },
    { title: "数据安全管理红线规定", type: "合规", date: "Yesterday", cat: "安全", status: "Must Read" },
    { title: "Q3 季度运营分析报告", type: "报告", date: "2 days ago", cat: "经管", status: "" },
    { title: "新员工入职IT指引", type: "指南", date: "Last Week", cat: "IT", status: "" },
];

export function KnowledgeModule() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-amber-500">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-lg">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">8</span>
                    <h3>知识库动态</h3>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <div className="grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0">
                    <div className="col-span-6">文档标题</div>
                    <div className="col-span-2">类型</div>
                    <div className="col-span-2">分类</div>
                    <div className="col-span-2 text-right">时间</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {knowledgeItems.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm">
                            <div className="col-span-6 flex items-center gap-2 truncate pr-2">
                                {item.status && <Badge variant="destructive" className="h-4 px-1.5 text-[9px]">{item.status}</Badge>}
                                <span className="font-bold text-slate-700 truncate" title={item.title}>{item.title}</span>
                            </div>
                            <div className="col-span-2 text-slate-500 text-xs">{item.type}</div>
                            <div className="col-span-2 text-slate-500 text-xs">{item.cat}</div>
                            <div className="col-span-2 text-right text-xs text-slate-400">{item.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
