import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dataDomains = [
    { name: "物料主数据", total: 45200, missing: 12, dup: 0, score: 99.9 },
    { name: "客户信息", total: 1200, missing: 85, dup: 4, score: 92.5 },
    { name: "供应商档案", total: 850, missing: 0, dup: 1, score: 99.8 },
    { name: "BOM结构", total: 15400, missing: 142, dup: 12, score: 88.4 },
    { name: "会计科目", total: 320, missing: 0, dup: 0, score: 100.0 },
];

export function DataModule() {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-cyan-500">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 text-cyan-600 font-bold text-lg">
                    <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">6</span>
                    <h3>数据治理详情</h3>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-0">
                <div className="grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0">
                    <div className="col-span-3">主数据域</div>
                    <div className="col-span-3 text-right">总记录数</div>
                    <div className="col-span-2 text-right">缺失项</div>
                    <div className="col-span-2 text-right">重复项</div>
                    <div className="col-span-2 text-right">质量分</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {dataDomains.map((d) => (
                        <div key={d.name} className="grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm">
                            <div className="col-span-3 font-bold text-slate-700">{d.name}</div>
                            <div className="col-span-3 text-right text-slate-500 text-xs">{d.total.toLocaleString()}</div>
                            <div className={`col-span-2 text-right text-xs ${d.missing > 0 ? 'text-orange-500' : 'text-slate-400'}`}>{d.missing}</div>
                            <div className={`col-span-2 text-right text-xs ${d.dup > 0 ? 'text-red-500' : 'text-slate-400'}`}>{d.dup}</div>
                            <div className={`col-span-2 text-right font-bold ${d.score < 90 ? 'text-red-600' : 'text-green-600'}`}>{d.score}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
