import { Link } from "@remix-run/react";
import { Github } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">你会开飞机吗</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link
                            to="/docs"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Docs
                        </Link>
                        <Link
                            to="/tools/multiplication"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            tools
                        </Link>
                        <Link
                            to="/about"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            About
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search Placeholder */}
                        <div className="relative inline-flex h-9 w-full items-center justify-start rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:w-64 sm:pr-12">
                            <span className="inline-flex">Search...</span>
                        </div>
                    </div>
                    <nav className="flex items-center">
                        <Link
                            to="https://github.com/remix-run/remix"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0"
                        >
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}
