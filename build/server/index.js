import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, useLocation, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, useLoaderData, Form, redirect, useFetcher, useMatches } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { Sun, Moon, ChevronDown, Github, Info, QrCode, Map as Map$1, ShieldCheck, ClipboardCheck, ChevronRight, AlertTriangle, Users, BarChart3, MessageSquare, HelpCircle, Home, Trash2, X, ChevronUp, Check, Plus, Save, Sparkles, Search, Copy, FileText, FlaskConical, BookOpen, PenTool, LayoutTemplate, Settings, Server, Network, CableCar, ExternalLink, Settings2, Calculator, Printer, ArrowRight } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon, CheckIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { json, redirect as redirect$1 } from "@remix-run/cloudflare";
import { json as json$1 } from "@remix-run/node";
import { marked } from "marked";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }),
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (typeof isbot === "function" && isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.toggle("dark", true);
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: toggleTheme,
      className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10",
      children: [
        /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
        /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
      ]
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotFilledIcon, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function MainNav() {
  const location = useLocation();
  const pathname = location.pathname;
  return /* @__PURE__ */ jsxs("div", { className: "mr-4 hidden md:flex", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mr-6 flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "hidden font-bold sm:inline-block", children: "Haibin" }) }),
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-4 text-sm lg:gap-6", children: [
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: cn(
          "flex items-center gap-1 transition-colors hover:text-foreground/80 focus:outline-none",
          pathname === "/" || pathname.startsWith("/quality") ? "text-foreground" : "text-foreground/60"
        ), children: [
          "仪表盘 ",
          /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" })
        ] }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", children: [
          /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "运营综合管理" }) }),
          /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/quality/ehs-hop", children: "质检 (EHS & HOP)" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/docs",
          className: cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/docs") ? "text-foreground" : "text-foreground/60"
          ),
          children: "文档"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/tools/prompts",
          className: cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/tools") ? "text-foreground" : "text-foreground/60"
          ),
          children: "工具"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/animations",
          className: cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/animations") ? "text-foreground" : "text-foreground/60"
          ),
          children: "动画"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/navigation",
          className: cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/navigation") ? "text-foreground" : "text-foreground/60"
          ),
          children: "导航"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/about",
          className: cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith("/about") ? "text-foreground" : "text-foreground/60"
          ),
          children: "关于"
        }
      )
    ] })
  ] });
}
function SiteHeader() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container flex h-14 max-w-screen-2xl items-center px-4", children: [
    /* @__PURE__ */ jsx(MainNav, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-between space-x-2 md:justify-end", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex-1 md:w-auto md:flex-none" }),
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "https://github.com/qihaibin/docs",
            target: "_blank",
            rel: "noreferrer",
            children: /* @__PURE__ */ jsxs("div", { className: "inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground", children: [
              /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "GitHub" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(ThemeToggle, {})
      ] })
    ] })
  ] }) });
}
const tailwindHref = "/assets/tailwind.css";
const headers = () => ({
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0"
});
const links = () => [
  { rel: "stylesheet", href: tailwindHref },
  { rel: "icon", href: "/favicon.ico" }
];
async function loader$7({ request }) {
  try {
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader == null ? void 0 : cookieHeader.includes("sidebar:state=false")) {
      return json({ defaultOpen: false });
    }
    return json({ defaultOpen: true });
  } catch {
    return json({ defaultOpen: true });
  }
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("meta", { httpEquiv: "Cache-Control", content: "no-cache, no-store, must-revalidate" }),
      /* @__PURE__ */ jsx("meta", { httpEquiv: "Pragma", content: "no-cache" }),
      /* @__PURE__ */ jsx("meta", { httpEquiv: "Expires", content: "0" }),
      /* @__PURE__ */ jsx("meta", { name: "build-time", content: (/* @__PURE__ */ new Date()).toISOString() }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "h-full bg-background font-sans antialiased overflow-y-scroll", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col bg-background", children: [
        /* @__PURE__ */ jsx(SiteHeader, {}),
        /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col", children })
      ] }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
function ErrorBoundary$1() {
  const error = useRouteError();
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("title", { children: "Oh no!" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-screen bg-background font-sans antialiased p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "Application Error" }),
        /* @__PURE__ */ jsx("div", { className: "bg-destructive/10 text-destructive p-4 rounded-md border border-destructive/20", children: isRouteErrorResponse(error) ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold", children: [
            error.status,
            " ",
            error.statusText
          ] }),
          /* @__PURE__ */ jsx("p", { children: error.data })
        ] }) : error instanceof Error ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Error" }),
          /* @__PURE__ */ jsx("p", { className: "font-mono mt-2", children: error.message }),
          /* @__PURE__ */ jsx("pre", { className: "mt-4 p-2 bg-black/5 rounded text-xs overflow-auto", children: error.stack })
        ] }) : /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Unknown Error" }) })
      ] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  Layout,
  default: App,
  headers,
  links,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
