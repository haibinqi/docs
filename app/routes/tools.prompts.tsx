import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useFetcher, useSearchParams } from "@remix-run/react";
import { Trash2, Eye, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Prompt {
    id: number;
    content: string;
    category: string;
    created_at: string;
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
    const { env } = context.cloudflare as { env: { DB: D1Database } };
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    let query = "SELECT * FROM prompts";
    const params: any[] = [];

    if (category && category !== "All") {
        query += " WHERE category = ?";
        params.push(category);
    }

    query += " ORDER BY created_at DESC";

    const stmt = env.DB.prepare(query);
    const { results } = await (params.length > 0 ? stmt.bind(...params) : stmt).all<Prompt>();

    return json({ prompts: results, currentCategory: category || "All" });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const { env } = context.cloudflare as { env: { DB: D1Database } };
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "add") {
        const content = formData.get("content") as string;
        const category = (formData.get("category") as string) || "General";

        if (!content?.trim()) {
            return json({ error: "Content is required" }, { status: 400 });
        }
        await env.DB.prepare(
            "INSERT INTO prompts (content, category) VALUES (?, ?)"
        ).bind(content, category).run();
        return json({ success: true });
    }

    if (intent === "delete") {
        const id = formData.get("id");
        await env.DB.prepare(
            "DELETE FROM prompts WHERE id = ?"
        ).bind(id).run();
        return json({ success: true });
    }

    return json({ error: "Invalid intent" }, { status: 400 });
};

const CATEGORIES = [
    { value: "General", label: "通用 (General)" },
    { value: "Coding", label: "编程 (Coding)" },
    { value: "Writing", label: "写作 (Writing)" },
    { value: "Data", label: "数据 (Data)" },
    { value: "Image", label: "绘画 (Image)" },
    { value: "Other", label: "其他 (Other)" },
];

export default function PromptsPage() {
    const { prompts, currentCategory } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const [searchParams, setSearchParams] = useSearchParams();
    const isAdding = fetcher.state === "submitting" && fetcher.formData?.get("intent") === "add";

    const handleFilterChange = (value: string) => {
        setSearchParams(prev => {
            if (value === "All") {
                prev.delete("category");
            } else {
                prev.set("category", value);
            }
            return prev;
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-2 flex-shrink-0">
                <h1 className="text-3xl font-bold tracking-tight">提示词合集</h1>
                <p className="text-muted-foreground">
                    高效管理和检索您的 AI 提示词库
                </p>
            </div>

            <div className="grid gap-6 flex-1 min-h-0">
                {/* Add Form */}
                <fetcher.Form method="post" className="grid gap-4 rounded-lg border p-4 bg-muted/30 flex-shrink-0">
                    <div className="flex items-center gap-2 font-semibold">
                        <Plus className="h-4 w-4" /> 新增提示词
                    </div>
                    <div className="flex gap-4">
                        <div className="w-[180px] flex-shrink-0">
                            <Select name="category" defaultValue="General">
                                <SelectTrigger>
                                    <SelectValue placeholder="选择分类" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map(cat => (
                                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Textarea
                            name="content"
                            placeholder="输入提示词内容..."
                            className="min-h-[80px] flex-1 bg-background resize-none"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            name="intent"
                            value="add"
                            disabled={isAdding}
                        >
                            {isAdding ? "Saving..." : "保存提示词"}
                        </Button>
                    </div>
                </fetcher.Form>

                {/* List View */}
                <div className="rounded-md border bg-card flex-1 min-h-0 flex flex-col overflow-hidden">
                    {/* Header & Filter */}
                    <div className="bg-muted/50 p-3 grid grid-cols-[100px_1fr_120px] gap-4 text-sm font-medium text-muted-foreground border-b flex-shrink-0 items-center">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <Select value={currentCategory} onValueChange={handleFilterChange}>
                                <SelectTrigger className="h-8 border-none bg-transparent hover:bg-background/50 focus:ring-0 w-[110px] p-0 shadow-none">
                                    <SelectValue placeholder="分类筛选" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">全部 (All)</SelectItem>
                                    {CATEGORIES.map(cat => (
                                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>内容预览</div>
                        <div className="text-right">操作</div>
                    </div>

                    <div className="overflow-y-auto p-0">
                        {prompts.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                {currentCategory !== "All" ? "该分类下暂无数据" : "暂无数据"}
                            </div>
                        ) : (
                            <div className="divide-y">
                                {prompts.map((prompt) => (
                                    <div key={prompt.id} className="grid grid-cols-[100px_1fr_120px] gap-4 p-3 items-center hover:bg-muted/30 transition-colors">
                                        <div>
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                {prompt.category || "General"}
                                            </span>
                                        </div>
                                        <div className="truncate text-sm font-mono text-muted-foreground">
                                            {prompt.content}
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                                                    <DialogHeader>
                                                        <DialogTitle>提示词详情</DialogTitle>
                                                        <DialogDescription>
                                                            分类: {prompt.category || "General"} | 创建时间: {new Date(prompt.created_at).toLocaleString()}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex-1 overflow-y-auto mt-4 p-4 rounded-md bg-muted/30 border font-mono text-sm whitespace-pre-wrap break-words">
                                                        {prompt.content}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <fetcher.Form method="post" className="inline-block">
                                                <input type="hidden" name="id" value={prompt.id} />
                                                <Button
                                                    type="submit"
                                                    name="intent"
                                                    value="delete"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </fetcher.Form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
