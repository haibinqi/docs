import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Data listified as requested: Request, Audit, Active
const authorityTasks = [
    { type: "权限申请", subject: "财务总监 - ERP超级管理员", applicant: "李明", time: "10:30", status: "待审批" },
    { type: "权限申请", subject: "实习生 - 数据库只读", applicant: "王强", time: "09:15", status: "已驳回" },
    { type: "权限审核", subject: "年度权限盘点 - 制造部", applicant: "系统", time: "Yesterday", status: "进行中" },
    { type: "权限生效", subject: "张三 - 离职权限回收", applicant: "HR系统", time: "09:00", status: "完成" },
    { type: "权限生效", subject: "临时访问 - 外部审计", applicant: "IT部", time: "11:00", status: "Active" },
];

export function AuthorityModule() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-orange-500">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-lg">
                    <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                    <h3>权限与组织管理列表</h3>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <div className="grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0">
                    <div className="col-span-3">类型</div>
                    <div className="col-span-5">事项主题</div>
                    <div className="col-span-2">申请人/源</div>
                    <div className="col-span-2 text-right">状态</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {authorityTasks.map((task, idx) => (
                        <div key={idx} className="grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm">
                            <div className="col-span-3 font-medium text-slate-600">{task.type}</div>
                            <div className="col-span-5 truncate pr-2 font-bold text-slate-700" title={task.subject}>{task.subject}</div>
                            <div className="col-span-2 text-slate-500 text-xs">{task.applicant}</div>
                            <div className="col-span-2 text-right">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${task.status === '完成' || task.status === 'Active' ? 'bg-green-100 text-green-700' :
                                    task.status === '已驳回' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                    {task.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
