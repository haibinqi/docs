import { jsx, jsxs } from "react/jsx-runtime";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData, useRouteError, isRouteErrorResponse, useLocation } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { ChevronDown, Calculator, ArrowLeft, List, FileText, FolderOpen, Printer, ChevronRight } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronRightIcon, CheckIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { json } from "@remix-run/node";
import { marked } from "marked";
import { redirect } from "@remix-run/cloudflare";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }),
    {
      // If you wish to abort the rendering process, you can pass a signal here.
      // Please refer to the templates for example son how to configure this.
      // signal: controller.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (isBotRequest(request.headers.get("user-agent"))) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
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
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-14 max-w-[960px] items-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "mr-4 hidden md:flex", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mr-6 flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "hidden font-bold sm:inline-block", children: "你会开飞机吗" }) }),
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-6 text-sm", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/docs",
          className: "transition-colors hover:text-foreground/80 text-foreground/60",
          children: "文档"
        }
      ),
      /* @__PURE__ */ jsxs(DropdownMenu, { modal: false, children: [
        /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "transition-colors hover:text-foreground/80 text-foreground/60 outline-none flex items-center gap-1", children: [
          "工具 ",
          /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", className: "w-[600px] p-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium leading-none text-muted-foreground", children: "数学工具" }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-1", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/tools/math",
                className: "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Calculator, { className: "h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium leading-none", children: "小学生口算" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm leading-snug text-muted-foreground mt-1 pl-6", children: "自定义生成加减乘除口算，支持打印" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium leading-none text-muted-foreground", children: "开发工具" }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-1", children: /* @__PURE__ */ jsxs("div", { className: "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none opacity-50 cursor-not-allowed", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-full border border-primary/20 bg-primary/10" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium leading-none", children: "JSON 格式化" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm leading-snug text-muted-foreground mt-1 pl-6", children: "即将推出..." })
            ] }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/about",
          className: "transition-colors hover:text-foreground/80 text-foreground/60",
          children: "关于"
        }
      )
    ] })
  ] }) }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t py-6 md:py-0", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-[960px] px-4", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-sm leading-loose text-muted-foreground md:text-left", children: [
    "Built by ",
    /* @__PURE__ */ jsx("span", { className: "font-medium underline underline-offset-4", children: "Qihaibin" }),
    "."
  ] }) }) });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "overflow-y-scroll", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-screen bg-background font-sans antialiased", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen flex-col", children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx("div", { className: "flex-1", children }),
        /* @__PURE__ */ jsx(Footer, {})
      ] }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const __vite_glob_0_0 = "---\r\ntitle: Antigravity登入\r\n---\r\n\r\n### 下载安装\r\n### 登入\r\n\r\n会遇到跳转到浏览器登入后跳转不回IDE的场景，接下来的步骤是：\r\n\r\n* https://policies.google.com/country-association-form?pli=1，到此链接把归属地改到美国\r\n\r\n* 梯子打开TUN模式\r\n\r\n\r\n";
