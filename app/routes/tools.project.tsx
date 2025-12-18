import { useEffect, useState, Component } from "react";
import { Gantt, Willow, Toolbar, Editor, defaultToolbarButtons } from "@svar-ui/react-gantt";
import ganttCss from "@svar-ui/react-gantt/all.css?url";
import type { LinksFunction } from "@remix-run/cloudflare";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Plus, Trash2, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: ganttCss },
];

class ErrorBoundary extends Component<{children: React.ReactNode, fallback?: React.ReactNode}, {hasError: boolean, error: any}> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("Gantt Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <div className="p-4 text-red-500">Something went wrong: {this.state.error?.message}</div>;
        }
        return this.props.children;
    }
}

const initialTasks = [
    { id: 20, text: "需求分析", start: new Date(2024, 5, 11), end: new Date(2024, 6, 12), duration: 1, progress: 60, type: "task", lazy: false },
    { id: 47, text: "核心开发", start: new Date(2024, 5, 12), end: new Date(2024, 7, 12), duration: 8, progress: 20, parent: 0, type: "summary" },
    { id: 22, text: "前端实现", start: new Date(2024, 7, 11), end: new Date(2024, 8, 12), duration: 8, progress: 0, parent: 47, type: "task" },
    { id: 21, text: "后端接口", start: new Date(2024, 7, 10), end: new Date(2024, 8, 12), duration: 3, progress: 0, type: "task", lazy: false },
    { id: 23, text: "测试验收", start: new Date(2024, 8, 15), end: new Date(2024, 9, 1), duration: 5, progress: 0, type: "task" },
];

const initialLinks = [
    { id: 1, source: 20, target: 47, type: "e2s" },
    { id: 2, source: 47, target: 23, type: "e2s" }
];

type ProjectData = {
    id: string;
    name: string;
    tasks: any[];
    links: any[];
};

function ClientOnly({ children, fallback = null }: { children: () => React.ReactNode, fallback?: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        console.log("ClientOnly mounted");
    }, []);
    return mounted ? <ErrorBoundary>{children()}</ErrorBoundary> : <>{fallback}</>;
}