function AnimationsIndex() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-full flex-col items-center justify-center space-y-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "欢迎使用动画演示" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: '请从左侧列表选择一个动画，或者点击 "+" 号添加新动画。' })
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AnimationsIndex
}, Symbol.toStringTag, { value: "Module" }));
const __vite_glob_0_0 = "NotebookLM 通用生成PPT技巧\r\n\r\n### 步骤1：把你的资料丢进去（越多越好）\r\n\r\nNotebookLM 的核心不是模板，而是“阅读能力”。你可以导入：文章/PDF/会议纪要/采访稿/自己写的笔记/网页内容\r\n👉 它会自动总结关键点；\r\n👉 自动提炼逻辑结构；\r\n👉 自动转换成清晰的大纲。\r\n\r\n### 步骤2：一句话让它自动写出 PPT 大纲\r\n示例 Prompt：“请帮我根据以上内容，生成一个 10 页的 PPT 大纲。包含标题页、核心观点、数据亮点、案例说明、总结行动点。”\r\nNotebookLM 会自动生成结构非常清晰的大纲，让你省下 90% 的准备时间。\r\n\r\n### 步骤 3：一键导出成 PPT（最强功能）\r\n你只需要说：“根据这个大纲生成 PPT 内容，并建议每页展示方式。”\r\n它会自动输出：每页的标题/文案框架/图表建议/图片建议/页面结构，你只需要导入 Gamma / PPT / Canva 就能瞬间做出成品。\r\n\r\n这才是 NotebookLM 最强大的地方：它不是做 PPT，而是给你准备好了一个能直接排版的“完整方案”。\r\n\r\n🌈🌈划重点，我建议你这样用：\r\n✔ 如果你有大量资料 → 用 NotebookLM 做总结\r\n✔ 如果你想快速做 PPT → NotebookLM 做大纲 + Gamma 做排版\r\n✔ 如果你想做深度内容 → NotebookLM 是最强的“结构化工具”\r\n你会发现：\r\n越复杂、越深度的内容，它越强。\r\n";
const __vite_glob_0_1 = "---\r\ntitle: Antigravity登入\r\n---\r\n\r\n### 下载安装\r\n### 登入\r\n\r\n会遇到跳转到浏览器登入后跳转不回IDE的场景，接下来的步骤是：\r\n\r\n* https://policies.google.com/country-association-form?pli=1，到此链接把归属地改到美国\r\n\r\n* 梯子打开TUN模式\r\n\r\n\r\n";
const __vite_glob_0_2 = "";
const __vite_glob_0_3 = "## 一、目的\r\n\r\n通过制定仓库的管理制度及操作流程规定,指导和规范仓库人员的日常工作行为，对有效提高工作效率起到激励作用。\r\n\r\n## 二、适用范围\r\n\r\n仓库的所用工作人员\r\n\r\n## 三、职责\r\n\r\n- 仓库主管负责仓库一切事务的安排和管理,协调部门间的事务和传达与执行上级下达的任务，培训和提高仓库人员行为规范及工作效率。\r\n- 仓管员负责物料的收料、报检、入库、发料、退料、储存、防护工作。\r\n- 仓务员负责单据追查、保管、入帐。\r\n- 仓库杂工负责货物的装卸、搬运、包装等工作。\r\n- 仓库主管、IQC、采购共同负责对原材料的检验、不良品处置方式的确定和废弃物的处置工作。\r\n\r\n## 四、仓储管理规定\r\n\r\n### 1、原材料收货及入库\r\n\r\n- 需严格按照 “收货入库单”的流程进行作业。\r\n- 采购员将“客户送货单”给到仓库后，仓库需将此物料放在指定的检验区内，作好防护措施。\r\n- 仓库收货时需要求采购人员给到“客户送货单”，没有时需追查，直到拿到单据为止，仓库人员有追查和保管单据的责任。\r\n- 仓库收货时的原材料必须有物料部门提供的采购订单(或者说PO)，否则拒绝收货。\r\n- 仓库人员与采购共同确认送货单的数量和实物,如不符由采购人员联系供货商处理，并由采购人员在送货单签字确认实收数量。\r\n- 仓库人员对已送往仓库的原材料及时通知IQC进行物料品质检验。\r\n- 对IQC检验的合格原材料进行开“物料入库单”并经仓库主管签名确认后进仓对不合格原材料进行退货。\r\n- 仓库原则上当天送来的原材料当天处理完毕，如有特殊最迟不得超过一个星期。\r\n- 仓库对已入库的原材料进行分区分类摆放，不得随意堆放，如有特殊情况需在当天内完成。\r\n- 仓库对不合格的原材料放在指定的退货区，由仓库主管、采购共同确定退货。\r\n\r\n### 2、原材料出库\r\n\r\n- 需严格按照“物料领料单”、“生产通知单”、“开发部调用单”的流程进行操作。\r\n- 仓库的生产原材料出库依据是物料部门提供的BOM(即单件用量通知单)，生产通知单中生产数量,及厂部所规定的原材料损耗进行核料,并由部长签名确认。\r\n- 仓库把所出库之原材料配好，并填好“物料领料单”后，通知相关的领料部门进库领料，并由领料部门负责人签名确认后方可让原材料出库。\r\n- 仓库出库物料的原则是同一原材料做到先进先出。\r\n- 超用物料的出库必须依据由生产部长签名确认“领用超单”，且超用人注明了超用原因，以及得到上级主管部门的批准的“领用超用单”，仓库方可发料。\r\n- 开发部门的物料调用依据是由开发部门填写“调用单”，并由开发部负责人签名确认，并经物料部门同意后，仓库才可以依此办理相关手续，否则予与拒绝。\r\n- 仓库任何人员都无权给没有办理相关手续的原材料出库。\r\n\r\n### 3、退厂原材料的处理\r\n\r\n- 需严格按照“退厂物料通知单”进行操作。\r\n- 对采购来的不良物料需要及时通知采购部,并由采购部给予处理意见且签名确认后，可暂放仓库，待采购部把原材料退与供应商。·\r\n- 对于不良原材料不可以办理出入库用续。\r\n\r\n### 4、原材料报废\r\n\r\n- 严格执行 “报废单”进行操作\r\n- 发现仓库库存物料不良时及时处理或通知上级主管部门处理。\r\n- 需要区别分开库存物料报废、来料不良的报废部分、客户退回的报废物料，并且分开保管。\r\n\r\n### 5、成品的收货及出库\r\n\r\nA.成品的收货及入库\r\n\r\n- 严格按照 “成品入库单”进行操作\r\n- 所有入库之成品必须为合格之产品，并由终查(即 QA)提供QC报告之允许入库的成品，否则拒绝入库。\r\n- 入库成品随货提供产品的数量，码数，颜色，款号，单价等信息的送货单，对产品与单不符的不予办理入库手续。\r\n- 对合格产品且与送货单一致的及时办理入库手续。并按要求存放好。\r\n\r\nB.成品的出货\r\n\r\n- 严格按照 “成品出货单”进行操作。\r\n- 成品出货的依据是由营销部提供“客户货物配送单”，进行检货，并把检好成品进行包装。\r\n- 对于即将出库之成品通知营销部，由营销部签名确认,并办理相关出库手续后方可发货。\r\n\r\nC.成品的退货\r\n\r\n- 严格按照“成品退货单”进行操作\r\n- 由客户退回之不合格产品进行核对款号、颜色、码数、数量无误后，办理相关的退货手续。\r\n- 客户退回之不合格产品及时通知生产部进行维修，尽快返还客户。\r\n\r\n## 五、货物管理\r\n\r\n- 货物的品质维护:物料在收货、点数、入库、搬运、摆放、归位、存放、储存、发货过程中遵守安全原则，做到防损、防水、防蛀、防晒等安全措施。\r\n- 每天检查货物信息，如发现储位不对、帐物不符、品质问题及时反馈和处理。\r\n- 保持货物的正确标示，由仓管负责，对于错误标示及时更正。\r\n- 货物的单据、咭、帐由仓库记帐人把电子档和手工单据一同交到财务。每月的单据由其分类保管好，原则上单据保管2年，在此期间不得销毁。做到帐、物、咭-致。\r\n\r\n## 六、货物的盘点\r\n\r\n- 仓库货物盘点由财务、仓库以及主管部门拟定盘点计划时间表和盘点流程。\r\n- 盘点过程中需要其他相关部门予以配合,需入库和发料统一按内部盘点安排操作。\r\n- 盘点时保证做到盘点数量的准确性、公正性，严禁弄虚作假、虚报数据。盘点过程中严禁更换不同的盘点人员，以免少盘、多盘、漏盘等。\r\n- 盘点分初盘、复盘，但所有的盘点数据都需盘点人员签名确认。\r\n\r\n## 七、仓库的安全、卫生管理\r\n\r\n- 仓库每天都对仓库区域进行清洁整理工作,清理掉不要、不用的东西和坏的东西，并将仓库内的物料整理到提定的区域内，达到整洁、整齐、干净、卫生、合理的摆放要求。\r\n- 对仓库内货物摆放做出合理的摆放和规划。\r\n- 仓库卫生可以在仓库空闲的时间进行。\r\n- 仓库内保持安全通道畅通，不可有堆积物，保证人员安全。\r\n- 仓库内严禁烟火，严禁非仓库人员非工作需要进入仓库。\r\n- 仓库内的规划区域要有明确标识(如:物料摆放区、安全通道、物料报废区、物料发放区、配料区、不合格物料存放区、待检物料存放区、消防设施摆放区、办公区等)，其中物料摆放区内要分类分小区存放，且有清楚的标识。\r\n- 上下班关闭窗户及锁上仓库门。\r\n- 做好及时检查物货，如有异常或者安全隐患及时处理和上报。\r\n- 仓库内需要高空作业时做好安全防范。\r\n\r\n## 八、人员的工作态度及作风\r\n\r\n- 仓库人员的工作态度及作风仓库工作人员应该培养良好的工作态度和作风，形成良好的工作习惯。\r\n- 仓库工作人员要求做事细心，认真，负责，诚实,有良好的团队意识及职业道德。\r\n- 对于上级下达的任务要按时按质完成。\r\n- 其他的工作制度和行为准则依厂部规定为准则。\r\n\r\n放得进-库容规划 良好的规划可以根据存放不同性质和规格的物料能够有计划的预留存储空间\r\n\r\n拿得出-通道顺畅 保持能够顺畅进出物料的通道，是仓库实现高效管理的必经之路\r\n\r\n现场好-注重仓库 5S 5S 能提升仓库的工作效率、减少浪费、确保安全并营造一个整洁有序的仓库环境\r\n\r\n常检查-管理落实 制定一套规则、流程、制度是容易的但能够落实才是管理好的关键\r\n\r\n找得到-分类清晰\r\n\r\n账物符-数量准确 仓库里实物数量和账面不一致的话对生产、销售乃至整个企业运作都会造成困扰\r\n\r\n重安全-安全第一 确保仓库安全不仅关乎员工的人身安全，也关系到企业的财产安全和业务连续性\r\n\r\n做保障-无缝对接 仓库在整个生产链条中的角色是保障和服务部门，仓库的工作要围绕生产展开，确保一切顺畅";
const __vite_glob_0_4 = "### 核心区别\r\n\r\n| **维度**     | **正排 (正序排程)**             | **倒排 (倒序排程)**            |\r\n| ------------ | ------------------------------- | ------------------------------ |\r\n| **起点**     | 从订单接收/生产开始时间正向推算 | 从订单交付截止时间反向推算     |\r\n| **优先级**   | 资源利用率优先                  | 交期保障优先                   |\r\n| **时间轴**   | 当前时间 → 未来时间             | 交付截止时间 → 当前时间        |\r\n| **产能约束** | 可能因资源不足延后交期          | 可能因资源不足需要调整生产策略 |\r\n\r\n### 应用场景对比\r\n\r\n正排适用场景\r\n\r\n- 产能有限时优化资源分配\r\n- 长周期生产项目（如飞机制造）\r\n- 按批次生产的流程型制造\r\n- 原料供应不稳定的情况\r\n\r\n倒排适用场景\r\n\r\n- 交期严格的关键订单\r\n- JIT（准时制）生产模式\r\n- 短周期快消品制造\r\n- 供应链响应敏捷的环境\r\n\r\n### 算法特性对比\r\n\r\n| **特性** | 正排                       | 倒排                        |\r\n| -------- | -------------------------- | --------------------------- |\r\n| 时间计算 | 前推法(Forward Scheduling) | 后推法(Backward Scheduling) |\r\n| 瓶颈处理 | 暴露产能缺口               | 强制满足交期                |\r\n| 灵活性   | 更适应常规生产节奏         | 更适合紧急订单处理          |\r\n| 缓冲设置 | 通常在工序间设置时间缓冲   | 更多在起始阶段预留安全时间  |\r\n\r\n混合排程策略\r\n\r\n### 现代APS系统常采用：\r\n\r\n1. **关键路径倒排**：对核心工序倒排\r\n2. **非关键路径正排**：辅助工序正排\r\n3. **动态缓冲调整**：根据实时产能变化自动优化";
const __vite_glob_0_5 = `---\r
title: 物料编码规则\r
date: 2025-12-16\r
---\r
\r
import myGif from './assets/image.gif';\r
\r
### 要点\r
\r
1. 一码多物与一物多码\r
2. 自动物料编码\r
3. 复杂物料编码\r
\r
\r
\r
### 物料编码问题\r
\r
我们常见企业通过体系文件定义、规范和宣传物料编码规则，使用 Excel 进行物料编码的申请或分配，管理它们的物料编码。在 BOM 与物料手动整理审核后，录入或导入到 ERP 系统，交给 ERP 系统进行使用和管理。然而，这种方式存在着诸多隐性或显性问题：\r
\r
这些问题便形成了企业普遍存在的一物多码、一码多物现象。这些问题不仅增加了企业的管理成本，还可能导致采购错误、库存混乱、成本核算不准确等问题，影响企业的运营效率和竞争力。\r
\r
### 物料编码管理\r
\r
物料编码是物料属性的一部分，设计工程师须在物料投入使用前定义完整。因此，物料的编码管理应采用前置管理、线上管理、自动化管理。ENOVIA 从设计源头对需要发布的物料进行系统申领、自动编码、自动校验、控制和管理。\r
\r
**1）标准功能支持**\r
\r
1. 支持管理员自定义企业物料编码公式\r
2. 支持多样字段类型自由组成\r
3. 各字段均支持包括：文本、自定义输入、属性、计数器（唯一）\r
\r
- 固定文本（如企业代号、分隔符）\r
- 自定义输入（灵活值）\r
- 属性（如定义的物料大类、小类、图样代号等属性）\r
- 计数器（可自增的流水号）\r
\r
示例：企业当前采用的物料编码规则是＜物料类别＞＜图样代号＞＜分隔符＞＜流水码＞，我们如何定义和使用？\r
\r
**编码规则：**根据分析，这是一个由 4 个字段定义拼接的物料编码结构，管理员按照该结构逐一添加并应用即可快速形成企业需要的编码规则。\r
\r
<img src={myGif} alt="演示动画" />\r
\r
**料号申请：**工程师申请物料编码时，系统将自动根据配置的编码公式生成，同时校验编码的唯一性，十分方便、准确和快捷。\r
\r
**2）复杂物料编码**\r
\r
企业因自身业务、管理需求的不同，有着各自特有的编码规则。面对多规则、高复杂性、高要求的物料编码管理，ENOVIA 可通过二次开发的方式在平台内进行实现。工程师可以更方便地进行在线物料编码的申请，如：用户可以将难以理解、记忆的数字或字母代号，设计成易于识别的文字描述形式，以增强工程师使用过程中的可阅读性与便捷度；支持用户同时申请不同规则的物料编码和工程图号等。如此，灵活性更高，更人性化，简单易用，可满足企业个性需求。`;
const __vite_glob_0_6 = "---\r\ntitle: Antigravity登入\r\n---\r\n\r\n\r\n#### 下载安装\r\n#### 登入\r\n    ##### 1. 修改google账号归属地到美国，https://policies.google.com/country-association-form?pli=1\r\n    ##### 2. 梯子TUN\r\n#### 运行Antigravity并使用google登入\r\n";
const __vite_glob_0_7 = "### notion\r\n\r\n```mermaid\r\nflowchart TB\r\n    U[你<br/>想法 / 需求 / 突发任务]\r\n\r\n    W[网站<br/>待办 & 项目看板<br/>行动中枢]\r\n    N[Notion<br/>项目主表 / 决策 / 复盘]\r\n    D[Google Drive<br/>文件 / 数据 / 输出物]\r\n\r\n    U -->|记录行动| W\r\n    W -->|关联项目| N\r\n    N -->|文件索引| D\r\n\r\n    W -.->|跳转| N\r\n    W -.->|跳转| D\r\n\r\n```\r\n\r\n\r\n待办\r\n```\r\nflowchart LR\r\n    A[新增事项出现] --> B{是否可执行?}\r\n\r\n    B -- 否 --> C[Notion<br/>想法 / 资料]\r\n    B -- 是 --> D[网站<br/>新增待办]\r\n\r\n    D --> E{是否已有项目?}\r\n\r\n    E -- 是 --> F[关联已有项目]\r\n    E -- 否 --> G[Notion 新建项目]\r\n    G --> H[Drive 新建项目文件夹]\r\n\r\n    F --> I[执行任务]\r\n    H --> I\r\n\r\n    I --> J{是否产生决策?}\r\n    J -- 是 --> K[Notion 记录决策]\r\n    J -- 否 --> L[继续执行]\r\n\r\n    K --> L\r\n    L --> M[任务完成]\r\n```\r\n\r\ndrive\r\n```\r\nflowchart TB\r\n    P1[项目想法] --> P2[Notion 创建项目]\r\n    P2 --> P3[定义目标 & 范围]\r\n\r\n    P3 --> P4[网站拆解待办]\r\n    P4 --> P5[执行中]\r\n\r\n    P5 -->|需求变化| P6[Notion 决策记录]\r\n    P6 --> P4\r\n\r\n    P5 --> P7{待办是否清零?}\r\n    P7 -- 否 --> P5\r\n    P7 -- 是 --> P8[项目完成]\r\n\r\n    P8 --> P9[Notion 复盘]\r\n    P9 --> P10[Drive 文件归档]\r\n\r\n```";
const __vite_glob_0_8 = "---\r\ntitle: 项目进度\r\n---\r\n\r\n# 项目进度\r\n\r\n## 本周完成\r\n\r\n- 完成了用户界面设计\r\n- 修复了登录问题\r\n\r\n## 下周计划\r\n\r\n- 开始后端开发\r\n- 编写测试用例\r\n";
const modules = /* @__PURE__ */ Object.assign({ "../../content/AI/notebooklm-guide.md": __vite_glob_0_0, "../../content/Google/anitvity登入问题.md": __vite_glob_0_1, "../../content/制造知识库/polars_len.md": __vite_glob_0_2, "../../content/制造知识库/仓库管理制度和流程.md": __vite_glob_0_3, "../../content/制造知识库/制造业高级排程中的正排与倒排对比.md": __vite_glob_0_4, "../../content/制造知识库/物料编码规则.mdx": __vite_glob_0_5, "../../content/学习/React学习笔记.md": __vite_glob_0_6, "../../content/学习/work_flow.md": __vite_glob_0_7, "../../content/工作/项目进度.md": __vite_glob_0_8 });
function parseFrontmatter(text) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = text.match(frontmatterRegex);
  if (match) {
    const frontmatterBlock = match[1];
    const content = text.slice(match[0].length).trim();
    const data = {};
    frontmatterBlock.split("\n").forEach((line) => {
      const [key, ...values] = line.split(":");
      if (key && values.length) {
        data[key.trim()] = values.join(":").trim();
      }
    });
    return { data, content };
  }
  return { data: {}, content: text };
}
const debugLogs = [];
function getAllNotes() {
  const notes = [];
  debugLogs.length = 0;
  for (const [path, rawContent] of Object.entries(modules)) {
    try {
      debugLogs.push(`Processing: ${path}`);
      const normalizedPath = path.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
      debugLogs.push(`Normalized: ${normalizedPath}`);
      const parts = normalizedPath.split("/");
      if (parts.length < 3) {
        debugLogs.push("SKIPPED: Parts < 3");
        continue;
      }
      const tag = parts[1];
      const filename = parts[2];
      const slug = filename.replace(/\.(md|mdx)$/, "");
      if (typeof rawContent !== "string") {
        debugLogs.push(`ERROR: Content is not a string. Type: ${typeof rawContent}`);
        throw new Error(`Content is not a string (Type: ${typeof rawContent})`);
      }
      const { data, content } = parseFrontmatter(rawContent);
      notes.push({
        slug,
        title: data.title || slug,
        content,
        tag,
        filePath: `${tag}/${filename}`,
        modifiedAt: "2024-01-01"
      });
      debugLogs.push("SUCCESS");
    } catch (e) {
      debugLogs.push(`ERROR: ${e.message}`);
      console.error("Error parsing note:", path, e);
    }
  }
  return notes;
}
function getNotesByTag() {
  const allNotes = getAllNotes();
  const tagMap = /* @__PURE__ */ new Map();
  for (const note of allNotes) {
    if (!tagMap.has(note.tag)) {
      tagMap.set(note.tag, []);
    }
    tagMap.get(note.tag).push(note);
  }
  return Array.from(tagMap.entries()).map(([tag, notes]) => ({ tag, notes }));
}
function getNoteByPath(tag, slug) {
  const allNotes = getAllNotes();
  return allNotes.find((n) => n.tag === tag && n.slug === slug) || null;
}
function getDebugKeys() {
  return debugLogs;
}
function slugify(text) {
  return text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
}
function extractToc(content) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    toc.push({ id, text, level });
  }
  return toc;
}
async function loader$6({ params }) {
  const { tag, slug } = params;
  if (!tag || !slug) {
    throw new Response("Not Found", { status: 404 });
  }
  const note = getNoteByPath(decodeURIComponent(tag), decodeURIComponent(slug));
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  const renderer = new marked.Renderer();
  renderer.heading = ({ text, depth }) => {
    const id = slugify(text.replace(/&[#\w]+;/g, ""));
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };
  marked.use({ renderer });
  const htmlContent = await marked.parse(note.content);
  const toc = extractToc(note.content);
  return json$1({ note, toc, htmlContent });
}
function NoteDetailPage() {
  const { note, htmlContent } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 max-w-3xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "border-b pb-4 mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", children: note.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "bg-muted px-2 py-1 rounded text-xs", children: note.tag }),
        /* @__PURE__ */ jsxs("span", { children: [
          "最后更新: ",
          note.modifiedAt
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "article",
      {
        className: "markdown-body w-full max-w-none",
        style: { fontSize: "13px", backgroundColor: "transparent" },
        dangerouslySetInnerHTML: { __html: htmlContent }
      }
    )
  ] });
}
function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-primary", children: error.status }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: error.statusText }),
      /* @__PURE__ */ jsx(Link, { to: "/docs", className: "text-sm text-primary hover:underline", children: "返回文档列表" })
    ] });
  }
  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-destructive", children: "Application Error" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-lg mx-auto break-words bg-muted p-4 rounded text-left font-mono text-xs", children: errorMessage }),
    /* @__PURE__ */ jsx(Link, { to: "/docs", className: "text-sm text-primary hover:underline", children: "返回文档列表" })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: NoteDetailPage,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