const __vite_glob_0_1 = "---\r\ntitle: Antigravity登入\r\n---\r\n\r\n\r\n#### 下载安装\r\n#### 登入\r\n    ##### 1. 修改google账号归属地到美国，https://policies.google.com/country-association-form?pli=1\r\n    ##### 2. 梯子TUN\r\n#### 运行Antigravity并使用google登入\r\n";
const __vite_glob_0_2 = "---\r\ntitle: 项目进度\r\n---\r\n\r\n# 项目进度\r\n\r\n## 本周完成\r\n\r\n- 完成了用户界面设计\r\n- 修复了登录问题\r\n\r\n## 下周计划\r\n\r\n- 开始后端开发\r\n- 编写测试用例\r\n";
const modules = /* @__PURE__ */ Object.assign({ "../../content/Google/anitvity登入问题.md": __vite_glob_0_0, "../../content/学习/React学习笔记.md": __vite_glob_0_1, "../../content/工作/项目进度.md": __vite_glob_0_2 });
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
async function loader$2({ params }) {
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
  return json({ note, toc, htmlContent });
}
function NoteDetailPage() {
  const { note, toc, htmlContent } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/docs",
          className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
            "返回列表"
          ]
        }
      ),
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
          className: "markdown-body",
          style: { fontSize: "13px", backgroundColor: "transparent" },
          dangerouslySetInnerHTML: { __html: htmlContent }
        }
      )
    ] }),
    toc.length > 0 && /* @__PURE__ */ jsx("aside", { className: "hidden lg:block w-64 shrink-0 pl-8 border-l", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold mb-4", children: [
        /* @__PURE__ */ jsx(List, { className: "h-4 w-4" }),
        "目录"
      ] }),
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
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: NoteDetailPage,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async () => {
  return redirect("/tools/math");
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
  const notesByTag = getNotesByTag();
  const debugKeys = getDebugKeys();
  return json({ notesByTag, debugKeys });
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
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 text-[13px]", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-2" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-8", children: notesByTag.map(({ tag, notes }) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 px-4 py-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FolderOpen, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: tag }),
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          "(",
          notes.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y", children: notes.map((note) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/docs/${encodeURIComponent(note.tag)}/${encodeURIComponent(note.slug)}`,
          className: "px-4 py-3 hover:bg-muted/30 transition-colors flex items-center justify-between block",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "font-medium", children: note.title }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: note.modifiedAt })
          ]
        },
        note.filePath
      )) })
    ] }, tag)) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsIndexPage,
  loader
}, Symbol.toStringTag, { value: "Module" }));
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-[13px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "print:hidden space-y-6", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-[16px] font-bold tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "h-5 w-5 text-primary" }),
          "小学生口算生成器，自定义生成加减乘除口算题，支持竖式和横式。"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(Button, { onClick: generateProblems, size: "sm", className: "h-8 px-4 text-[13px]", disabled: operators.length === 0, children: "生成试卷" }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: handlePrint, size: "sm", className: "h-8 px-4 text-[13px]", children: [
            /* @__PURE__ */ jsx(Printer, { className: "mr-2 h-3.5 w-3.5" }),
            " 打印A4"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-muted/30 p-4 rounded-lg border space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end gap-x-8 gap-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "range1", className: "text-xs text-muted-foreground", children: "数字1范围" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "range1",
              className: "w-24 h-8 text-[13px]",
              value: range1,
              onChange: (e) => setRange1(e.target.value),
              placeholder: "1-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "range2", className: "text-xs text-muted-foreground", children: "数字2范围" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "range2",
              className: "w-24 h-8 text-[13px]",
              value: range2,
              onChange: (e) => setRange2(e.target.value),
              placeholder: "1-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "count", className: "text-xs text-muted-foreground", children: "数量" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "count",
              type: "number",
              className: "w-16 h-8 text-[13px]",
              value: count,
              onChange: (e) => setCount(parseInt(e.target.value) || 0)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs text-muted-foreground", children: "符号" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-3 items-center h-8", children: ["+", "-", "*", "/"].map((op) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1.5", children: [
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
                className: "text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                children: getOperatorSymbol(op)
              }
            )
          ] }, op)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs text-muted-foreground", children: "格式" }),
          /* @__PURE__ */ jsxs(RadioGroup, { value: format, onValueChange: (v) => setFormat(v), className: "flex gap-4 items-center h-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1.5", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { value: "horizontal", id: "r-horizontal", className: "h-4 w-4" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "r-horizontal", className: "text-[13px] font-normal cursor-pointer", children: "横式" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1.5", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { value: "vertical", id: "r-vertical", className: "h-4 w-4" }),
              /* @__PURE__ */ jsx(Label, { htmlFor: "r-vertical", className: "text-[13px] font-normal cursor-pointer", children: "竖式" })
            ] })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "print:block min-h-[500px]", id: "print-area", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden print:block mb-6 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "口算能力测试" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex justify-center gap-12 text-[13px]", children: [
          /* @__PURE__ */ jsx("span", { children: "班级: ____________" }),
          /* @__PURE__ */ jsx("span", { children: "姓名: ____________" }),
          /* @__PURE__ */ jsx("span", { children: "日期: ____________" }),
          /* @__PURE__ */ jsx("span", { children: "用时: ____________" }),
          /* @__PURE__ */ jsx("span", { children: "得分: ____________" })
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
              /* @__PURE__ */ jsx("div", { className: "h-8" })
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
      problems.length === 0 && /* @__PURE__ */ jsx("div", { className: "print:hidden text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10", children: "请选择配置并点击“生成试卷”" })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @media print {
            @page {
                size: A4;
                margin: 20mm;
            }
            body {
                background: white;
            }
            nav, header, aside, footer, .print\\:hidden {
                display: none !important;
            }
            main {
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                max-width: none !important;
                display: block !important;
            }
            .container {
                max-width: none !important;
                padding: 0 !important;
                margin: 0 !important;
            }
        }
      ` })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MathGenerator
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ jsx("section", { className: "space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[960px] flex-col items-center gap-4 px-4 text-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "https://twitter.com/remix_run",
          className: "rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium",
          target: "_blank",
          children: "Follow along on Twitter"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold", children: "The React Framework for the Web" }),
      /* @__PURE__ */ jsx("p", { className: "max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8", children: "Used by some of the largest companies in the world, Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds." }),
      /* @__PURE__ */ jsxs("div", { className: "space-x-4", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/docs", children: "Get Started" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "https://github.com/remix-run/remix", target: "_blank", children: "GitHub" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { id: "features", className: "space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[960px] flex-col items-center space-y-4 px-4 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold", children: "Features" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7", children: "This project is an exact replica of the Next.js site style but built using Remix." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto grid justify-center gap-4 px-4 sm:grid-cols-2 md:max-w-[960px] md:grid-cols-3", children: [
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-lg border bg-background p-2", children: /* @__PURE__ */ jsx("div", { className: "flex h-[180px] flex-col justify-between rounded-md p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "Next.js" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "App Router, Server Components, Image Optimization." })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-lg border bg-background p-2", children: /* @__PURE__ */ jsx("div", { className: "flex h-[180px] flex-col justify-between rounded-md p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "React" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Server and Client Components, Hooks." })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-lg border bg-background p-2", children: /* @__PURE__ */ jsx("div", { className: "flex h-[180px] flex-col justify-between rounded-md p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "Turbo" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Pack 700x faster Rust-based Webpack replacement." })
        ] }) }) })
      ] })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const CONTENT = `
