import { Link, useLocation } from "@remix-run/react";
import { Github, ChevronDown, Calculator } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function Header() {
    const location = useLocation();
    const [toolsOpen, setToolsOpen] = useState(false);

    useEffect(() => {
        setToolsOpen(false);
    }, [location.pathname]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 w-full items-center justify-between px-0">
                <div className="flex items-center pl-0">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold sm:inline-block">Haibin</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        
                        <DropdownMenu modal={false} open={toolsOpen} onOpenChange={setToolsOpen}>
                            <DropdownMenuTrigger className="transition-colors hover:text-foreground/80 text-foreground/60 outline-none flex items-center gap-1">
                                工具 <ChevronDown className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[600px] p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <h4 className="font-medium leading-none text-muted-foreground">数学工具</h4>
                                        <div className="grid gap-1">
                                            <Link
                                                to="/tools/math"
                                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                onClick={() => setToolsOpen(false)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Calculator className="h-4 w-4 text-primary" />
                                                    <div className="text-sm font-medium leading-none">小学生口算</div>
                                                </div>
                                                
                                            </Link>
                                            
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-medium leading-none text-muted-foreground">开发工具</h4>
                                        <div className="grid gap-1">
                                            <Link
                                                to="/tools/prompts"
                                                className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                onClick={() => setToolsOpen(false)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-4 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-[10px] font-bold">P</div>
                                                    <div className="text-sm font-medium leading-none">提示词库</div>
                                                </div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1 pl-6">
                                                    管理和检索常用的 AI 提示词
                                                </p>
                                            </Link>
                                            <div className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none opacity-50 cursor-not-allowed">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-4 w-4 rounded-full border border-primary/20 bg-primary/10" />
                                                    <div className="text-sm font-medium leading-none">JSON 格式化</div>
                                                </div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1 pl-6">
                                                    即将推出...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link
                            to="/docs"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            笔记
                        </Link>
                        <Link
                            to="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            关于
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-2 pr-0">
                    <Link to="https://github.com/qihaibin/docs" target="_blank" rel="noreferrer">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
