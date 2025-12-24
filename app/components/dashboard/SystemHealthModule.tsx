import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const systemMetrics = [
    { name: "ERP核心", uptime: "99.99%", latency: "45ms", errors: "0", load: "32%" },
    { name: "MES生产", uptime: "100%", latency: "23ms", errors: "0", load: "65%" },
    { name: "WMS仓储", uptime: "99.5%", latency: "300ms", errors: "5", load: "88%" },
    { name: "OA办公", uptime: "99.9%", latency: "120ms", errors: "1", load: "12%" },
    { name: "BI分析", uptime: "98.0%", latency: "5.2s", errors: "2", load: "90%" },
    { name: "SRM供应商", uptime: "99.9%", latency: "150ms", errors: "0", load: "20%" },
];

export function SystemHealthModule() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-green-500">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</span>
                    <h3>系统运行指标列表</h3>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <div className="grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0">
                    <div className="col-span-3">系统名称</div>
                    <div className="col-span-2">可用性</div>
                    <div className="col-span-2">延迟</div>
                    <div className="col-span-2">错误数</div>
                    <div className="col-span-3 text-right">负载</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {systemMetrics.map((sys) => (
                        <div key={sys.name} className="grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm">
                            <div className="col-span-3 font-bold text-slate-700">{sys.name}</div>
                            <div className="col-span-2 text-green-600 text-xs">{sys.uptime}</div>
                            <div className={`col-span-2 text-xs ${parseFloat(sys.latency) > 200 ? 'text-red-500 font-bold' : 'text-slate-500'}`}>{sys.latency}</div>
                            <div className="col-span-2 text-slate-500 text-xs">{sys.errors}</div>
                            <div className="col-span-3 flex items-center gap-2 justify-end">
                                <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full rounded-full" style={{ width: sys.load }}></div>
                                </div>
                                <span className="text-xs w-8 text-right text-slate-600">{sys.load}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
