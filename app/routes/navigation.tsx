import { Link } from "@remix-run/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, PenTool, LayoutTemplate, Github, CableCar, Settings, Network, Server ,FlaskConical} from "lucide-react";

interface SiteItem {
  title: string;
  description: string;
  url: string;
  icon?: React.ElementType; // Icon is now optional
  category: string;
  isExternal?: boolean;
}

const sites: SiteItem[] = [
  // 本地功能
  {
    title: "知识库",
    description: "浏览我的个人笔记和文档集合",
    url: "/docs",
    icon: BookOpen,
    category: "本站功能",
  },
  {
    title: "提示词库",
    description: "AI 提示词管理与分享工具",
    url: "/tools/prompts",
    icon: PenTool,
    category: "本站功能",
  },
  {
    title: "动画演示",
    description: "科学原理动画演示与教学",
    url: "/animations",
    icon: LayoutTemplate,
    category: "本站功能",
  },
  // 系统软件
  {
    title: "VS Code",
    description: "最强大的代码编辑器",
    url: "https://code.visualstudio.com/",
    icon: Settings,
    category: "系统软件",
    isExternal: true,
  },
  {
    title: "Docker",
    description: "容器化应用平台",
    url: "https://www.docker.com/",
    icon: Server,
    category: "系统软件",
    isExternal: true,
  },
  // 网络工具
  {
    title: "Cloudflare",
    description: "全球网络安全与性能加速",
    url: "https://www.cloudflare.com/",
    icon: Network,
    category: "网络工具",
    isExternal: true,
  },
  {
    title: "IP Check",
    description: "查看当前 IP 地址信息",
    url: "https://ip.sb/",
    icon: Network,
    category: "网络工具",
    isExternal: true,
  },
  // 开源工具
  {
    title: "GitHub",
    description: "全球最大的开源代码托管平台",
    url: "https://github.com/",
    icon: Github,
    category: "开源工具",
    isExternal: true,
  },
  {
    title: "Remix",
    description: "全栈 Web 框架",
    url: "https://remix.run/",
    icon: LayoutTemplate,
    category: "开源工具",
    isExternal: true,
  },
  {
    title: "ChatGPT",
    description: "智能对话 AI 助手",
    url: "https://chat.openai.com/",
    icon: FlaskConical,
    category: "AI工具",
    isExternal: true,
  },
  {
    title: "lucide图标库",
    description: "图标库",
    url: "https://lucide.dev/icons/",
    icon: CableCar,
    category: "素材资源",
    isExternal: true,
  }
];

const categories = ["全部", "本站功能", "系统软件", "网络工具", "开源工具", "AI工具", "素材资源"];

export default function Index() {
  return (
    <div className="container py-10 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-10 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          首页导航站
        </h1>
      </div>

      <Tabs defaultValue="全部" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="h-auto flex-wrap justify-center gap-2 bg-transparent">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ring-1 ring-inset ring-border"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sites
                .filter((site) => category === "全部" || site.category === category)
                .map((site, index) => (
                  <a
                    key={index}
                    href={site.url}
                    target={site.isExternal ? "_blank" : undefined}
                    rel={site.isExternal ? "noopener noreferrer" : undefined}
                    className="group block h-full"
                  >
                    <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-muted/60 hover:border-primary/50">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            {site.icon ? (
                              <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                <site.icon className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                <span className="h-4 w-4 flex items-center justify-center text-xs font-bold">
                                  {site.title.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <CardTitle className="text-sm font-medium truncate">
                              {site.title}
                            </CardTitle>
                          </div>
                          {site.isExternal && (
                            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-30 shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <CardDescription className="text-xs line-clamp-2 min-h-[2rem] mb-2">
                          {site.description}
                        </CardDescription>
                        <div className="flex justify-end">
                          <Badge variant="secondary" className="text-[9px] px-1.5 h-4 font-normal text-muted-foreground bg-muted/50">
                            {site.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
