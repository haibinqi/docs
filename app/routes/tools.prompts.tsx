import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy } from "lucide-react";
import { getPrompts, savePrompt, deletePrompt, type PromptItem } from "@/lib/prompts-storage";

export default function Prompts() {
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [allPrompts, setAllPrompts] = useState<PromptItem[]>([]);
    const [prompts, setPrompts] = useState<PromptItem[]>([]);
    const [filter, setFilter] = useState<string>("ALL");
    const [query, setQuery] = useState("");
    const [notice, setNotice] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/api/prompts?category=${encodeURIComponent(filter)}`);
                if (res.ok) {
                    const data = await res.json();
                    setAllPrompts(data.prompts);
                    setCategories(data.categories);
                    setPrompts(query ? data.prompts.filter((p: PromptItem) => p.title.includes(query) || p.content.includes(query)) : data.prompts);
                    return;
                }
            } catch {}
            const list = getPrompts();
            setAllPrompts(list);
            setCategories(Array.from(new Set(list.map((p) => p.category))).sort((a, b) => a.localeCompare(b)));
            const base = filter === "ALL" ? list : list.filter((p) => p.category === filter);
            setPrompts(query ? base.filter((p) => p.title.includes(query) || p.content.includes(query)) : base);
        }
        load();
    }, []);

    useEffect(() => {
        async function refilter() {
            try {
                const res = await fetch(`/api/prompts?category=${encodeURIComponent(filter)}`);
                if (res.ok) {
                    const data = await res.json();
                    setAllPrompts(data.prompts);
                    setCategories(data.categories);
                    setPrompts(query ? data.prompts.filter((p: PromptItem) => p.title.includes(query) || p.content.includes(query)) : data.prompts);
                    return;
                }
            } catch {}
            const base = filter === "ALL" ? allPrompts : allPrompts.filter((p) => p.category === filter);
            setPrompts(query ? base.filter((p) => p.title.includes(query) || p.content.includes(query)) : base);
        }
        refilter();
    }, [filter]);

    useEffect(() => {
        const base = filter === "ALL" ? allPrompts : allPrompts.filter((p) => p.category === filter);
        setPrompts(query ? base.filter((p) => p.title.includes(query) || p.content.includes(query)) : base);
    }, [query, allPrompts]);

    async function addPrompt() {
        const usedCategory = category.trim();
        if (!usedCategory || !title.trim() || !content.trim()) return;
        try {
            const res = await fetch(`/api/prompts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category: usedCategory, title: title.trim(), content: content.trim() }) });
            if (res.ok) {
                await refetchAll();
                setNotice("新增成功");
                setTimeout(() => setNotice(""), 2000);
            } else {
                throw new Error('server');
            }
        } catch {
            const added = savePrompt({ category: usedCategory, title: title.trim(), content: content.trim() });
            setAllPrompts((prev) => {
                const updated = [added, ...prev];
                setCategories(Array.from(new Set(updated.map((p) => p.category))).sort((a, b) => a.localeCompare(b)));
                return updated;
            });
            setNotice("已保存到本地");
            setTimeout(() => setNotice(""), 2000);
        }
        setTitle("");
        setContent("");
    }

    async function removePrompt(id: string) {
        try {
            const res = await fetch(`/api/prompts?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
            if (res.ok) {
                await refetchAll();
                setNotice("删除成功");
                setTimeout(() => setNotice(""), 2000);
                return;
            }
        } catch {}
        const ok = deletePrompt(id);
        if (!ok) return;
        setAllPrompts((prev) => {
            const updated = prev.filter((p) => p.id !== id);
            setCategories(Array.from(new Set(updated.map((p) => p.category))).sort((a, b) => a.localeCompare(b)));
            return updated;
        });
        setNotice("已从本地删除");
        setTimeout(() => setNotice(""), 2000);
    }

    async function refetchAll() {
        try {
            const res = await fetch(`/api/prompts?category=${encodeURIComponent(filter)}`);
            if (res.ok) {
                const data = await res.json();
                setAllPrompts(data.prompts);
                setCategories(data.categories);
                setPrompts(data.prompts);
            }
        } catch {}
    }

    return (
        <div className="flex-1">
            <section className="space-y-6 bg-slate-50 dark:bg-transparent">
                <div className="mx-auto px-4 max-w-[1200px] py-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* 左侧：新增提示词 (占 4 列) */}
                        <div className="md:col-span-4">
                            <Card className="p-4 sticky top-4">
                                <h3 className="font-bold mb-3">新增提示词</h3>
                                <div className="grid gap-3">
                                    <div>
                                        <label className="text-xs text-muted-foreground">分类</label>
                                        <div className="flex gap-2">
                                            <select
                                                value={category}
                                                onChange={(e) => {
                                                    const v = e.target.value;
                                                    if (v !== "__NEW__") {
                                                        setCategory(v);
                                                    } else {
                                                        setCategory("");
                                                    }
                                                }}
                                                className="h-8 text-[13px] w-1/3 rounded-md border border-input bg-background px-3"
                                            >
                                                <option value="" disabled>选择分类</option>
                                                {categories.map((c) => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                                <option value="__NEW__">输入新分类...</option>
                                            </select>
                                            <Input
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="h-8 text-[13px] flex-1"
                                                placeholder="输入分类名称"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground">标题</label>
                                        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 text-[13px]" placeholder="提示词标题" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground">内容</label>
                                        <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} placeholder="完整提示词内容" />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button size="sm" className="h-8 px-4 text-[13px]" onClick={addPrompt}>保存</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* 右侧：提示词列表 (占 8 列) */}
                        <div className="md:col-span-8">
                            <Card className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold">提示词库</h3>
                                    <div className="w-[200px]">
                                        <select
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                            className="h-8 text-[13px] w-full rounded-md border border-input bg-background px-3"
                                        >
                                            <option value="ALL">全部分类</option>
                                            {categories.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <div className="border rounded-md min-h-[120px]">
                                        {prompts.length === 0 ? (
                                            <div className="p-3 text-sm text-muted-foreground">暂无提示词</div>
                                        ) : (
                                            <div className="divide-y">
                                                {prompts.map((p) => (
                                                    <div key={p.id} className="p-3 flex items-center justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <div className="text-xs text-muted-foreground">{p.category}</div>
                                                            <div className="font-medium truncate max-w-[520px]">{p.title}</div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm" className="h-8 px-3 text-[13px]" onClick={() => { navigator.clipboard.writeText(p.content); setNotice("内容已复制"); setTimeout(() => setNotice(""), 2000); }}>
                                                                <Copy className="w-3.5 h-3.5 mr-1" /> 复制
                                                            </Button>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" size="sm" className="h-8 px-3 text-[13px]">查看</Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-[640px]">
                                                                    <DialogHeader>
                                                                        <DialogTitle>{p.title}</DialogTitle>
                                                                    </DialogHeader>
                                                                    <div className="text-sm whitespace-pre-wrap">{p.content}</div>
                                                                </DialogContent>
                                                            </Dialog>
                                                            <Button variant="destructive" size="sm" className="h-8 px-3 text-[13px]" onClick={() => removePrompt(p.id)}>删除</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {notice && (
                                        <Alert className="mb-2">
                                            <AlertDescription>{notice}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
