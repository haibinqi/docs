import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Printer, Calculator } from "lucide-react";

interface Problem {
    num1: number;
    num2: number;
    operator: string;
}

export default function MathGenerator() {
    const [range1, setRange1] = useState("1-100");
    const [range2, setRange2] = useState("1-100");
    const [count, setCount] = useState(20);
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
        <div className="space-y-6">
            <div className="print:hidden space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Calculator className="h-8 w-8 text-primary" />
                        小学生口算生成器
                    </h1>
                    <p className="text-muted-foreground">
                        自定义生成加减乘除口算题，支持竖式和横式。
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start bg-muted/30 p-4 rounded-lg border">
                    {/* Configuration Inputs */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="range1">数字1范围</Label>
                                <Input
                                    id="range1"
                                    value={range1}
                                    onChange={(e) => setRange1(e.target.value)}
                                    placeholder="1-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="range2">数字2范围</Label>
                                <Input
                                    id="range2"
                                    value={range2}
                                    onChange={(e) => setRange2(e.target.value)}
                                    placeholder="1-100"
                                />
                            </div>
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
                    </div>

                    {/* Operator & Format Selection */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>运算符号</Label>
                            <div className="flex gap-4">
                                {["+", "-", "*", "/"].map(op => (
                                    <div key={op} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`op-${op}`}
                                            checked={operators.includes(op)}
                                            onCheckedChange={() => toggleOperator(op)}
                                        />
                                        <label
                                            htmlFor={`op-${op}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {getOperatorSymbol(op)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>题目格式</Label>
                            <RadioGroup value={format} onValueChange={(v: "vertical" | "horizontal") => setFormat(v)} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="horizontal" id="r-horizontal" />
                                    <Label htmlFor="r-horizontal">横式 (1 + 1 = )</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="vertical" id="r-vertical" />
                                    <Label htmlFor="r-vertical">竖式</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 justify-end h-full">
                        <Button onClick={generateProblems} size="lg" disabled={operators.length === 0}>
                            生成试卷
                        </Button>
                        <Button variant="outline" onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" /> 打印A4
                        </Button>
                    </div>
                </div>
            </div>

            <div className="print:block min-h-[500px]" id="print-area">
                {/* Print Header */}
                <div className="hidden print:block mb-6 text-center">
                    <h2 className="text-2xl font-bold">口算能力测试</h2>
                    <div className="mt-4 flex justify-center gap-12 text-sm">
                        <span>班级: ____________</span>
                        <span>姓名: ____________</span>
                        <span>日期: ____________</span>
                        <span>用时: ____________</span>
                        <span>得分: ____________</span>
                    </div>
                </div>

                {/* Problems Grid */}
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
                                        <div className="h-8"></div>
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
                    <div className="print:hidden text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10">
                        请选择配置并点击“生成试卷”
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
            nav, header, aside, footer, .print\\:hidden {
                display: none !important;
            }
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
