import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getPrompts, savePrompt, deletePrompt, type PromptItem } from "@/lib/prompts-storage";

export default function Index() {
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [allPrompts, setAllPrompts] = useState<PromptItem[]>([]);
    const [prompts, setPrompts] = useState<PromptItem[]>([]);
    const [filter, setFilter] = useState<string>("ALL");
    const [addCatOpen, setAddCatOpen] = useState(false);
    const [addCatName, setAddCatName] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/api/prompts?category=${encodeURIComponent(filter)}`);
                if (res.ok) {
                    const data = await res.json();
                    setAllPrompts(data.prompts);
                    setCategories(data.categories);
                    setPrompts(data.prompts);
                    return;
                }
            } catch {}
            const list = getPrompts();
            setAllPrompts(list);
            setCategories(Array.from(new Set(list.map((p) => p.category))).sort((a, b) => a.localeCompare(b)));
            setPrompts(filter === "ALL" ? list : list.filter((p) => p.category === filter));
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
                    setPrompts(data.prompts);
                    return;
                }
            } catch {}
            setPrompts(filter === "ALL" ? allPrompts : allPrompts.filter((p) => p.category === filter));
        }
        refilter();
    }, [filter]);

    async function addPrompt() {
        const usedCategory = category.trim();
        if (!usedCategory || !title.trim() || !content.trim()) return;
        try {
            const res = await fetch(`/api/prompts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category: usedCategory, title: title.trim(), content: content.trim() }) });
            if (res.ok) {
                await refetchAll();
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
        }
        setTitle("");
        setContent("");
    }

    async function removePrompt(id: string) {
        try {
            const res = await fetch(`/api/prompts?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
            if (res.ok) {
                await refetchAll();
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
            <section className="space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
                <div className="mx-auto px-4 max-w-[1200px] grid gap-6">
                    <Card className="p-4">
                        <h3 className="font-bold mb-3">提示词库</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <div>
                                    <label className="text-xs text-muted-foreground">选择分类</label>
                                    <Select
                                        value={category}
                                        onValueChange={(v) => {
                                            if (v === "__ADD__") {
                                                setTimeout(() => setAddCatOpen(true), 0);
                                            } else {
                                                setCategory(v);
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="h-8 text-[13px]">
                                            <SelectValue placeholder="选择已有分类或新建" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.length === 0 && (
                                                <SelectItem value="NONE" disabled>暂无分类</SelectItem>
                                            )}
                                            {categories.map((c) => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                            <SelectItem value="__ADD__">新建分类…</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {addCatOpen && (
                                        <div className="mt-2 grid gap-2 border rounded-md p-2 bg-muted/30">
                                            <Input
                                                value={addCatName}
                                                onChange={(e) => setAddCatName(e.target.value)}
                                                className="h-8 text-[13px]"
                                                placeholder="输入分类名称"
                                            />
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" className="h-8 px-3 text-[13px]" onClick={() => { setAddCatOpen(false); setAddCatName(""); }}>取消</Button>
                                                <Button
                                                    size="sm"
                                                    className="h-8 px-3 text-[13px]"
                                                    onClick={() => {
                                                        const name = addCatName.trim();
                                                        if (!name) return;
                                                        setCategories((prev) => Array.from(new Set([name, ...prev])).sort((a, b) => a.localeCompare(b)));
                                                        setCategory(name);
                                                        setAddCatName("");
                                                        setAddCatOpen(false);
                                                    }}
                                                >
                                                    确定
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">标题</label>
                                    <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 text-[13px]" placeholder="提示词标题" />
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground">内容</label>
                                    <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} placeholder="完整提示词内容" />
                                </div>
                                <div>
                                    <Button size="sm" className="h-8 px-4 text-[13px]" onClick={addPrompt}>新增提示词</Button>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <div>
                                    <label className="text-xs text-muted-foreground">按分类筛选</label>
                                    <Select value={filter} onValueChange={setFilter}>
                                        <SelectTrigger className="h-8 text-[13px]">
                                            <SelectValue placeholder="全部分类" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ALL">全部</SelectItem>
                                            {categories.map((c) => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
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
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
