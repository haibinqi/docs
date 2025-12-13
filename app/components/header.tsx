import { Link } from "@remix-run/react";
import { Github, ChevronDown, Calculator } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-14 max-w-[960px] items-center px-4">
                <div className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">你会开飞机吗</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link
                            to="/docs"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            文档
                        </Link>
                        <DropdownMenu modal={false}>
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
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Calculator className="h-4 w-4 text-primary" />
                                                    <div className="text-sm font-medium leading-none">小学生口算</div>
                                                </div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1 pl-6">
                                                    自定义生成加减乘除口算，支持打印
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-medium leading-none text-muted-foreground">开发工具</h4>
                                        <div className="grid gap-1">
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
                            to="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            关于
                        </Link>
                    </nav>
                </div>

            </div>
        </header>
    );
}
