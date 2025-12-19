import { Link, useFetcher } from "@remix-run/react";
import { Button } from "@/components/ui/button";

export default function Index() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] w-full px-[5px] pt-[5px]">
            <div className="text-center space-y-6 w-full px-0">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Haibin's Docs
                </h1>
                <p className="text-lg text-muted-foreground">
                    个人的知识库、工具箱和实验田。
                </p>
                <div className="flex gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link to="/docs">浏览笔记</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link to="/tools/prompts">提示词库</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
