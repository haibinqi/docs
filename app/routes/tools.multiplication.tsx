import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Printer } from "lucide-react";

interface Problem {
    num1: number;
    num2: number;
}

export default function MultiplicationGenerator() {
    const [range1, setRange1] = useState("1-9999");
    const [range2, setRange2] = useState("1-9999");
    const [count, setCount] = useState(20);
    const [problems, setProblems] = useState<Problem[]>([]);

    const generateProblems = () => {
        // Parse ranges
        const parseRange = (rangeStr: string) => {
            const parts = rangeStr.split("-").map((p) => parseInt(p.trim(), 10));
            if (parts.length === 1) return { min: 1, max: parts[0] || 9999 };
            return { min: parts[0] || 1, max: parts[1] || 9999 };
        };

        const r1 = parseRange(range1);
        const r2 = parseRange(range2);

        const newProblems: Problem[] = [];
        for (let i = 0; i < count; i++) {
            const num1 = Math.floor(Math.random() * (r1.max - r1.min + 1)) + r1.min;
            const num2 = Math.floor(Math.random() * (r2.max - r2.min + 1)) + r2.min;
            newProblems.push({ num1, num2 });
        }
        setProblems(newProblems);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            <div className="print:hidden space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">竖式计算生成</h1>
                    <p className="text-muted-foreground">
                        生成多位数乘多位数的竖式计算练习题。
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="range1">乘数1范围 (例如 10-99)</Label>
                        <Input
                            id="range1"
                            value={range1}
                            onChange={(e) => setRange1(e.target.value)}
                            placeholder="1-9999"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="range2">乘数2范围 (例如 10-99)</Label>
                        <Input
                            id="range2"
                            value={range2}
                            onChange={(e) => setRange2(e.target.value)}
                            placeholder="1-9999"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="count">题目数量</Label>
                        <Input
                            id="count"
                            type="number"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button onClick={generateProblems}>生成试卷</Button>
                        <Button variant="outline" onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" /> 打印A4
                        </Button>
                    </div>
                </div>
            </div>

            <div className="print:block" id="print-area">
                {/* Print Header */}
                <div className="hidden print:block mb-8 text-center">
                    <h2 className="text-2xl font-bold">竖式计算练习</h2>
                    <div className="mt-2 flex justify-center gap-8 text-sm">
                        <span>日期: ______________</span>
                        <span>耗时: ______________</span>
                        <span>得分: ______________</span>
                    </div>
                </div>

                {/* Problems Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 print:grid-cols-5 gap-x-8 gap-y-16 print:gap-y-12 w-full">
                    {problems.map((p, i) => (
                        <div key={i} className="font-mono text-xl" style={{ letterSpacing: "0.2em" }}>
                            <div className="text-right">{p.num1}</div>
                            <div className="text-right border-b-2 border-black relative">
                                <span className="absolute left-0 bottom-0.5">×</span>
                                {p.num2}
                            </div>
                            <div className="h-12"></div> {/* Space for answer */}
                        </div>
                    ))}
                </div>
                {problems.length === 0 && (
                    <div className="print:hidden text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg">
                        点击上方“生成试卷”按钮开始
                    </div>
                )}
            </div>

            <style>{`
        @media print {
            @page {
                size: A4;
                margin: 20mm;
            }
            body {
                background: white;
            }
            /* Hide everything except root and print area logic is usually handled by hiding unrelated parents, 
               but in single page app it's trickier. 
               Strategy: Hide all siblings of #print-area or use specific print-hidden utility 
            */
            nav, header, aside, footer, .print\\:hidden {
                display: none !important;
            }
            
            /* Ensure main content takes full width */
            main {
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                max-width: none !important;
                display: block !important;
            }
            .container {
                max-width: none !important;
                padding: 0 !important;
                margin: 0 !important;
            }
        }
      `}</style>
        </div>
    );
}