function SafetyLayout({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-[#F5F7FA] font-sans text-slate-800 p-4 md:p-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto space-y-6", children }) });
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function SafetyHeader() {
  return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsx(Card, { className: "border-l-4 border-l-blue-500 shadow-sm bg-white", children: /* @__PURE__ */ jsx(CardContent, { className: "p-4 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg text-blue-600", children: /* @__PURE__ */ jsx(Info, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-blue-600 font-bold text-lg mb-1", children: "EHS (环境、健康、安全)" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-sm text-slate-600", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
            "核心理念: 0伤害、0事故、0环境污染"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
            "管理原则: 预防为主，全员参与，持续改进"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
            "业务范围: Process Safety, Occupational Health, Environment"
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs(Card, { className: "border-l-4 border-l-blue-500 shadow-sm bg-white relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 bg-white p-1 rounded-md border shadow-sm", children: /* @__PURE__ */ jsx(QrCode, { className: "h-12 w-12 text-slate-800" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "p-4 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg text-blue-600", children: /* @__PURE__ */ jsx(Map$1, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-blue-600 font-bold text-lg mb-1", children: "HOP (人与组织绩效)" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-sm text-slate-600", children: [
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
              "核心认知: 人非圣贤孰能无过，环境驱动行为"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
              "改进重点: 修复系统缺陷，而非责备个人"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
              "实施方法: 学习小组(Learning Team), 现场观察"
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
function SafetyEHS() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 mt-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-600 font-bold text-xl border-b pb-2 border-slate-200", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm", children: "1" }),
      /* @__PURE__ */ jsx("h2", { children: "EHS 实操指引" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-orange-500 font-bold flex items-center gap-2 text-sm uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "p-1 border border-orange-200 rounded bg-orange-50", children: "📂" }),
          "一、项目执行阶段"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-slate-200 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-700", children: "1. 选址与总图布局" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 text-slate-500 space-y-0.5 text-xs", children: [
              /* @__PURE__ */ jsx("li", { children: "安全距离: 防火间距符合GB50016" }),
              /* @__PURE__ */ jsx("li", { children: "风向考虑: 散发有害气体设施置于下风侧" }),
              /* @__PURE__ */ jsx("li", { children: "交通物流: 人流物流分开，消防通道畅通" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-700", children: "2. 工艺安全设计(PSD)" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 text-slate-500 space-y-0.5 text-xs", children: [
              /* @__PURE__ */ jsx("li", { children: "反应风险评估: 涉及高危反应需做反应热测试" }),
              /* @__PURE__ */ jsx("li", { children: "本质安全: 尽量减少危险化学品在线量" }),
              /* @__PURE__ */ jsx("li", { children: "自控水平: 高危工艺DCS/SIS全覆盖" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-orange-500 font-bold flex items-center gap-2 text-sm uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "p-1 border border-orange-200 rounded bg-orange-50", children: "📑" }),
          "二、设备全生命周期"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-slate-200 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-700", children: "1. 机械完整性(MI)" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 text-slate-500 space-y-0.5 text-xs", children: [
              /* @__PURE__ */ jsx("li", { children: "关键设备: 压力容器、安全阀、防爆片台账" }),
              /* @__PURE__ */ jsx("li", { children: "预防性维护: 建立PM计划并严格执行" }),
              /* @__PURE__ */ jsx("li", { children: "备件管理: 关键备件最低库存预警" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-700", children: "2. 变更管理(MOC)" }),
            /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 text-slate-500 space-y-0.5 text-xs", children: [
              /* @__PURE__ */ jsx("li", { children: "变更申请: 任何工艺、设备、人员变更需申请" }),
              /* @__PURE__ */ jsx("li", { children: "风险评估: 变更前进行PSSR (启动前安全检查)" }),
              /* @__PURE__ */ jsx("li", { children: "文档更新: PID图、操作规程同步更新" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-blue-600 font-bold flex items-center gap-2 text-sm uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "p-1 border border-blue-200 rounded bg-blue-50", children: "⚠️" }),
          "危险与可操作性分析 (HAZOP)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-blue-800", children: "1. 节点划分原则" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-600 text-xs", children: "按工艺流程顺序，明确每个节点的边界 (Node Boundary)" }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-blue-800 mt-2", children: "2. 分析方法" }),
          /* @__PURE__ */ jsxs("ul", { className: "text-blue-600 text-xs space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "• 引导词: MORE, LESS, NO, REVERSE" }),
            /* @__PURE__ */ jsx("li", { children: "• 偏差: 流量过大、温度过高、压力过低" }),
            /* @__PURE__ */ jsx("li", { children: "• 后果: 也就是这个偏差导致的最终安全事故" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-blue-800 mt-2", children: "3. 保护层分析 (LOPA)" }),
          /* @__PURE__ */ jsx("p", { className: "text-blue-600 text-xs", children: "对HAZOP识别出的高风险场景进行半定量分析，确定SIL等级" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-green-600 font-bold flex items-center gap-2 text-sm uppercase", children: [
        /* @__PURE__ */ jsx("span", { className: "p-1 border border-green-200 rounded bg-green-50", children: "⚗️" }),
        "三、高危工艺核心要点"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 bg-slate-50 text-slate-700 font-bold text-xs p-3 border-b", children: [
          /* @__PURE__ */ jsx("div", { children: "工艺名称" }),
          /* @__PURE__ */ jsx("div", { children: "关键控制点" }),
          /* @__PURE__ */ jsx("div", { children: "核心安全措施" }),
          /* @__PURE__ */ jsx("div", { children: "重点关注" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 text-xs p-3 border-b hover:bg-slate-50 transition-colors", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-slate-800", children: "硝化工艺" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: "反应温度、加料速度、搅拌速率" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: "双重温度报警、紧急终止系统(Dump)" }),
          /* @__PURE__ */ jsx("div", { className: "text-orange-600", children: "分解爆炸风险高，需严格控温" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 text-xs p-3 border-b hover:bg-slate-50 transition-colors", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-slate-800", children: "氧化工艺" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: "氧含量、反应釜压力、尾气成分" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: "氧含量在线分析、氮气保护系统" }),
          /* @__PURE__ */ jsx("div", { className: "text-orange-600", children: "过氧化物积累、气相爆炸" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 text-xs p-3 border-b hover:bg-slate-50 transition-colors", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-slate-800", children: "氯化工艺" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: "氯气压力、反应温度、尾气吸收" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: "氯气泄漏报警、全密闭操作、碱液吸收" }),
          /* @__PURE__ */ jsx("div", { className: "text-orange-600", children: "剧毒气体泄漏、设备腐蚀" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 text-xs p-3 hover:bg-slate-50 transition-colors", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-slate-800", children: "加氢工艺" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: "氢气压力、催化剂活性、反应热" }),
          /* @__PURE__ */ jsx("div", { className: "text-slate-500", children: "氢气泄漏报警、高压紧急切断阀" }),
          /* @__PURE__ */ jsx("div", { className: "text-orange-600", children: "高压氢气泄漏爆炸、催化剂自燃" })
        ] })
      ] })
    ] })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function SafetyHOP() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 mt-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-600 font-bold text-xl border-b pb-2 border-slate-200", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm", children: "2" }),
      /* @__PURE__ */ jsx("h2", { children: "HOP 实操指引" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-orange-500 font-bold flex items-center gap-2 text-sm uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "p-1 border border-orange-200 rounded bg-orange-50", children: "💡" }),
          "一、核心认知: 错误 vs 坏蛋"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 p-4 rounded-lg border border-orange-100 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-orange-700 text-sm mb-2", children: "🔴 误解 (传统观点)" }),
            /* @__PURE__ */ jsxs("ul", { className: "text-orange-600 text-xs space-y-1 list-disc pl-4", children: [
              /* @__PURE__ */ jsx("li", { children: '事故是"坏苹果"造成的 (Blame culture)' }),
              /* @__PURE__ */ jsx("li", { children: "惩罚可以减少错误" }),
              /* @__PURE__ */ jsx("li", { children: '追求"零失误"' })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-green-50 p-4 rounded-lg border border-green-100 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-green-700 text-sm mb-2", children: "🟢 真相 (HOP观点)" }),
            /* @__PURE__ */ jsxs("ul", { className: "text-green-600 text-xs space-y-1 list-disc pl-4", children: [
              /* @__PURE__ */ jsx("li", { children: "错误是正常的生理属性 (Error is normal)" }),
              /* @__PURE__ */ jsx("li", { children: "环境/系统 驱动行为" }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: "安全能力" }),
                ": 即使犯错也不崩溃"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-blue-600 font-bold flex items-center gap-2 text-sm uppercase", children: [
          /* @__PURE__ */ jsx("span", { className: "p-1 border border-blue-200 rounded bg-blue-50", children: "🔍" }),
          "二、事故分析四步法"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold", children: "1" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-slate-700", children: "人员复述" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 max-w-[80px]", children: "让我们听听当事人的视角" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-[2px] w-8 bg-slate-200" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold", children: "2" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-slate-700", children: "发生背景" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 max-w-[80px]", children: "当时的环境、压力、工具是什么?" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-[2px] w-8 bg-slate-200" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold", children: "3" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-slate-700", children: "构建防线" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 max-w-[80px]", children: '如何在未来"可以犯错"?' })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-[2px] w-8 bg-slate-200" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold", children: "4" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-slate-700", children: "修复PDCA" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 max-w-[80px]", children: "修改系统，验证有效性" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-green-600 font-bold flex items-center gap-2 text-sm uppercase", children: [
        /* @__PURE__ */ jsx("span", { className: "p-1 border border-green-200 rounded bg-green-50", children: "🧩" }),
        "三、HOP防御体系要素"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100", children: [
          /* @__PURE__ */ jsx(Badge, { className: "bg-green-500 text-white hover:bg-green-600 shrink-0", children: "L1 行为 (Human)" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-600", children: /* @__PURE__ */ jsx("p", { children: "关键操作必须双人确认 (Four Eyes Principle), 操作前各类核对/许可。" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-yellow-50/50 rounded-lg border border-yellow-100", children: [
          /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-500 text-white hover:bg-yellow-600 shrink-0", children: "L2 管理 (Admin)" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-600", children: /* @__PURE__ */ jsx("p", { children: "操作规程 (SOP) 清晰可视化; 培训不是签到而是实操考核; 轮班交接记录。" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-orange-50/50 rounded-lg border border-orange-100", children: [
          /* @__PURE__ */ jsx(Badge, { className: "bg-orange-500 text-white hover:bg-orange-600 shrink-0", children: "L3 物理 (Physical)" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-600", children: /* @__PURE__ */ jsx("p", { children: "物理隔离、连锁系统 (Interlock), 溢出围堰，声光报警装置。" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border border-red-100", children: [
          /* @__PURE__ */ jsx(Badge, { className: "bg-red-500 text-white hover:bg-red-600 shrink-0", children: "L4 消除 (Inherent)" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-600", children: /* @__PURE__ */ jsx("p", { children: "改变工艺路线取消高危化学品; 采用微通道反应器降低在线量。" }) })
        ] })
      ] })
    ] })
  ] });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function SafetyTools() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 mt-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-600 font-bold text-xl border-b pb-2 border-slate-200", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm", children: "3" }),
      /* @__PURE__ */ jsx("h2", { children: "评估工具速查" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsx(Card, { className: "border-t-4 border-t-blue-500 shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg text-blue-600", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-slate-800", children: "EHS评估工具" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(ClipboardCheck, { className: "h-4 w-4 text-blue-500" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center justify-between", children: [
                "General Inspection ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1", children: "通用检查表: 涵盖消防、电气、化学品" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4 text-orange-500" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center justify-between", children: [
                "JSA (Job Safety Analysis) ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1", children: "作业安全分析: 针对非常规作业的风险辨识" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t text-center", children: /* @__PURE__ */ jsx(Button, { variant: "link", className: "text-blue-600 h-auto p-0 text-xs", children: "查看所有EHS工具 →" }) })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "border-t-4 border-t-blue-500 shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 rounded-lg text-blue-600", children: /* @__PURE__ */ jsx(Users, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-slate-800", children: "HOP评估工具" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(BarChart3, { className: "h-4 w-4 text-indigo-500" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center justify-between", children: [
                "成熟度评估表 ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1", children: "HOP Deployment Maturity Matrix: 评估组织文化现状" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 text-green-500" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("h4", { className: "text-sm font-bold text-slate-800 group-hover:text-blue-600 flex items-center justify-between", children: [
                "学习小组 (Learning Team) ",
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1", children: "事故后复盘工具: 引导式提问清单" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t text-center", children: /* @__PURE__ */ jsx(Button, { variant: "link", className: "text-blue-600 h-auto p-0 text-xs", children: "查看所有HOP工具 →" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg border border-slate-200", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm mb-3", children: "各阶段系统性要求" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-700", children: "PSD阶段 (研发)" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "反应热数据, 工艺包完整性" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-700", children: "Design阶段 (工程)" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "HAZOP/LOPA, 消防设施设计" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-700", children: "Construction阶段 (建设)" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "JSA, 特种作业许可, 承包商管理" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-700", children: "Commissioning阶段 (试车)" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "PSSR, 吹扫试压, 员工培训" })
        ] })
      ] })
    ] })
  ] });
}
function SafetyFAQ() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 mt-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-600 font-bold text-xl border-b pb-2 border-slate-200", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm", children: "?" }),
      /* @__PURE__ */ jsx("h2", { children: "常见问题 (FAQ)" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 text-blue-600 font-bold", children: [
          /* @__PURE__ */ jsx(HelpCircle, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsx("h3", { children: "EHS常见问题" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 mb-1", children: "Q1: 为什么要做本质安全，成本太高?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "A1: 本质安全 (Inherently Safer Design) 可以在项目早期通过改变工艺路线彻底消除风险。虽然初期研发成本高，但相比后期增加大量的保护层(LOPA)和事故处理成本，全生命周期成本(TCO)是最低的。" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 mb-1", children: "Q2: 变更管理(MOC) 流程太繁琐?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "A2: 历史上70%的工艺事故都与未经评估的变更有关 (如Flixborough事故)。MOC不是为了阻碍变更，而是识别变更带来的新风险 (New Risks)。" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 mb-1", children: "Q3: 承包商管不好，该怎么办?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "A3: 建立严格的准入机制 (Pre-qualification) 和黑名单制度; 实施属地化管理，将承包商纳入本厂班组统一管理和培训。" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 text-blue-600 font-bold", children: [
          /* @__PURE__ */ jsx(HelpCircle, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsx("h3", { children: "HOP常见问题" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 mb-1", children: "Q1: 既然环境决定行为，那员工就没责任了?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "A1: HOP不否认个人责任，但强调系统责任优先。如果一个老员工在正常情况下犯错，大概率是系统诱导的 (Error-Precursors)。" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 mb-1", children: "Q2: 学习小组(Learning Team) 和事故调查的区别?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: 'A2: 传统调查侧重"What happened & Who did it" (定责); 学习小组侧重"How it happened & Why it made sense to them" (理解上下文)。' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-800 mb-1", children: "Q3: 怎样才算建立了HOP文化?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: 'A3: 当一线员工敢于并在会议上主动分享自己的"失误"或"违规"操作，而不用担心受到惩罚时，HOP文化就初步建立了。' })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function SafetyDashboardRoute() {
  return /* @__PURE__ */ jsxs(SafetyLayout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-slate-900 hidden", children: "Safety Standard Overview" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "hover:bg-slate-200", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-slate-500", children: [
        /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" }),
        " 返回首页"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(SafetyHeader, {}),
    /* @__PURE__ */ jsx(SafetyEHS, {}),
    /* @__PURE__ */ jsx(SafetyHOP, {}),
    /* @__PURE__ */ jsx(SafetyTools, {}),
    /* @__PURE__ */ jsx(SafetyFAQ, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-4 mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-blue-600 font-bold flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg", children: "⚲" }),
          " 联动快速查询卡"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-500 space-y-1", children: [
          /* @__PURE__ */ jsx("p", { children: "物料MSDS查询" }),
          /* @__PURE__ */ jsx("p", { children: "事故案例库" }),
          /* @__PURE__ */ jsx("p", { children: "法规标准数据库" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-500 space-y-1", children: [
        /* @__PURE__ */ jsx("p", { children: "应急预案在线" }),
        /* @__PURE__ */ jsx("p", { children: "承包商资质查询" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-500 space-y-1", children: [
        /* @__PURE__ */ jsx("p", { children: "HOP学习视频库" }),
        /* @__PURE__ */ jsx("p", { children: "EHS培训矩阵" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-500 space-y-1", children: [
        /* @__PURE__ */ jsx("p", { children: "PPE选型指南" }),
        /* @__PURE__ */ jsx("p", { children: "特种作业许可" })
      ] }) })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SafetyDashboardRoute
}, Symbol.toStringTag, { value: "Module" }));
const meta = ({ data }) => {
  var _a;
  return [
    { title: `${((_a = data == null ? void 0 : data.animation) == null ? void 0 : _a.title) || "动画演示"} - Haibin` }
  ];
};
const loader$5 = async ({ params, context }) => {
  var _a, _b;
  const { id } = params;
  const db = (_b = (_a = context.cloudflare) == null ? void 0 : _a.env) == null ? void 0 : _b.DB;
  if (!db) {
    console.warn("DB binding missing in detail loader");
    throw new Response("Database Error", { status: 500, statusText: "Database connection failed" });
  }
  try {
    const animation = await db.prepare(
      "SELECT * FROM animations WHERE id = ?"
    ).bind(id).first();
    if (!animation) {
      throw new Response("Animation Not Found", { status: 404 });
    }
    return json({ animation });
  } catch (error) {
    console.error(`Error fetching animation ${id}:`, error);
    throw error;
  }
};
const action$2 = async ({ params, context }) => {
  var _a, _b;
  const { id } = params;
  const db = (_b = (_a = context.cloudflare) == null ? void 0 : _a.env) == null ? void 0 : _b.DB;
  if (!db) {
    throw new Error("Database binding not found");
  }
  await db.prepare(
    "DELETE FROM animations WHERE id = ?"
  ).bind(id).run();
  return redirect("/animations");
};
function AnimationDetail() {
  const { animation } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-3 bg-transparent z-10 absolute top-0 left-0 right-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pointer-events-auto", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-medium", children: animation.title }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full", children: animation.category })
      ] }),
      /* @__PURE__ */ jsx(Form, { method: "post", onSubmit: (event) => {
        if (!confirm("确定要删除这个动画吗？")) {
          event.preventDefault();
        }
      }, className: "pointer-events-auto", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "text-muted-foreground hover:text-destructive", children: [
        /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "删除" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 w-full relative", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        srcDoc: `<!DOCTYPE html><html><head><style>body{margin:0;overflow:auto;font-family:system-ui,-apple-system,sans-serif;height:100vh;}</style></head><body>${animation.content}</body></html>`,
        className: "w-full h-full border-0 absolute inset-0",
        title: animation.title,
        sandbox: "allow-scripts allow-same-origin allow-popups allow-forms"
      }
    ) })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: AnimationDetail,
  loader: loader$5,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";
const STORAGE_KEY = "docs-prompts";
function getPrompts() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function savePrompt(item) {
  const list = getPrompts();
  const newItem = {
    ...item,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    createdAt: Date.now()
  };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
}
function deletePrompt(id) {
  const list = getPrompts();
  const filtered = list.filter((p) => p.id !== id);
  const changed = filtered.length !== list.length;
  if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return changed;
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
function Prompts() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories2, setCategories] = useState([]);
  const [allPrompts, setAllPrompts] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [filter, setFilter] = useState("ALL");
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
          setPrompts(query ? data.prompts.filter((p) => p.title.includes(query) || p.content.includes(query)) : data.prompts);
          return;
        }
      } catch {
      }
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
          setPrompts(query ? data.prompts.filter((p) => p.title.includes(query) || p.content.includes(query)) : data.prompts);
          return;
        }
      } catch {
      }
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
      const res = await fetch(`/api/prompts`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category: usedCategory, title: title.trim(), content: content.trim() }) });
      if (res.ok) {
        await refetchAll();
        setNotice("新增成功");
        setTimeout(() => setNotice(""), 2e3);
      } else {
        throw new Error("server");
      }
    } catch {
      const added = savePrompt({ category: usedCategory, title: title.trim(), content: content.trim() });
      setAllPrompts((prev) => {
        const updated = [added, ...prev];
        setCategories(Array.from(new Set(updated.map((p) => p.category))).sort((a, b) => a.localeCompare(b)));
        return updated;
      });
      setNotice("已保存到本地");
      setTimeout(() => setNotice(""), 2e3);
    }
    setTitle("");
    setContent("");
  }
  async function removePrompt(id) {
    try {
      const res = await fetch(`/api/prompts?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        await refetchAll();
        setNotice("删除成功");
        setTimeout(() => setNotice(""), 2e3);
        return;
      }
    } catch {
    }
    const ok = deletePrompt(id);
    if (!ok) return;
    setAllPrompts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setCategories(Array.from(new Set(updated.map((p) => p.category))).sort((a, b) => a.localeCompare(b)));
      return updated;
    });
    setNotice("已从本地删除");
    setTimeout(() => setNotice(""), 2e3);
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
    } catch {
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full bg-background flex min-h-0 h-[calc(100vh-8rem)] border rounded-lg overflow-hidden mt-[5px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-[300px] border-r bg-muted/10 flex flex-col shrink-0", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 px-4 border-b flex items-center justify-between bg-muted/30", children: /* @__PURE__ */ jsxs("span", { className: "font-medium text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        "新增提示词"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-medium", children: "分类" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: categories2.includes(category) ? category : category ? "__NEW__" : "",
                onValueChange: (v) => {
                  if (v !== "__NEW__") {
                    setCategory(v);
                  } else {
                    setCategory("");
                  }
                },
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 text-[13px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "选择分类" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    categories2.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c)),
                    /* @__PURE__ */ jsx(SelectItem, { value: "__NEW__", children: "+ 新建分类" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: category,
                onChange: (e) => setCategory(e.target.value),
                className: "h-8 text-[13px]",
                placeholder: "输入分类名称"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-medium", children: "标题" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: title,
              onChange: (e) => setTitle(e.target.value),
              className: "h-8 text-[13px]",
              placeholder: "提示词标题"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground font-medium", children: "内容" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: content,
              onChange: (e) => setContent(e.target.value),
              rows: 10,
              className: "resize-none text-[13px]",
              placeholder: "输入完整提示词内容..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", className: "w-full h-8 text-[13px]", onClick: addPrompt, children: [
          /* @__PURE__ */ jsx(Save, { className: "w-3.5 h-3.5 mr-2" }),
          "保存提示词"
        ] }),
        notice && /* @__PURE__ */ jsx(Alert, { className: "py-2", children: /* @__PURE__ */ jsx(AlertDescription, { className: "text-xs text-center", children: notice }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-12 px-4 border-b flex items-center justify-between bg-muted/30", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "提示词库" }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground ml-2", children: [
            "(",
            prompts.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 w-[400px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "search",
                placeholder: "搜索提示词...",
                className: "w-full h-8 pl-8 text-[13px] bg-background",
                value: query,
                onChange: (e) => setQuery(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: filter, onValueChange: setFilter, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[140px] h-8 text-[13px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "全部分类" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "ALL", children: "全部分类" }),
              categories2.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-0", children: prompts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-[300px] text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-12 h-12 mb-4 opacity-20" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "暂无提示词，请在左侧添加" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "divide-y", children: prompts.map((p) => /* @__PURE__ */ jsxs("div", { className: "p-4 flex items-start justify-between gap-4 hover:bg-muted/30 transition-colors group", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", children: p.category }),
            /* @__PURE__ */ jsx("h4", { className: "font-medium text-sm truncate", children: p.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: p.content })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-7 w-7",
              title: "复制内容",
              onClick: () => {
                navigator.clipboard.writeText(p.content);
                setNotice("内容已复制");
                setTimeout(() => setNotice(""), 2e3);
              },
              children: /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "h-7 px-2 text-xs", children: "查看" }) }),
            /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[640px]", children: [
              /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: p.title }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-muted/30 rounded-md text-sm whitespace-pre-wrap max-h-[60vh] overflow-y-auto font-mono", children: p.content })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10",
              title: "删除",
              onClick: () => removePrompt(p.id),
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ] }, p.id)) }) })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Prompts
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async () => {
  return redirect$1("/tools/prompts");
};
function ToolsIndex() {
  return null;
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ToolsIndex,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
function requireDB(context) {
  const db = context == null ? void 0 : context.DB;
  if (!db) throw new Response("D1 not bound", { status: 500 });
  return db;
}
async function loader$3({ request, context }) {
  var _a, _b;
  try {
    const url = new URL(request.url);
    const health = url.searchParams.get("health");
    const category = url.searchParams.get("category");
    const db = requireDB(context);
    await db.prepare(
      "CREATE TABLE IF NOT EXISTS prompts (id TEXT PRIMARY KEY, category TEXT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, created_at INTEGER NOT NULL)"
    ).run();
    if (health === "1") {
      const res = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='prompts'").all();
      return json({ ok: true, table: ((_b = (_a = res.results) == null ? void 0 : _a[0]) == null ? void 0 : _b.name) ?? null });
    }
    const promptsStmt = category && category !== "ALL" ? db.prepare("SELECT id, category, title, content, created_at FROM prompts WHERE category = ? ORDER BY created_at DESC").bind(category) : db.prepare("SELECT id, category, title, content, created_at FROM prompts ORDER BY created_at DESC");
    const promptsRes = await promptsStmt.all();
    const catsRes = await db.prepare("SELECT DISTINCT category FROM prompts ORDER BY category ASC").all();
    return json({
      prompts: (promptsRes.results ?? []).map((r) => ({
        id: String(r.id),
        category: String(r.category),
        title: String(r.title),
        content: String(r.content),
        createdAt: Number(r.created_at)
      })),
      categories: (catsRes.results ?? []).map((r) => String(r.category))
    });
  } catch (e) {
    console.error("/api/prompts loader error:", e);
    return json({ error: (e == null ? void 0 : e.message) ?? String(e) }, { status: 500 });
  }
}
async function action$1({ request, context }) {
  try {
    const db = requireDB(context);
    const method = request.method.toUpperCase();
    if (method === "POST") {
      await db.prepare(
        "CREATE TABLE IF NOT EXISTS prompts (id TEXT PRIMARY KEY, category TEXT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, created_at INTEGER NOT NULL)"
      ).run();
      const body = await request.json();
      const { category, title, content } = body ?? {};
      if (!category || !title || !content) return json({ error: "missing fields" }, { status: 400 });
      const id = crypto.randomUUID();
      const createdAt = Date.now();
      await db.prepare("INSERT INTO prompts (id, category, title, content, created_at) VALUES (?, ?, ?, ?, ?)").bind(id, category, title, content, createdAt).run();
      return json({ ok: true, id });
    }
    if (method === "DELETE") {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      if (!id) return json({ error: "missing id" }, { status: 400 });
      await db.prepare("DELETE FROM prompts WHERE id = ?").bind(id).run();
      return json({ ok: true });
    }
    return json({ error: "method not allowed" }, { status: 405 });
  } catch (e) {
    console.error("/api/prompts action error:", e);
    return json({ error: (e == null ? void 0 : e.message) ?? String(e) }, { status: 500 });
  }
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
async function loader$2() {
  const notesByTag = getNotesByTag();
  const debugKeys = getDebugKeys();
  return json$1({ notesByTag, debugKeys });
}
function DocsIndexPage() {
  const { notesByTag, debugKeys } = useLoaderData();
  if (notesByTag.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-muted-foreground", children: [
      /* @__PURE__ */ jsx(FileText, { className: "h-16 w-16 mb-4 opacity-20" }),
      /* @__PURE__ */ jsx("p", { children: "暂无笔记" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2", children: [
        "在 ",
        /* @__PURE__ */ jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "content/" }),
        " 目录创建 md 文件"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 p-4 bg-muted/20 rounded text-xs font-mono text-left max-w-lg w-full overflow-auto max-h-64", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-bold mb-2", children: [
          "Debug Info (Found ",
          debugKeys.length,
          " files):"
        ] }),
        /* @__PURE__ */ jsx("pre", { children: JSON.stringify(debugKeys, null, 2) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "mt-4 text-[13px] text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "从左侧选择一个笔记查看正文，右侧显示该页目录。" }) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsIndexPage,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "label",
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = "Label";
function AnimationsSidebar({ animations }) {
  var _a;
  const location = useLocation();
  const pathname = location.pathname;
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);
  const isSubmitting = fetcher.state === "submitting";
  useEffect(() => {
    if (fetcher.data && fetcher.data.success) {
      setOpen(false);
    }
  }, [fetcher.data]);
  const groupedAnimations = animations.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  return /* @__PURE__ */ jsx("aside", { className: "fixed top-[calc(3.5rem+5px)] z-30 -ml-2 hidden h-[calc(100vh-3.5rem-5px)] w-full shrink-0 md:sticky md:block border-r bg-background", children: /* @__PURE__ */ jsx("div", { className: "h-full pr-4 pl-2 py-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 px-2", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: "动画列表" }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "添加动画" })
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: "添加新动画" }),
            /* @__PURE__ */ jsx(DialogDescription, { children: "输入动画标题、分类和代码。" })
          ] }),
          /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", action: "/animations", className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "category", children: "分类" }),
              /* @__PURE__ */ jsx(Input, { id: "category", name: "category", placeholder: "例如：四年级科学", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "标题" }),
              /* @__PURE__ */ jsx(Input, { id: "title", name: "title", placeholder: "例如：水的三态变化", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "content", children: "HTML 代码" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: "content",
                  name: "content",
                  placeholder: "<style>...</style><svg>...</svg><script>...<\/script>",
                  className: "font-mono min-h-[150px]",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "支持完整 HTML/SVG/CSS/JS。" })
            ] }),
            ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: fetcher.data.error }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? "添加中..." : "添加" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto pr-2", children: animations.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-2 text-muted-foreground text-xs", children: "暂无动画，点击上方 + 号添加" }) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: Object.entries(groupedAnimations).map(([category, items]) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h5", { className: "mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: category }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-flow-row auto-rows-max text-sm gap-1", children: items.map((item) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/animations/${item.id}`,
          className: cn(
            "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline truncate",
            pathname === `/animations/${item.id}` ? "text-foreground font-medium bg-muted" : "text-muted-foreground"
          ),
          title: item.title,
          children: [
            /* @__PURE__ */ jsx(FlaskConical, { className: "mr-2 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: item.title })
          ]
        },
        item.id
      )) })
    ] }, category)) }) })
  ] }) }) });
}
const loader$1 = async ({ context }) => {
  var _a, _b;
  try {
    const db = (_b = (_a = context.cloudflare) == null ? void 0 : _a.env) == null ? void 0 : _b.DB;
    if (!db) {
      console.warn("Cloudflare context or DB binding missing.");
      return json({ animations: [] });
    }
    const { results } = await db.prepare(
      "SELECT id, title, category FROM animations ORDER BY created_at DESC"
    ).all();
    return json({ animations: Array.isArray(results) ? results : [] });
  } catch (error) {
    console.error("Error fetching animations:", error);
    return json({ animations: [] });
  }
};
const action = async ({ request, context }) => {
  var _a, _b;
  const db = (_b = (_a = context.cloudflare) == null ? void 0 : _a.env) == null ? void 0 : _b.DB;
  if (!db) {
    throw new Error("Database binding 'DB' not found.");
  }
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const category = formData.get("category");
  if (!title || !content || !category) {
    return json({ error: "Title, content and category are required" }, { status: 400 });
  }
  await db.prepare(
    "INSERT INTO animations (title, content, category) VALUES (?, ?, ?)"
  ).bind(title, content, category).run();
  return json({ success: true });
};
function AnimationsLayout() {
  const { animations } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-2 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-4 px-[5px] pt-[5px]", children: [
    /* @__PURE__ */ jsx(AnimationsSidebar, { animations }),
    /* @__PURE__ */ jsx("main", { className: "relative h-[calc(100vh-4rem)] overflow-hidden -mx-[5px] lg:-mx-4 md:ml-0", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: AnimationsLayout,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const sites = [
  // 本地功能
  {
    title: "知识库",
    description: "浏览我的个人笔记和文档集合",
    url: "/docs",
    icon: BookOpen,
    category: "本站功能"
  },
  {
    title: "提示词库",
    description: "AI 提示词管理与分享工具",
    url: "/tools/prompts",
    icon: PenTool,
    category: "本站功能"
  },
  {
    title: "动画演示",
    description: "科学原理动画演示与教学",
    url: "/animations",
    icon: LayoutTemplate,
    category: "本站功能"
  },
  // 系统软件
  {
    title: "VS Code",
    description: "最强大的代码编辑器",
    url: "https://code.visualstudio.com/",
    icon: Settings,
    category: "系统软件",
    isExternal: true
  },
  {
    title: "Docker",
    description: "容器化应用平台",
    url: "https://www.docker.com/",
    icon: Server,
    category: "系统软件",
    isExternal: true
  },
  // 网络工具
  {
    title: "Cloudflare",
    description: "全球网络安全与性能加速",
    url: "https://www.cloudflare.com/",
    icon: Network,
    category: "网络工具",
    isExternal: true
  },
  {
    title: "IP Check",
    description: "查看当前 IP 地址信息",
    url: "https://ip.sb/",
    icon: Network,
    category: "网络工具",
    isExternal: true
  },
  // 开源工具
  {
    title: "GitHub",
    description: "全球最大的开源代码托管平台",
    url: "https://github.com/",
    icon: Github,
    category: "开源工具",
    isExternal: true
  },
  {
    title: "Remix",
    description: "全栈 Web 框架",
    url: "https://remix.run/",
    icon: LayoutTemplate,
    category: "开源工具",
    isExternal: true
  },
  {
    title: "ChatGPT",
    description: "智能对话 AI 助手",
    url: "https://chat.openai.com/",
    icon: FlaskConical,
    category: "AI工具",
    isExternal: true
  },
  {
    title: "lucide图标库",
    description: "图标库",
    url: "https://lucide.dev/icons/",
    icon: CableCar,
    category: "素材资源",
    isExternal: true
  }
];
const categories = ["全部", "本站功能", "系统软件", "网络工具", "开源工具", "AI工具", "素材资源"];
function Index$1() {
  return /* @__PURE__ */ jsxs("div", { className: "container py-10 px-4 md:px-8 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center mb-10 text-center space-y-4", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "首页导航站" }) }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "全部", className: "w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsx(TabsList, { className: "h-auto flex-wrap justify-center gap-2 bg-transparent", children: categories.map((category) => /* @__PURE__ */ jsx(
        TabsTrigger,
        {
          value: category,
          className: "px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ring-1 ring-inset ring-border",
          children: category
        },
        category
      )) }) }),
      categories.map((category) => /* @__PURE__ */ jsx(TabsContent, { value: category, className: "mt-0", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", children: sites.filter((site) => category === "全部" || site.category === category).map((site, index) => /* @__PURE__ */ jsx(
        "a",
        {
          href: site.url,
          target: site.isExternal ? "_blank" : void 0,
          rel: site.isExternal ? "noopener noreferrer" : void 0,
          className: "group block h-full",
          children: /* @__PURE__ */ jsxs(Card, { className: "h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-muted/60 hover:border-primary/50", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "p-4 pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                site.icon ? /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0", children: /* @__PURE__ */ jsx(site.icon, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsx("div", { className: "p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0", children: /* @__PURE__ */ jsx("span", { className: "h-4 w-4 flex items-center justify-center text-xs font-bold", children: site.title.charAt(0).toUpperCase() }) }),
                /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium truncate", children: site.title })
              ] }),
              site.isExternal && /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 text-muted-foreground opacity-30 shrink-0" })
            ] }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "p-4 pt-0", children: [
              /* @__PURE__ */ jsx(CardDescription, { className: "text-xs line-clamp-2 min-h-[2rem] mb-2", children: site.description }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[9px] px-1.5 h-4 font-normal text-muted-foreground bg-muted/50", children: site.category }) })
            ] })
          ] })
        },
        index
      )) }) }, category))
    ] })
  ] });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("grid place-content-center text-current"),
        children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(DotFilledIcon, { className: "h-3.5 w-3.5 fill-primary" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
function MathGenerator() {
  const [range1, setRange1] = useState("1-9999");
  const [range2, setRange2] = useState("1-9999");
  const [count, setCount] = useState(30);
  const [problems, setProblems] = useState([]);
  const [operators, setOperators] = useState(["+"]);
  const [format, setFormat] = useState("horizontal");
  const toggleOperator = (op) => {
    setOperators(
      (prev) => prev.includes(op) ? prev.filter((o) => o !== op) : [...prev, op]
    );
  };
  const generateProblems = () => {
    if (operators.length === 0) return;
    const parseRange = (rangeStr) => {
      const parts = rangeStr.split("-").map((p) => parseInt(p.trim(), 10));
      if (parts.length === 1) return { min: 1, max: parts[0] || 100 };
      return { min: parts[0] || 1, max: parts[1] || 100 };
    };
    const r1 = parseRange(range1);
    const r2 = parseRange(range2);
    const newProblems = [];
    for (let i = 0; i < count; i++) {
      const op = operators[Math.floor(Math.random() * operators.length)];
      let val1 = Math.floor(Math.random() * (r1.max - r1.min + 1)) + r1.min;
      let val2 = Math.floor(Math.random() * (r2.max - r2.min + 1)) + r2.min;
      let num1 = val1;
      let num2 = val2;
      switch (op) {
        case "-":
          num1 = Math.max(val1, val2);
          num2 = Math.min(val1, val2);
          break;
        case "/":
          if (val2 === 0) val2 = 1;
          let big = Math.max(val1, val2);
          let small = Math.min(val1, val2);
          if (small === 0) small = 1;
          big = big - big % small;
          if (big === 0 && r1.max > 0) big = small;
          num1 = big;
          num2 = small;
          break;
        default:
          num1 = val1;
          num2 = val2;
      }
      newProblems.push({ num1, num2, operator: op });
    }
    setProblems(newProblems);
  };
  const handlePrint = () => {
    window.print();
  };
  const getOperatorSymbol = (op) => {
    switch (op) {
      case "*":
        return "×";
      case "/":
        return "÷";
      default:
        return op;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full bg-background flex min-h-0 h-[calc(100vh-8rem)] border rounded-lg overflow-hidden mt-[5px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-[300px] border-r bg-muted/10 flex flex-col shrink-0 print:hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 px-4 border-b flex items-center justify-between bg-muted/30", children: /* @__PURE__ */ jsxs("span", { className: "font-medium text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Settings2, { className: "w-4 h-4" }),
        "出题配置"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "range1", className: "text-xs text-muted-foreground font-medium", children: "数字1范围" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "range1",
                className: "h-8 text-[13px]",
                value: range1,
                onChange: (e) => setRange1(e.target.value),
                placeholder: "1-100"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "range2", className: "text-xs text-muted-foreground font-medium", children: "数字2范围" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "range2",
                className: "h-8 text-[13px]",
                value: range2,
                onChange: (e) => setRange2(e.target.value),
                placeholder: "1-100"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "count", className: "text-xs text-muted-foreground font-medium", children: "题目数量" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "count",
                type: "number",
                className: "h-8 text-[13px]",
                value: count,
                onChange: (e) => setCount(parseInt(e.target.value) || 0)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs text-muted-foreground font-medium", children: "运算符号" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: ["+", "-", "*", "/"].map((op) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 border rounded-md p-2 bg-background", children: [
            /* @__PURE__ */ jsx(
              Checkbox,
              {
                id: `op-${op}`,
                checked: operators.includes(op),
                onCheckedChange: () => toggleOperator(op),
                className: "h-4 w-4"
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: `op-${op}`,
                className: "text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer",
                children: getOperatorSymbol(op)
              }
            )
          ] }, op)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs text-muted-foreground font-medium", children: "试卷格式" }),
          /* @__PURE__ */ jsxs(RadioGroup, { value: format, onValueChange: (v) => setFormat(v), className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 border rounded-md p-2 bg-background", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { value: "horizontal", id: "r-horizontal", className: "h-4 w-4" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "r-horizontal", className: "text-[13px] font-normal cursor-pointer flex-1", children: "横式" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 border rounded-md p-2 bg-background", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { value: "vertical", id: "r-vertical", className: "h-4 w-4" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "r-vertical", className: "text-[13px] font-normal cursor-pointer flex-1", children: "竖式" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(Button, { onClick: generateProblems, className: "w-full h-8 text-[13px]", disabled: operators.length === 0, children: "生成试卷" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden bg-white", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-12 px-4 border-b flex items-center justify-between bg-muted/30 print:hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "试卷预览" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: handlePrint, size: "sm", className: "h-8 px-3 text-[13px]", children: [
          /* @__PURE__ */ jsx(Printer, { className: "mr-2 h-3.5 w-3.5" }),
          " 打印A4"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-8", id: "print-area", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 hidden print:block", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-2", children: "口算练习题" }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-8 text-sm text-gray-500", children: [
            /* @__PURE__ */ jsx("span", { children: "日期：______________" }),
            /* @__PURE__ */ jsx("span", { children: "用时：______________" }),
            /* @__PURE__ */ jsx("span", { children: "得分：______________" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `grid w-full ${format === "vertical" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-5 gap-x-12 gap-y-12" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 gap-x-12 gap-y-8"}`,
            children: problems.map((p, i) => /* @__PURE__ */ jsx("div", { className: "font-mono text-xl flex justify-center", style: { breakInside: "avoid" }, children: format === "vertical" ? p.operator === "/" ? (
              // Vertical Division Layout
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center text-lg", children: [
                /* @__PURE__ */ jsx("div", { className: "mr-2", children: p.num2 }),
                /* @__PURE__ */ jsx("div", { className: "border-l border-t border-black px-2 pt-0.5 pb-0.5 min-w-[3em]", children: p.num1 })
              ] })
            ) : (
              // Vertical Standard Layout
              /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-col items-end", style: { letterSpacing: "0.1em" }, children: [
                /* @__PURE__ */ jsx("div", { className: "text-right w-full", children: p.num1 }),
                /* @__PURE__ */ jsxs("div", { className: "text-right w-full border-b-2 border-black relative", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute left-0 -translate-x-full pr-2", children: getOperatorSymbol(p.operator) }),
                  p.num2
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-16" })
              ] })
            ) : (
              // Horizontal Layout
              /* @__PURE__ */ jsx("div", { className: "flex items-baseline justify-between border-b border-dashed border-gray-300 pb-1 w-full", children: /* @__PURE__ */ jsxs("span", { children: [
                p.num1,
                " ",
                getOperatorSymbol(p.operator),
                " ",
                p.num2,
                " = "
              ] }) })
            ) }, i))
          }
        ),
        problems.length === 0 && /* @__PURE__ */ jsxs("div", { className: "print:hidden flex flex-col items-center justify-center h-full text-muted-foreground border-2 border-dashed rounded-lg bg-muted/5 m-4", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "w-12 h-12 mb-4 opacity-20" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "请在左侧配置并点击“生成试卷”" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @media print {
            @page {
                size: A4;
                margin: 15mm;
            }
            body {
                background: white;
                visibility: hidden;
            }
            /* Hide everything by default */
            body * {
                visibility: hidden;
            }
            
            /* Only show the print area and its children */
            #print-area, #print-area * {
                visibility: visible;
            }

            /* Reset the print area to top-left of the page */
            #print-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0 !important;
                padding: 0 !important;
                display: block !important;
                overflow: visible !important;
            }

            /* Ensure internal grid works */
            .grid {
                display: grid !important;
            }
            
            /* Neutralize the root layout (Remix/Tailwind specific) */
            body > div {
                display: block !important;
                position: static !important;
                min-height: 0 !important;
                height: auto !important;
                overflow: visible !important;
            }
            
            /* Hide standard layout elements just in case */
            nav, header, aside, footer, .print\\:hidden {
                display: none !important;
            }
        }
      ` })
  ] });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MathGenerator
}, Symbol.toStringTag, { value: "Module" }));
const processList = [
  { id: "P-001", name: "采购流程", phase: "订单审批", owner: "张三", status: "normal", updated: "10:00" },
  { id: "P-002", name: "生产计划", phase: "排产确认", owner: "李四", status: "warning", updated: "09:45" },
  { id: "P-003", name: "质量检验", phase: "入库检", owner: "王五", status: "normal", updated: "10:15" },
  { id: "P-004", name: "发货物流", phase: "装车", owner: "赵六", status: "critical", updated: "Draft" },
  { id: "P-005", name: "财务结算", phase: "月结", owner: "孙七", status: "normal", updated: "Yesterday" },
  { id: "P-006", name: "工程变更", phase: "ECN审核", owner: "钱八", status: "normal", updated: "09:30" }
];
function ProcessModule() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-blue-500", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-600 font-bold text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", children: "1" }),
      /* @__PURE__ */ jsx("h3", { children: "核心业务流程列表" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "流程名称" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "当前节点" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "责任人" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "状态" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "更新" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: processList.map((item) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3 font-bold text-slate-700", children: item.name }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-3 text-slate-500 text-xs flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-3 w-3" }),
          " ",
          item.phase
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-slate-600 text-xs", children: item.owner }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `h-5 px-1.5 text-[10px] font-normal border-0 ${item.status === "normal" ? "bg-green-100 text-green-700" : item.status === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`, children: item.status }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right text-slate-400 text-xs font-mono", children: item.updated })
      ] }, item.id)) })
    ] })
  ] });
}
const authorityTasks = [
  { type: "权限申请", subject: "财务总监 - ERP超级管理员", applicant: "李明", time: "10:30", status: "待审批" },
  { type: "权限申请", subject: "实习生 - 数据库只读", applicant: "王强", time: "09:15", status: "已驳回" },
  { type: "权限审核", subject: "年度权限盘点 - 制造部", applicant: "系统", time: "Yesterday", status: "进行中" },
  { type: "权限生效", subject: "张三 - 离职权限回收", applicant: "HR系统", time: "09:00", status: "完成" },
  { type: "权限生效", subject: "临时访问 - 外部审计", applicant: "IT部", time: "11:00", status: "Active" }
];
function AuthorityModule() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-orange-500", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-orange-600 font-bold text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", children: "2" }),
      /* @__PURE__ */ jsx("h3", { children: "权限与组织管理列表" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "类型" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-5", children: "事项主题" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "申请人/源" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "状态" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: authorityTasks.map((task, idx) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3 font-medium text-slate-600", children: task.type }),
        /* @__PURE__ */ jsx("div", { className: "col-span-5 truncate pr-2 font-bold text-slate-700", title: task.subject, children: task.subject }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-slate-500 text-xs", children: task.applicant }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded ${task.status === "完成" || task.status === "Active" ? "bg-green-100 text-green-700" : task.status === "已驳回" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`, children: task.status }) })
      ] }, idx)) })
    ] })
  ] });
}
const systemMetrics = [
  { name: "ERP核心", uptime: "99.99%", latency: "45ms", errors: "0", load: "32%" },
  { name: "MES生产", uptime: "100%", latency: "23ms", errors: "0", load: "65%" },
  { name: "WMS仓储", uptime: "99.5%", latency: "300ms", errors: "5", load: "88%" },
  { name: "OA办公", uptime: "99.9%", latency: "120ms", errors: "1", load: "12%" },
  { name: "BI分析", uptime: "98.0%", latency: "5.2s", errors: "2", load: "90%" },
  { name: "SRM供应商", uptime: "99.9%", latency: "150ms", errors: "0", load: "20%" }
];
function SystemHealthModule() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-green-500", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-600 font-bold text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", children: "3" }),
      /* @__PURE__ */ jsx("h3", { children: "系统运行指标列表" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "系统名称" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "可用性" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "延迟" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "错误数" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3 text-right", children: "负载" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: systemMetrics.map((sys) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3 font-bold text-slate-700", children: sys.name }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-green-600 text-xs", children: sys.uptime }),
        /* @__PURE__ */ jsx("div", { className: `col-span-2 text-xs ${parseFloat(sys.latency) > 200 ? "text-red-500 font-bold" : "text-slate-500"}`, children: sys.latency }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-slate-500 text-xs", children: sys.errors }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-3 flex items-center gap-2 justify-end", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-2 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-500 h-full rounded-full", style: { width: sys.load } }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs w-8 text-right text-slate-600", children: sys.load })
        ] })
      ] }, sys.name)) })
    ] })
  ] });
}
const opsIssues = [
  { id: "OP-1001", cat: "系统缺陷", title: "SAP接口超时 (504)", priority: "High", sla: "Breach", owner: "DevOps" },
  { id: "OP-1002", cat: "数据问题", title: "月结报表数据不平", priority: "Critical", sla: "Breach", owner: "DataTeam" },
  { id: "OP-1003", cat: "配置异常", title: "WMS 打印机配置丢失", priority: "Medium", sla: "4h Left", owner: "Ops" },
  { id: "OP-1004", cat: "操作错误", title: "用户误删单据恢复", priority: "Low", sla: "24h Left", owner: "Support" },
  { id: "OP-1005", cat: "系统缺陷", title: "登录页面偶发卡顿", priority: "Low", sla: "48h Left", owner: "Dev" }
];
function OpsModule() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-red-500", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-red-600 font-bold text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", children: "4" }),
      /* @__PURE__ */ jsx("h3", { children: "问题与运维工单" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "工单号" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "分类" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-4", children: "标题" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "SLA" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "处理组" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: opsIssues.map((issue) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-2 font-mono text-xs text-slate-500", children: issue.id }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-slate-600 text-xs", children: issue.cat }),
        /* @__PURE__ */ jsx("div", { className: "col-span-4 truncate pr-1 font-bold text-slate-700", title: issue.title, children: issue.title }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded ${issue.sla === "Breach" ? "bg-red-100 text-red-600 font-bold" : "bg-green-100 text-green-600"}`, children: issue.sla }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right text-slate-500 text-xs", children: issue.owner })
      ] }, issue.id)) })
    ] })
  ] });
}
const risks = [
  { id: "R-001", area: "连续性", desc: "核心岗位(DBA)无备岗方案", level: "High", status: "Open", due: "2024-06-30" },
  { id: "R-002", area: "合规", desc: "部分合同附件缺失签字页", level: "Medium", status: "Scanning", due: "2024-05-15" },
  { id: "R-003", area: "数据安全", desc: "测试环境存在敏感数据", level: "High", status: "Open", due: "Immediate" },
  { id: "R-004", area: "权限", desc: "离职人员账号未及时禁用", level: "Medium", status: "Fixed", due: "-" },
  { id: "R-005", area: "流程", desc: "变更流程缺失回滚验证", level: "Low", status: "Open", due: "2024-12-31" }
];
function RiskModule() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-purple-500", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-purple-600 font-bold text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", children: "5" }),
      /* @__PURE__ */ jsx("h3", { children: "风险与合规事项" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "领域" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-6", children: "风险描述" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "等级" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "截止" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: risks.map((r) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-slate-600 text-xs", children: r.area }),
        /* @__PURE__ */ jsx("div", { className: "col-span-6 truncate pr-2 font-bold text-slate-700", title: r.desc, children: r.desc }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `h-5 px-1.5 text-[10px] border-0 ${r.level === "High" ? "bg-red-100 text-red-700" : r.level === "Medium" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`, children: r.level }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right text-xs text-slate-500", children: r.due })
      ] }, r.id)) })
    ] })
  ] });
}
const dataDomains = [
  { name: "物料主数据", total: 45200, missing: 12, dup: 0, score: 99.9 },
  { name: "客户信息", total: 1200, missing: 85, dup: 4, score: 92.5 },
  { name: "供应商档案", total: 850, missing: 0, dup: 1, score: 99.8 },
  { name: "BOM结构", total: 15400, missing: 142, dup: 12, score: 88.4 },
  { name: "会计科目", total: 320, missing: 0, dup: 0, score: 100 }
];
function DataModule() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-cyan-500", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-cyan-600 font-bold text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", children: "6" }),
      /* @__PURE__ */ jsx("h3", { children: "数据治理详情" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3", children: "主数据域" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3 text-right", children: "总记录数" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "缺失项" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "重复项" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "质量分" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: dataDomains.map((d) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-3 font-bold text-slate-700", children: d.name }),
        /* @__PURE__ */ jsx("div", { className: "col-span-3 text-right text-slate-500 text-xs", children: d.total.toLocaleString() }),
        /* @__PURE__ */ jsx("div", { className: `col-span-2 text-right text-xs ${d.missing > 0 ? "text-orange-500" : "text-slate-400"}`, children: d.missing }),
        /* @__PURE__ */ jsx("div", { className: `col-span-2 text-right text-xs ${d.dup > 0 ? "text-red-500" : "text-slate-400"}`, children: d.dup }),
        /* @__PURE__ */ jsx("div", { className: `col-span-2 text-right font-bold ${d.score < 90 ? "text-red-600" : "text-green-600"}`, children: d.score })
      ] }, d.name)) })
    ] })
  ] });
}
const demands = [
  { id: "REQ-001", title: "财务报表新增利润中心维度", status: "开发中", priority: "P0", requester: "财务部" },
  { id: "REQ-002", title: "WMS手持端适配新款PDA", status: "方案确认", priority: "P1", requester: "物流部" },
  { id: "REQ-003", title: "销售预测算法优化 (V2.0)", status: "待评估", priority: "P2", requester: "销售部" },
  { id: "REQ-004", title: "OA流程：差旅报销单", status: "上线验证", priority: "P1", requester: "HR" },
  { id: "REQ-005", title: "生产看板增加OEE指标", status: "已完成", priority: "P2", requester: "生产部" },
  { id: "REQ-006", title: "SRM供应商门户SSO集成", status: "开发中", priority: "P1", requester: "IT" }
];
function DemandModule() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-indigo-500", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-indigo-600 font-bold text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", children: "7" }),
      /* @__PURE__ */ jsx("h3", { children: "需求与变更排期" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "编号" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-5", children: "需求标题" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "提出部门" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1", children: "级" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "状态" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: demands.map((r) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-xs text-slate-500", children: r.id }),
        /* @__PURE__ */ jsx("div", { className: "col-span-5 truncate pr-2 font-bold text-slate-700", title: r.title, children: r.title }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-slate-500 text-xs", children: r.requester }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold ${r.priority === "P0" ? "text-red-600" : "text-blue-600"}`, children: r.priority }) }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "h-5 px-1.5 text-[10px] font-normal", children: r.status }) })
      ] }, r.id)) })
    ] })
  ] });
}
const knowledgeItems = [
  { title: "2025年度财务报销规范 V2.0", type: "制度", date: "10:00", cat: "财务", status: "New" },
  { title: "MES系统操作手册-注塑车间", type: "SOP", date: "09:30", cat: "制造", status: "" },
  { title: "数据安全管理红线规定", type: "合规", date: "Yesterday", cat: "安全", status: "Must Read" },
  { title: "Q3 季度运营分析报告", type: "报告", date: "2 days ago", cat: "经管", status: "" },
  { title: "新员工入职IT指引", type: "指南", date: "Last Week", cat: "IT", status: "" }
];
function KnowledgeModule() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col h-full border-l-4 border-l-amber-500", children: [
    /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-amber-600 font-bold text-lg", children: [
      /* @__PURE__ */ jsx("span", { className: "bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs", children: "8" }),
      /* @__PURE__ */ jsx("h3", { children: "知识库动态" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-auto p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 bg-slate-50 text-slate-500 font-medium text-xs p-3 border-b sticky top-0", children: [
        /* @__PURE__ */ jsx("div", { className: "col-span-6", children: "文档标题" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "类型" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2", children: "分类" }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right", children: "时间" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: knowledgeItems.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-center p-3 hover:bg-slate-50 transition-colors text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-6 flex items-center gap-2 truncate pr-2", children: [
          item.status && /* @__PURE__ */ jsx(Badge, { variant: "destructive", className: "h-4 px-1.5 text-[9px]", children: item.status }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-700 truncate", title: item.title, children: item.title })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-slate-500 text-xs", children: item.type }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-slate-500 text-xs", children: item.cat }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 text-right text-xs text-slate-400", children: item.date })
      ] }, idx)) })
    ] })
  ] });
}
function DashboardLayout() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col flex-1 bg-[#F5F7FA] dark:bg-slate-950 font-sans text-slate-800", children: /* @__PURE__ */ jsxs("main", { className: "flex-1 p-4 md:p-6 bg-slate-50/50 dark:bg-slate-900/50", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between space-y-2 mb-6", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "运营综合管理仪表板" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2 lg:col-span-2 h-[400px]", children: /* @__PURE__ */ jsx(ProcessModule, {}) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-1 lg:col-span-1 h-[400px]", children: /* @__PURE__ */ jsx(AuthorityModule, {}) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-1 lg:col-span-1 h-[400px]", children: /* @__PURE__ */ jsx(SystemHealthModule, {}) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-1 lg:col-span-1 h-[350px]", children: /* @__PURE__ */ jsx(OpsModule, {}) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-1 lg:col-span-1 h-[350px]", children: /* @__PURE__ */ jsx(RiskModule, {}) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2 lg:col-span-2 h-[350px]", children: /* @__PURE__ */ jsx(DataModule, {}) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2 lg:col-span-2 h-[350px]", children: /* @__PURE__ */ jsx(DemandModule, {}) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 md:col-span-2 lg:col-span-2 h-[350px]", children: /* @__PURE__ */ jsx(KnowledgeModule, {}) })
    ] })
  ] }) });
}
function DashboardRoute() {
  return /* @__PURE__ */ jsx(DashboardLayout, {});
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DashboardRoute
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  return /* @__PURE__ */ jsx("div", { className: "container flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] w-full px-[5px] pt-[5px]", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 w-full px-0", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "Haibin's Docs" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "个人的知识库、工具箱和实验田。" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/docs", children: "浏览笔记" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/navigation", children: "常用导航" }) })
    ] })
  ] }) });
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const CONTENT = `
这是一个基于 Remix 构建的示例应用，旨在展示现代 Web 开发的最佳实践。

主要功能包括：
- Next.js 风格的文档系统
- 小学生口算生成器
- 基于文件系统的 Markdown 笔记

Built by Qihaibin correctly qihaibintc@gmail.com.
`;
function AboutPage() {
  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    async function parse() {
      const html = await marked.parse(CONTENT);
      setHtmlContent(html);
    }
    parse();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "container relative pb-6 lg:gap-10 lg:pb-8 px-[5px] pt-[5px]", children: /* @__PURE__ */ jsx(
    "article",
    {
      className: "markdown-body w-full max-w-none",
      style: { fontSize: "13px", backgroundColor: "transparent" },
      dangerouslySetInnerHTML: { __html: htmlContent }
    }
  ) });
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutPage
}, Symbol.toStringTag, { value: "Module" }));
const tools = [
  {
    title: "Prompt Library",
    href: "/tools/prompts",
    icon: Sparkles
  },
  {
    title: "Math Generator",
    href: "/tools/math",
    icon: Calculator
  }
];
function ToolsSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  return /* @__PURE__ */ jsx("aside", { className: "fixed top-[calc(3.5rem+5px)] z-30 -ml-2 hidden h-[calc(100vh-3.5rem-5px)] w-full shrink-0 md:sticky md:block", children: /* @__PURE__ */ jsx("div", { className: "h-full pr-6", children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "pb-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-flow-row auto-rows-max text-sm", children: tools.map((item, index) => /* @__PURE__ */ jsxs(
    Link,
    {
      to: item.href,
      className: cn(
        "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
        pathname === item.href || pathname.startsWith(item.href) ? "text-foreground font-medium" : "text-muted-foreground"
      ),
      children: [
        item.icon && /* @__PURE__ */ jsx(item.icon, { className: "mr-2 h-4 w-4" }),
        item.title
      ]
    },
    index
  )) }) }) }) }) });
}
function ToolsLayout() {
  return /* @__PURE__ */ jsxs("div", { className: "container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-2 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-4 px-[5px] pt-[5px]", children: [
    /* @__PURE__ */ jsx(ToolsSidebar, {}),
    /* @__PURE__ */ jsx("main", { className: "relative", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ToolsLayout
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
  const notesByTag = getNotesByTag();
  return json$1({ notesByTag });
}
function DocsLayout() {
  var _a;
  const { notesByTag } = useLoaderData();
  const matches = useMatches();
  const location = useLocation();
  const lastMatch = matches[matches.length - 1];
  const toc = ((_a = lastMatch == null ? void 0 : lastMatch.data) == null ? void 0 : _a.toc) ?? [];
  return /* @__PURE__ */ jsxs("div", { className: "container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-[5px] pt-[5px] pb-6", children: [
    /* @__PURE__ */ jsx("aside", { className: "fixed top-[calc(3.5rem+5px)] z-30 -ml-2 hidden h-[calc(100vh-3.5rem-5px)] w-full shrink-0 md:sticky md:block", children: /* @__PURE__ */ jsx("div", { className: "h-full pr-6", children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2", children: notesByTag.map(({ tag, notes }) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h4", { className: "mb-1 rounded-md px-2 py-1 text-sm font-semibold", children: [
        tag,
        " ",
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground font-normal", children: [
          "(",
          notes.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-flow-row auto-rows-max text-sm", children: notes.map((note) => {
        const href = `/docs/${encodeURIComponent(note.tag)}/${encodeURIComponent(note.slug)}`;
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: href,
            className: cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
              location.pathname === href ? "text-foreground font-medium" : "text-muted-foreground"
            ),
            title: note.title,
            children: note.title
          },
          note.filePath
        );
      }) })
    ] }, tag)) }) }) }) }),
    /* @__PURE__ */ jsx("main", { className: "relative min-w-0 mt-[5px]", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx("aside", { className: "fixed top-[calc(3.5rem+5px)] hidden h-[calc(100vh-3.5rem-5px)] w-60 shrink-0 overflow-y-auto border-l pl-6 pt-6 xl:block right-[max(0px,calc(50%-45rem))]", children: toc.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold mb-3", children: "目录" }),
      /* @__PURE__ */ jsx("nav", { className: "text-sm space-y-1.5", children: toc.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: `#${item.id}`,
          className: "block text-muted-foreground hover:text-foreground transition-colors truncate",
          style: { paddingLeft: `${(item.level - 1) * 12}px` },
          children: item.text
        },
        item.id
      )) })
    ] }) })
  ] });
}
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsLayout,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client.js", "imports": ["/assets/jsx-runtime.js", "/assets/index.js", "/assets/components.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root.js", "imports": ["/assets/jsx-runtime.js", "/assets/index.js", "/assets/components.js", "/assets/createLucideIcon.js", "/assets/utils.js", "/assets/index6.js", "/assets/index2.js", "/assets/index8.js", "/assets/Combination.js", "/assets/index9.js", "/assets/index7.js", "/assets/react-icons.esm.js", "/assets/github.js", "/assets/index5.js"], "css": [] }, "routes/animations._index": { "id": "routes/animations._index", "parentId": "routes/animations", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/animations._index.js", "imports": ["/assets/jsx-runtime.js"], "css": [] }, "routes/docs.$tag.$slug": { "id": "routes/docs.$tag.$slug", "parentId": "routes/docs", "path": ":tag/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/docs._tag._slug.js", "imports": ["/assets/jsx-runtime.js", "/assets/components.js", "/assets/index.js"], "css": ["/assets/github-markdown.css"] }, "routes/quality.ehs-hop": { "id": "routes/quality.ehs-hop", "parentId": "root", "path": "quality/ehs-hop", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/quality.ehs-hop.js", "imports": ["/assets/jsx-runtime.js", "/assets/card.js", "/assets/createLucideIcon.js", "/assets/badge.js", "/assets/button.js", "/assets/components.js", "/assets/utils.js", "/assets/index3.js", "/assets/index2.js", "/assets/index.js"], "css": [] }, "routes/animations.$id": { "id": "routes/animations.$id", "parentId": "routes/animations", "path": ":id", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/animations._id.js", "imports": ["/assets/jsx-runtime.js", "/assets/button.js", "/assets/components.js", "/assets/trash-2.js", "/assets/index2.js", "/assets/index3.js", "/assets/utils.js", "/assets/index.js", "/assets/createLucideIcon.js"], "css": [] }, "routes/tools.prompts": { "id": "routes/tools.prompts", "parentId": "routes/tools", "path": "prompts", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.prompts.js", "imports": ["/assets/jsx-runtime.js", "/assets/button.js", "/assets/input.js", "/assets/dialog.js", "/assets/index3.js", "/assets/utils.js", "/assets/index.js", "/assets/index6.js", "/assets/index8.js", "/assets/index2.js", "/assets/Combination.js", "/assets/index9.js", "/assets/index4.js", "/assets/createLucideIcon.js", "/assets/sparkles.js", "/assets/trash-2.js", "/assets/index5.js"], "css": [] }, "routes/tools._index": { "id": "routes/tools._index", "parentId": "routes/tools", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools._index.js", "imports": [], "css": [] }, "routes/api.prompts": { "id": "routes/api.prompts", "parentId": "root", "path": "api/prompts", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.prompts.js", "imports": [], "css": [] }, "routes/docs._index": { "id": "routes/docs._index", "parentId": "routes/docs", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs._index.js", "imports": ["/assets/jsx-runtime.js", "/assets/components.js", "/assets/createLucideIcon.js", "/assets/index.js"], "css": [] }, "routes/animations": { "id": "routes/animations", "parentId": "root", "path": "animations", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/animations.js", "imports": ["/assets/jsx-runtime.js", "/assets/utils.js", "/assets/button.js", "/assets/dialog.js", "/assets/input.js", "/assets/label.js", "/assets/components.js", "/assets/flask-conical.js", "/assets/index2.js", "/assets/index3.js", "/assets/createLucideIcon.js", "/assets/index6.js", "/assets/index.js", "/assets/Combination.js"], "css": [] }, "routes/navigation": { "id": "routes/navigation", "parentId": "root", "path": "navigation", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/navigation.js", "imports": ["/assets/jsx-runtime.js", "/assets/index6.js", "/assets/index7.js", "/assets/index8.js", "/assets/utils.js", "/assets/card.js", "/assets/badge.js", "/assets/createLucideIcon.js", "/assets/github.js", "/assets/flask-conical.js", "/assets/index.js", "/assets/index2.js", "/assets/index3.js"], "css": [] }, "routes/tools.math": { "id": "routes/tools.math", "parentId": "routes/tools", "path": "math", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.math.js", "imports": ["/assets/jsx-runtime.js", "/assets/button.js", "/assets/input.js", "/assets/label.js", "/assets/index2.js", "/assets/index6.js", "/assets/index4.js", "/assets/index5.js", "/assets/utils.js", "/assets/react-icons.esm.js", "/assets/index7.js", "/assets/index8.js", "/assets/createLucideIcon.js", "/assets/calculator.js", "/assets/index3.js", "/assets/index.js"], "css": [] }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/dashboard.js", "imports": ["/assets/jsx-runtime.js", "/assets/badge.js", "/assets/createLucideIcon.js", "/assets/index3.js", "/assets/utils.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index.js", "imports": ["/assets/jsx-runtime.js", "/assets/button.js", "/assets/components.js", "/assets/index2.js", "/assets/index3.js", "/assets/utils.js", "/assets/index.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about.js", "imports": ["/assets/jsx-runtime.js"], "css": ["/assets/github-markdown.css"] }, "routes/tools": { "id": "routes/tools", "parentId": "root", "path": "tools", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.js", "imports": ["/assets/jsx-runtime.js", "/assets/utils.js", "/assets/components.js", "/assets/sparkles.js", "/assets/calculator.js", "/assets/index.js", "/assets/createLucideIcon.js"], "css": [] }, "routes/docs": { "id": "routes/docs", "parentId": "root", "path": "docs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs.js", "imports": ["/assets/jsx-runtime.js", "/assets/utils.js", "/assets/components.js", "/assets/index.js"], "css": [] } }, "url": "/assets/manifest-cb9aa8e7.js", "version": "cb9aa8e7" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/animations._index": {
    id: "routes/animations._index",
    parentId: "routes/animations",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/docs.$tag.$slug": {
    id: "routes/docs.$tag.$slug",
    parentId: "routes/docs",
    path: ":tag/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/quality.ehs-hop": {
    id: "routes/quality.ehs-hop",
    parentId: "root",
    path: "quality/ehs-hop",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/animations.$id": {
    id: "routes/animations.$id",
    parentId: "routes/animations",
    path: ":id",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/tools.prompts": {
    id: "routes/tools.prompts",
    parentId: "routes/tools",
    path: "prompts",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/tools._index": {
    id: "routes/tools._index",
    parentId: "routes/tools",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/api.prompts": {
    id: "routes/api.prompts",
    parentId: "root",
    path: "api/prompts",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/docs._index": {
    id: "routes/docs._index",
    parentId: "routes/docs",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route8
  },
  "routes/animations": {
    id: "routes/animations",
    parentId: "root",
    path: "animations",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/navigation": {
    id: "routes/navigation",
    parentId: "root",
    path: "navigation",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/tools.math": {
    id: "routes/tools.math",
    parentId: "routes/tools",
    path: "math",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route13
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/tools": {
    id: "routes/tools",
    parentId: "root",
    path: "tools",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/docs": {
    id: "routes/docs",
    parentId: "root",
    path: "docs",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
