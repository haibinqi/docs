import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Plus, Search, Sparkles, Trash2, Save } from "lucide-react";
import { getPrompts, savePrompt, deletePrompt, type PromptItem } from "@/lib/prompts-storage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <div className="flex-1 w-full bg-background flex min-h-0 h-[calc(100vh-8rem)] border rounded-lg overflow-hidden mt-[5px]">
            {/* 左侧：新增提示词 (侧边栏风格) */}
            <div className="w-[300px] border-r bg-muted/10 flex flex-col shrink-0">
                <div className="h-12 px-4 border-b flex items-center justify-between bg-muted/30">
                    <span className="font-medium text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        新增提示词
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground font-medium">分类</label>
                        <div className="flex flex-col gap-2">
                            <Select
                                value={categories.includes(category) ? category : (category ? "__NEW__" : "")}
                                onValueChange={(v) => {
                                    if (v !== "__NEW__") {
                                        setCategory(v);
                                    } else {
                                        setCategory("");
                                    }
                                }}
                            >
                                <SelectTrigger className="h-8 text-[13px]">
                                    <SelectValue placeholder="选择分类" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                    <SelectItem value="__NEW__">+ 新建分类</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="h-8 text-[13px]"
                                placeholder="输入分类名称"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground font-medium">标题</label>
                        <Input 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="h-8 text-[13px]" 
                            placeholder="提示词标题" 
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground font-medium">内容</label>
                        <Textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            rows={10} 
                            className="resize-none text-[13px]"
                            placeholder="输入完整提示词内容..." 
                        />
                    </div>
                    <Button size="sm" className="w-full h-8 text-[13px]" onClick={addPrompt}>
                        <Save className="w-3.5 h-3.5 mr-2" />
                        保存提示词
                    </Button>
                    
                    {notice && (
                         <Alert className="py-2">
                            <AlertDescription className="text-xs text-center">{notice}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>

            {/* 右侧：提示词列表 */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="h-12 px-4 border-b flex items-center justify-between bg-muted/30">
                     <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">提示词库</span>
                        <span className="text-xs text-muted-foreground ml-2">({prompts.length})</span>
                     </div>
                     <div className="flex items-center gap-3 w-[400px]">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="搜索提示词..."
                                className="w-full h-8 pl-8 text-[13px] bg-background"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="w-[140px] h-8 text-[13px]">
                                <SelectValue placeholder="全部分类" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">全部分类</SelectItem>
                                {categories.map((c) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                     </div>
                </div>

                <div className="flex-1 overflow-y-auto p-0">
                    {prompts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                            <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                            <p className="text-sm">暂无提示词，请在左侧添加</p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {prompts.map((p) => (
                                <div key={p.id} className="p-4 flex items-start justify-between gap-4 hover:bg-muted/30 transition-colors group">
                                    <div className="space-y-1 min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                {p.category}
                                            </span>
                                            <h4 className="font-medium text-sm truncate">{p.title}</h4>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {p.content}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            className="h-7 w-7" 
                                            title="复制内容"
                                            onClick={() => { 
                                                navigator.clipboard.writeText(p.content); 
                                                setNotice("内容已复制"); 
                                                setTimeout(() => setNotice(""), 2000); 
                                            }}
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-7 px-2 text-xs">查看</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[640px]">
                                                <DialogHeader>
                                                    <DialogTitle>{p.title}</DialogTitle>
                                                </DialogHeader>
                                                <div className="mt-4 p-4 bg-muted/30 rounded-md text-sm whitespace-pre-wrap max-h-[60vh] overflow-y-auto font-mono">
                                                    {p.content}
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            title="删除"
                                            onClick={() => removePrompt(p.id)}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