这是一个基于 Remix 构建的示例应用，旨在展示现代 Web 开发的最佳实践。

主要功能包括：
- Next.js 风格的文档系统
- 小学生口算生成器
- 基于文件系统的 Markdown 笔记

Built by Qihaibin correctly.
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
  return /* @__PURE__ */ jsx("div", { className: "max-w-[960px] mx-auto px-4 py-6", children: /* @__PURE__ */ jsx(
    "article",
    {
      className: "markdown-body",
      style: { fontSize: "13px", backgroundColor: "transparent" },
      dangerouslySetInnerHTML: { __html: htmlContent }
    }
  ) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AboutPage
}, Symbol.toStringTag, { value: "Module" }));
function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const getTitle = (value) => {
    const titleMap = {
      docs: "文档",
      notes: "记录",
      tags: "标签",
      tools: "工具"
    };
    return titleMap[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
  };
  return /* @__PURE__ */ jsx("div", { className: "mb-4 flex items-center text-sm text-muted-foreground", children: pathnames.map((value, index) => {
    const title = getTitle(value);
    const isLast = index === pathnames.length - 1;
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      index > 0 && /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 mx-1" }),
      /* @__PURE__ */ jsx("span", { className: isLast ? "font-medium text-foreground" : "", children: title })
    ] }, value + index);
  }) });
}
function ToolsLayout() {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-[960px] mx-auto px-4 py-6", children: [
    /* @__PURE__ */ jsx(Breadcrumbs, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ToolsLayout
}, Symbol.toStringTag, { value: "Module" }));
function DocsLayout() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-[960px] mx-auto px-4 py-6", children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsLayout
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Dfj1xrZG.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-u55fAOmI.js", "/assets/index-DQ6GnT8X.js", "/assets/components-C8HnSbrh.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-Dhmzlhce.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-u55fAOmI.js", "/assets/index-DQ6GnT8X.js", "/assets/components-C8HnSbrh.js", "/assets/react-icons.esm-hryL2ptm.js", "/assets/utils-BafzuVJE.js", "/assets/createLucideIcon-3FgSs6nL.js"], "css": ["/assets/root-BB66-h2D.css"] }, "routes/docs.$tag.$slug": { "id": "routes/docs.$tag.$slug", "parentId": "routes/docs", "path": ":tag/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/docs._tag._slug-CuEw84iw.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/components-C8HnSbrh.js", "/assets/createLucideIcon-3FgSs6nL.js", "/assets/index-DQ6GnT8X.js", "/assets/index-u55fAOmI.js"], "css": ["/assets/github-markdown-Mfi8Kzjz.css"] }, "routes/tools._index": { "id": "routes/tools._index", "parentId": "routes/tools", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools._index-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/docs._index": { "id": "routes/docs._index", "parentId": "routes/docs", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs._index-BNWhCJul.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/components-C8HnSbrh.js", "/assets/createLucideIcon-3FgSs6nL.js", "/assets/index-u55fAOmI.js", "/assets/index-DQ6GnT8X.js"], "css": [] }, "routes/tools.math": { "id": "routes/tools.math", "parentId": "routes/tools", "path": "math", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.math-CsX_1i7s.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-DzWdpVie.js", "/assets/utils-BafzuVJE.js", "/assets/react-icons.esm-hryL2ptm.js", "/assets/createLucideIcon-3FgSs6nL.js", "/assets/index-u55fAOmI.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CP7df9g5.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-DzWdpVie.js", "/assets/components-C8HnSbrh.js", "/assets/utils-BafzuVJE.js", "/assets/index-u55fAOmI.js", "/assets/index-DQ6GnT8X.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-wKbtEu1z.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js"], "css": ["/assets/github-markdown-Mfi8Kzjz.css"] }, "routes/tools": { "id": "routes/tools", "parentId": "root", "path": "tools", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools-BNsJzBkQ.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-DQ6GnT8X.js", "/assets/createLucideIcon-3FgSs6nL.js"], "css": [] }, "routes/docs": { "id": "routes/docs", "parentId": "root", "path": "docs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs-CYKoaXEk.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-DQ6GnT8X.js"], "css": [] } }, "url": "/assets/manifest-2e53b630.js", "version": "2e53b630" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
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
  "routes/docs.$tag.$slug": {
    id: "routes/docs.$tag.$slug",
    parentId: "routes/docs",
    path: ":tag/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/tools._index": {
    id: "routes/tools._index",
    parentId: "routes/tools",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/docs._index": {
    id: "routes/docs._index",
    parentId: "routes/docs",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/tools.math": {
    id: "routes/tools.math",
    parentId: "routes/tools",
    path: "math",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/tools": {
    id: "routes/tools",
    parentId: "root",
    path: "tools",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/docs": {
    id: "routes/docs",
    parentId: "root",
    path: "docs",
    index: void 0,
    caseSensitive: void 0,
    module: route8
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
