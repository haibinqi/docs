import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Printer, Calculator, Settings2 } from "lucide-react";

interface Problem {
    num1: number;
    num2: number;
    operator: string;
}

export default function MathGenerator() {
    const [range1, setRange1] = useState("1-9999");
    const [range2, setRange2] = useState("1-9999");
    const [count, setCount] = useState(30);
    const [problems, setProblems] = useState<Problem[]>([]);

    // Options
    const [operators, setOperators] = useState<string[]>(["+"]);
    const [format, setFormat] = useState<"vertical" | "horizontal">("horizontal");

    const toggleOperator = (op: string) => {
        setOperators(prev =>
            prev.includes(op)
                ? prev.filter(o => o !== op)
                : [...prev, op]
        );
    };

    const generateProblems = () => {
        if (operators.length === 0) return;

        // Parse ranges
        const parseRange = (rangeStr: string) => {
            const parts = rangeStr.split("-").map((p) => parseInt(p.trim(), 10));
            if (parts.length === 1) return { min: 1, max: parts[0] || 100 };
            return { min: parts[0] || 1, max: parts[1] || 100 };
        };

        const r1 = parseRange(range1);
        const r2 = parseRange(range2);

        const newProblems: Problem[] = [];
        for (let i = 0; i < count; i++) {
            const op = operators[Math.floor(Math.random() * operators.length)];

            let val1 = Math.floor(Math.random() * (r1.max - r1.min + 1)) + r1.min;
            let val2 = Math.floor(Math.random() * (r2.max - r2.min + 1)) + r2.min;

            let num1 = val1;
            let num2 = val2;

            // Adjust numbers based on operator for "sensible" elementary problems
            switch (op) {
                case "-":
                    num1 = Math.max(val1, val2);
                    num2 = Math.min(val1, val2);
                    break;
                case "/":
                    // Ensure integer division and non-zero divisor
                    if (val2 === 0) val2 = 1;
                    // Strategy: construct a valid division
                    // If we want result to be integer, dividend must be multiple of divisor
                    // Let's take the larger as potential dividend
                    let big = Math.max(val1, val2);
                    let small = Math.min(val1, val2);
                    if (small === 0) small = 1;

                    // Adjust big to be a multiple of small
                    big = big - (big % small);
                    // Avoid 0 / x? Maybe allowed, but usually 0 is easy. 
                    // Let's ensure non-zero for better practice if range allows
                    if (big === 0 && r1.max > 0) big = small;

                    num1 = big;
                    num2 = small;
                    break;
                default: // + and *
                    num1 = val1;
                    num2 = val2;
            }

            newProblems.push({ num1, num2, operator: op });
        }
        setProblems(newProblems);
    };

    const handlePrint = () => {
        window.print();
    };

    const getOperatorSymbol = (op: string) => {
        switch (op) {
            case "*": return "×";
            case "/": return "÷";
            default: return op;
        }
    };

    return (
        <div className="flex-1 w-full bg-background flex min-h-0 h-[calc(100vh-8rem)] border rounded-lg overflow-hidden mt-[5px]">
            {/* 左侧：配置面板 */}
            <div className="w-[300px] border-r bg-muted/10 flex flex-col shrink-0 print:hidden">
                <div className="h-12 px-4 border-b flex items-center justify-between bg-muted/30">
                    <span className="font-medium text-sm flex items-center gap-2">
                        <Settings2 className="w-4 h-4" />
                        出题配置
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div className="space-y-3">
                         <div className="space-y-1.5">
                            <Label htmlFor="range1" className="text-xs text-muted-foreground font-medium">数字1范围</Label>
                            <Input
                                id="range1"
                                className="h-8 text-[13px]"
                                value={range1}
                                onChange={(e) => setRange1(e.target.value)}
                                placeholder="1-100"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="range2" className="text-xs text-muted-foreground font-medium">数字2范围</Label>
                            <Input
                                id="range2"
                                className="h-8 text-[13px]"
                                value={range2}
                                onChange={(e) => setRange2(e.target.value)}
                                placeholder="1-100"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="count" className="text-xs text-muted-foreground font-medium">题目数量</Label>
                            <Input
                                id="count"
                                type="number"
                                className="h-8 text-[13px]"
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-xs text-muted-foreground font-medium">运算符号</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {["+", "-", "*", "/"].map(op => (
                                <div key={op} className="flex items-center space-x-2 border rounded-md p-2 bg-background">
                                    <Checkbox
                                        id={`op-${op}`}
                                        checked={operators.includes(op)}
                                        onCheckedChange={() => toggleOperator(op)}
                                        className="h-4 w-4"
                                    />
                                    <label
                                        htmlFor={`op-${op}`}
                                        className="text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                                    >
                                        {getOperatorSymbol(op)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-xs text-muted-foreground font-medium">试卷格式</Label>
                        <RadioGroup value={format} onValueChange={(v: "vertical" | "horizontal") => setFormat(v)} className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2 border rounded-md p-2 bg-background">
                                <RadioGroupItem value="horizontal" id="r-horizontal" className="h-4 w-4" />
                                <Label htmlFor="r-horizontal" className="text-[13px] font-normal cursor-pointer flex-1">横式</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-2 bg-background">
                                <RadioGroupItem value="vertical" id="r-vertical" className="h-4 w-4" />
                                <Label htmlFor="r-vertical" className="text-[13px] font-normal cursor-pointer flex-1">竖式</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="pt-2">
                         <Button onClick={generateProblems} className="w-full h-8 text-[13px]" disabled={operators.length === 0}>
                            生成试卷
                        </Button>
                    </div>
                </div>
            </div>

            {/* 右侧：预览区域 */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
                 <div className="h-12 px-4 border-b flex items-center justify-between bg-muted/30 print:hidden">
                     <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">试卷预览</span>
                     </div>
                     <Button variant="outline" onClick={handlePrint} size="sm" className="h-8 px-3 text-[13px]">
                        <Printer className="mr-2 h-3.5 w-3.5" /> 打印A4
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-8" id="print-area">
                    {/* 打印页眉 (仅打印时显示或预览显示) */}
                    <div className="text-center mb-8 hidden print:block">
                        <h1 className="text-2xl font-bold mb-2">口算练习题</h1>
                        <div className="flex justify-center gap-8 text-sm text-gray-500">
                            <span>日期：______________</span>
                            <span>用时：______________</span>
                            <span>得分：______________</span>
                        </div>
                    </div>

                    <div
                        className={`grid w-full ${format === 'vertical'
                            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-5 gap-x-12 gap-y-12"
                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 gap-x-12 gap-y-8"
                            }`}
                    >
                        {problems.map((p, i) => (
                            <div key={i} className="font-mono text-xl flex justify-center" style={{ breakInside: "avoid" }}>
                                {format === 'vertical' ? (
                                    p.operator === '/' ? (
                                        // Vertical Division Layout
                                        <div className="flex items-center justify-center text-lg">
                                            <div className="mr-2">{p.num2}</div>
                                            <div className="border-l border-t border-black px-2 pt-0.5 pb-0.5 min-w-[3em]">
                                                {p.num1}
                                            </div>
                                        </div>
                                    ) : (
                                        // Vertical Standard Layout
                                        <div className="inline-flex flex-col items-end" style={{ letterSpacing: "0.1em" }}>
                                            <div className="text-right w-full">{p.num1}</div>
                                            <div className="text-right w-full border-b-2 border-black relative">
                                                <span className="absolute left-0 -translate-x-full pr-2">{getOperatorSymbol(p.operator)}</span>
                                                {p.num2}
                                            </div>
                                            <div className="h-16"></div>
                                        </div>
                                    )
                                ) : (
                                    // Horizontal Layout
                                    <div className="flex items-baseline justify-between border-b border-dashed border-gray-300 pb-1 w-full">
                                        <span>{p.num1} {getOperatorSymbol(p.operator)} {p.num2} = </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {problems.length === 0 && (
                        <div className="print:hidden flex flex-col items-center justify-center h-full text-muted-foreground border-2 border-dashed rounded-lg bg-muted/5 m-4">
                            <Calculator className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-sm">请在左侧配置并点击“生成试卷”</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @media print {
            @page {
                size: A4;
                margin: 15mm;
            }
            body {
                background: white;
                visibility: hidden;
            }
            /* Hide everything by default */
            body * {
                visibility: hidden;
            }
            
            /* Only show the print area and its children */
            #print-area, #print-area * {
                visibility: visible;
            }

            /* Reset the print area to top-left of the page */
            #print-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0 !important;
                padding: 0 !important;
                display: block !important;
                overflow: visible !important;
            }

            /* Ensure internal grid works */
            .grid {
                display: grid !important;
            }
            
            /* Neutralize the root layout (Remix/Tailwind specific) */
            body > div {
                display: block !important;
                position: static !important;
                min-height: 0 !important;
                height: auto !important;
                overflow: visible !important;
            }
            
            /* Hide standard layout elements just in case */
            nav, header, aside, footer, .print\\:hidden {
                display: none !important;
            }
        }
      `}</style>
        </div>
    );
}