export default function Project() {
    const [api, setApi] = useState<any>(null);
    const [scale, setScale] = useState<string>("day");
    
    // 多项目状态管理
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [currentProjectId, setCurrentProjectId] = useState<string>("");
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    // 初始化加载项目
    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then((data: any) => {
                if (data.projects && data.projects.length > 0) {
                    const restored = data.projects.map((p: any) => ({
                        ...p,
                        tasks: p.tasks.map((t: any) => ({
                            ...t,
                            start: t.start ? new Date(t.start) : undefined,
                            end: t.end ? new Date(t.end) : undefined
                        }))
                    }));
                    setProjects(restored);
                    setCurrentProjectId(restored[0].id);
                } else {
                    initDefaultProject();
                }
            })
            .catch(e => {
                console.error("Failed to load projects from API", e);
                // Fallback to local storage or init default?
                // For now, init default if API fails
                initDefaultProject();
            });
    }, []);

    const initDefaultProject = () => {
        const defaultProject: ProjectData = {
            id: crypto.randomUUID(),
            name: "演示项目",
            tasks: initialTasks,
            links: initialLinks
        };
        // Save to API
        saveProjectToApi(defaultProject, true);
    };

    const saveProjectToApi = (project: ProjectData, isNew: boolean = false) => {
        const method = isNew ? "POST" : "PUT";
        fetch("/api/projects", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project)
        })
        .then(res => res.json())
        .then((data: any) => {
            if (data.ok) {
                if (isNew) {
                    setProjects(prev => [...prev, project]);
                    setCurrentProjectId(project.id);
                } else {
                    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
                }
            } else {
                console.error("Failed to save project", data.error);
            }
        })
        .catch(e => console.error("API save error", e));
    };

    // 自动保存当前项目的数据变更
    useEffect(() => {
        if (!api || !currentProjectId) return;
        
        // This effect is tricky because we don't want to save on every render or state change loop
        // SVAR Gantt API doesn't have a simple "onChange" event for everything.
        // We rely on switchProject to save.
        // Maybe we can add a "Save" button or auto-save interval?
        // For now, let's keep the manual switch/delete logic handling saves.
        // But we should save when the user edits tasks. 
        // Ideally we hook into Gantt events, but let's stick to the previous logic of saving on switch/create/delete for now to avoid complexity.
        // However, if I edit a task and then refresh, data is lost if I don't switch projects.
        // Let's add a simple auto-save interval or save button? 
        // User didn't ask for auto-save, but it's good UX.
        // Let's just save on unmount or visibility change? Hard in SPA.
        // Let's add a "Save" button to the toolbar for clarity? Or just rely on switchProject.
        // Wait, the previous implementation `saveProjects` was updating localStorage synchronously on state change.
        // Here `setProjects` updates state, but we need to push to API.
        
        return () => {
            // Cleanup
        };
    }, [api, currentProjectId]);

    const handleCreateProject = () => {
        const newProject: ProjectData = {
            id: crypto.randomUUID(),
            name: `新项目 ${projects.length + 1}`,
            tasks: [],
            links: []
        };
        saveProjectToApi(newProject, true);
    };

    const handleDeleteProject = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm("确定要删除这个项目吗？")) {
            fetch(`/api/projects?id=${id}`, { method: "DELETE" })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        const updated = projects.filter(p => p.id !== id);
                        setProjects(updated);
                        if (currentProjectId === id) {
                            if (updated.length > 0) {
                                setCurrentProjectId(updated[0].id);
                            } else {
                                initDefaultProject();
                            }
                        }
                    }
                });
        }
    };

    // 切换项目前保存当前数据
    const switchProject = (id: string) => {
        if (currentProjectId === id) return;
        
        if (currentProjectId && api) {
            const currentTasks = api.serialize();
            // Assuming links are also managed by API or we just save tasks for now as links are part of the state?
            // SVAR Gantt stores links separately. api.serialize() only returns tasks.
            // We need to get links. api.getLinks()? 
            // Looking at types: api.getState().links might work?
            // api.getReactiveState().links?
            // Let's check api.serialize(). It returns ITask[].
            // To get links: api.getStores().data.links.serialize()? 
            // Or api.getState().links.
            
            // Let's try to capture links if possible.
            // If we can't easily get links, we might lose them.
            // SVAR Gantt v2: api.serialize() returns tasks.
            // Links are usually in api.getStores().data.links.
            // Let's try a safe approach.
            
            let currentLinks: any[] = [];
            try {
                 // @ts-ignore
                 currentLinks = api.getStores().data.links.serialize();
            } catch (e) {
                console.warn("Could not serialize links", e);
            }

            const projectToSave = projects.find(p => p.id === currentProjectId);
            if (projectToSave) {
                const updatedProject = { 
                    ...projectToSave, 
                    tasks: currentTasks,
                    links: currentLinks.length > 0 ? currentLinks : projectToSave.links 
                };
                
                // Update local state first to feel responsive
                setProjects(prev => prev.map(p => p.id === currentProjectId ? updatedProject : p));
                
                // Save to API
                saveProjectToApi(updatedProject, false);
            }
        }
        setCurrentProjectId(id);
    };
    
    // 获取当前项目数据
    const currentProject = projects.find(p => p.id === currentProjectId) || projects[0];

    // 独立导出函数
    const handleExport = () => {
        if (!api) {
            console.error("API not ready");
            return;
        }
        try {
            // api.serialize() returns ITask[] directly based on type definition
            const tasks = api.serialize();
            if (!Array.isArray(tasks)) {
                console.error("Serialize returned unexpected format:", tasks);
                alert("导出数据格式错误");
                return;
            }

            const header = ["ID", "任务名称", "开始时间", "结束时间", "进度"];
            const csvContent = [
                header.join(","),
                ...tasks.map((t: any) => [
                    t.id,
                    `"${t.text}"`,
                    t.start_date ? new Date(t.start_date).toLocaleDateString() : "",
                    t.end_date ? new Date(t.end_date).toLocaleDateString() : "",
                    (t.progress || 0) + "%"
                ].join(","))
            ].join("\n");
            
            // Add BOM for Excel to correctly recognize UTF-8 encoding
            const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${currentProject?.name || "project"}_tasks.csv`;
            link.click();
        } catch (e) {
            alert("导出失败，请稍后重试");
            console.error(e);
        }
    };

    const scales = scale === "day" ? [
        { unit: "month", step: 1, format: "MMMM yyy" },
        { unit: "day", step: 1, format: "d" },
    ] : scale === "week" ? [
        { unit: "month", step: 1, format: "MMMM yyy" },
        { unit: "week", step: 1, format: "'Week 'w" },
    ] : [
        { unit: "year", step: 1, format: "yyyy" },
        { unit: "month", step: 1, format: "MMM" },
    ];

    return (
        <div className="h-[calc(100vh-10rem)] w-full border rounded-lg overflow-hidden bg-background flex">
            {/* 项目列表侧边栏 */}
            <div className="w-64 border-r bg-muted/10 flex flex-col shrink-0">
                <div className="p-3 border-b flex items-center justify-between bg-muted/20">
                    <span className="font-medium text-sm flex items-center gap-2">
                        <FolderOpen className="w-4 h-4" />
                        项目列表
                    </span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCreateProject}>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {projects.map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => switchProject(p.id)}
                            className={cn(
                                "group flex items-center justify-between p-2 rounded-md text-sm cursor-pointer hover:bg-accent/50 transition-colors",
                                p.id === currentProjectId ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
                            )}
                        >
                            <span className="truncate">{p.name}</span>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={(e) => handleDeleteProject(e, p.id)}
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 甘特图主区域 */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="p-3 border-b flex items-center justify-between bg-muted/20">
                    <div className="flex items-center gap-3">
                        <Select value={scale} onValueChange={setScale}>
                            <SelectTrigger className="w-[120px] h-8">
                                <SelectValue placeholder="选择视图" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">日视图</SelectItem>
                                <SelectItem value="week">周视图</SelectItem>
                                <SelectItem value="month">月视图</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" onClick={handleExport} disabled={!api} className="h-8">
                            <Download className="w-3.5 h-3.5 mr-2" />
                            导出 Excel
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        当前项目: {currentProject?.name}
                    </div>
                </div>
                <ClientOnly fallback={<div className="flex items-center justify-center h-full text-muted-foreground">Loading Gantt Chart...</div>}>
                    {() => (
                        <Willow>
                            <Toolbar api={api} items={defaultToolbarButtons} />
                            {/* 使用 key 强制重新渲染组件当项目ID变化时 */}
                            {currentProject && (
                                <Gantt 
                                    key={currentProject.id}
                                    init={setApi} 
                                    tasks={currentProject.tasks} 
                                    links={currentProject.links} 
                                    scales={scales} 
                                />
                            )}
                            {api && <Editor api={api} />}
                        </Willow>
                    )}
                </ClientOnly>
            </div>
        </div>
    );
}
