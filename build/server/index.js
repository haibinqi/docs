import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, useLocation, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, useLoaderData, useMatches } from "@remix-run/react";
import { renderToReadableStream } from "react-dom/server";
import { ChevronDown, Calculator, ArrowLeft, FileText, Printer, X, Copy, ChevronRight, FolderOpen } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronRightIcon, CheckIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { json } from "@remix-run/node";
import { marked } from "marked";
import { redirect, json as json$1 } from "@remix-run/cloudflare";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as DialogPrimitive from "@radix-ui/react-dialog";
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
  const location = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);
  useEffect(() => {
    setToolsOpen(false);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-14 max-w-[1200px] items-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "mr-4 hidden md:flex", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mr-6 flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "hidden font-bold sm:inline-block", children: "Haibin" }) }),
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-6 text-sm", children: [
      /* @__PURE__ */ jsxs(DropdownMenu, { modal: false, open: toolsOpen, onOpenChange: setToolsOpen, children: [
        /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "transition-colors hover:text-foreground/80 text-foreground/60 outline-none flex items-center gap-1", children: [
          "工具 ",
          /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", className: "w-[600px] p-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium leading-none text-muted-foreground", children: "数学工具" }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-1", children: /* @__PURE__ */ jsx(
              Link,
              {
                to: "/tools/math",
                className: "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                onClick: () => setToolsOpen(false),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Calculator, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium leading-none", children: "小学生口算" })
                ] })
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
          to: "/docs",
          className: "transition-colors hover:text-foreground/80 text-foreground/60",
          children: "笔记"
        }
      ),
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
  return /* @__PURE__ */ jsx("footer", { className: "border-t py-6 md:py-0", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-[1200px] px-4", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-sm leading-loose text-muted-foreground md:text-left", children: [
    "Built by ",
    /* @__PURE__ */ jsx("span", { className: "font-medium underline underline-offset-4", children: "Qihaibin" }),
    "."
  ] }) }) });
}
const tailwindHref = "/assets/tailwind.css";
const links = () => [
  { rel: "stylesheet", href: tailwindHref }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
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
  links
}, Symbol.toStringTag, { value: "Module" }));
const __vite_glob_0_0 = "---\r\ntitle: Antigravity登入\r\n---\r\n\r\n### 下载安装\r\n### 登入\r\n\r\n会遇到跳转到浏览器登入后跳转不回IDE的场景，接下来的步骤是：\r\n\r\n* https://policies.google.com/country-association-form?pli=1，到此链接把归属地改到美国\r\n\r\n* 梯子打开TUN模式\r\n\r\n\r\n";
const __vite_glob_0_1 = "## 一、目的\r\n\r\n通过制定仓库的管理制度及操作流程规定,指导和规范仓库人员的日常工作行为，对有效提高工作效率起到激励作用。\r\n\r\n## 二、适用范围\r\n\r\n仓库的所用工作人员\r\n\r\n## 三、职责\r\n\r\n- 仓库主管负责仓库一切事务的安排和管理,协调部门间的事务和传达与执行上级下达的任务，培训和提高仓库人员行为规范及工作效率。\r\n- 仓管员负责物料的收料、报检、入库、发料、退料、储存、防护工作。\r\n- 仓务员负责单据追查、保管、入帐。\r\n- 仓库杂工负责货物的装卸、搬运、包装等工作。\r\n- 仓库主管、IQC、采购共同负责对原材料的检验、不良品处置方式的确定和废弃物的处置工作。\r\n\r\n## 四、仓储管理规定\r\n\r\n### 1、原材料收货及入库\r\n\r\n- 需严格按照 “收货入库单”的流程进行作业。\r\n- 采购员将“客户送货单”给到仓库后，仓库需将此物料放在指定的检验区内，作好防护措施。\r\n- 仓库收货时需要求采购人员给到“客户送货单”，没有时需追查，直到拿到单据为止，仓库人员有追查和保管单据的责任。\r\n- 仓库收货时的原材料必须有物料部门提供的采购订单(或者说PO)，否则拒绝收货。\r\n- 仓库人员与采购共同确认送货单的数量和实物,如不符由采购人员联系供货商处理，并由采购人员在送货单签字确认实收数量。\r\n- 仓库人员对已送往仓库的原材料及时通知IQC进行物料品质检验。\r\n- 对IQC检验的合格原材料进行开“物料入库单”并经仓库主管签名确认后进仓对不合格原材料进行退货。\r\n- 仓库原则上当天送来的原材料当天处理完毕，如有特殊最迟不得超过一个星期。\r\n- 仓库对已入库的原材料进行分区分类摆放，不得随意堆放，如有特殊情况需在当天内完成。\r\n- 仓库对不合格的原材料放在指定的退货区，由仓库主管、采购共同确定退货。\r\n\r\n### 2、原材料出库\r\n\r\n- 需严格按照“物料领料单”、“生产通知单”、“开发部调用单”的流程进行操作。\r\n- 仓库的生产原材料出库依据是物料部门提供的BOM(即单件用量通知单)，生产通知单中生产数量,及厂部所规定的原材料损耗进行核料,并由部长签名确认。\r\n- 仓库把所出库之原材料配好，并填好“物料领料单”后，通知相关的领料部门进库领料，并由领料部门负责人签名确认后方可让原材料出库。\r\n- 仓库出库物料的原则是同一原材料做到先进先出。\r\n- 超用物料的出库必须依据由生产部长签名确认“领用超单”，且超用人注明了超用原因，以及得到上级主管部门的批准的“领用超用单”，仓库方可发料。\r\n- 开发部门的物料调用依据是由开发部门填写“调用单”，并由开发部负责人签名确认，并经物料部门同意后，仓库才可以依此办理相关手续，否则予与拒绝。\r\n- 仓库任何人员都无权给没有办理相关手续的原材料出库。\r\n\r\n### 3、退厂原材料的处理\r\n\r\n- 需严格按照“退厂物料通知单”进行操作。\r\n- 对采购来的不良物料需要及时通知采购部,并由采购部给予处理意见且签名确认后，可暂放仓库，待采购部把原材料退与供应商。·\r\n- 对于不良原材料不可以办理出入库用续。\r\n\r\n### 4、原材料报废\r\n\r\n- 严格执行 “报废单”进行操作\r\n- 发现仓库库存物料不良时及时处理或通知上级主管部门处理。\r\n- 需要区别分开库存物料报废、来料不良的报废部分、客户退回的报废物料，并且分开保管。\r\n\r\n### 5、成品的收货及出库\r\n\r\nA.成品的收货及入库\r\n\r\n- 严格按照 “成品入库单”进行操作\r\n- 所有入库之成品必须为合格之产品，并由终查(即 QA)提供QC报告之允许入库的成品，否则拒绝入库。\r\n- 入库成品随货提供产品的数量，码数，颜色，款号，单价等信息的送货单，对产品与单不符的不予办理入库手续。\r\n- 对合格产品且与送货单一致的及时办理入库手续。并按要求存放好。\r\n\r\nB.成品的出货\r\n\r\n- 严格按照 “成品出货单”进行操作。\r\n- 成品出货的依据是由营销部提供“客户货物配送单”，进行检货，并把检好成品进行包装。\r\n- 对于即将出库之成品通知营销部，由营销部签名确认,并办理相关出库手续后方可发货。\r\n\r\nC.成品的退货\r\n\r\n- 严格按照“成品退货单”进行操作\r\n- 由客户退回之不合格产品进行核对款号、颜色、码数、数量无误后，办理相关的退货手续。\r\n- 客户退回之不合格产品及时通知生产部进行维修，尽快返还客户。\r\n\r\n## 五、货物管理\r\n\r\n- 货物的品质维护:物料在收货、点数、入库、搬运、摆放、归位、存放、储存、发货过程中遵守安全原则，做到防损、防水、防蛀、防晒等安全措施。\r\n- 每天检查货物信息，如发现储位不对、帐物不符、品质问题及时反馈和处理。\r\n- 保持货物的正确标示，由仓管负责，对于错误标示及时更正。\r\n- 货物的单据、咭、帐由仓库记帐人把电子档和手工单据一同交到财务。每月的单据由其分类保管好，原则上单据保管2年，在此期间不得销毁。做到帐、物、咭-致。\r\n\r\n## 六、货物的盘点\r\n\r\n- 仓库货物盘点由财务、仓库以及主管部门拟定盘点计划时间表和盘点流程。\r\n- 盘点过程中需要其他相关部门予以配合,需入库和发料统一按内部盘点安排操作。\r\n- 盘点时保证做到盘点数量的准确性、公正性，严禁弄虚作假、虚报数据。盘点过程中严禁更换不同的盘点人员，以免少盘、多盘、漏盘等。\r\n- 盘点分初盘、复盘，但所有的盘点数据都需盘点人员签名确认。\r\n\r\n## 七、仓库的安全、卫生管理\r\n\r\n- 仓库每天都对仓库区域进行清洁整理工作,清理掉不要、不用的东西和坏的东西，并将仓库内的物料整理到提定的区域内，达到整洁、整齐、干净、卫生、合理的摆放要求。\r\n- 对仓库内货物摆放做出合理的摆放和规划。\r\n- 仓库卫生可以在仓库空闲的时间进行。\r\n- 仓库内保持安全通道畅通，不可有堆积物，保证人员安全。\r\n- 仓库内严禁烟火，严禁非仓库人员非工作需要进入仓库。\r\n- 仓库内的规划区域要有明确标识(如:物料摆放区、安全通道、物料报废区、物料发放区、配料区、不合格物料存放区、待检物料存放区、消防设施摆放区、办公区等)，其中物料摆放区内要分类分小区存放，且有清楚的标识。\r\n- 上下班关闭窗户及锁上仓库门。\r\n- 做好及时检查物货，如有异常或者安全隐患及时处理和上报。\r\n- 仓库内需要高空作业时做好安全防范。\r\n\r\n## 八、人员的工作态度及作风\r\n\r\n- 仓库人员的工作态度及作风仓库工作人员应该培养良好的工作态度和作风，形成良好的工作习惯。\r\n- 仓库工作人员要求做事细心，认真，负责，诚实,有良好的团队意识及职业道德。\r\n- 对于上级下达的任务要按时按质完成。\r\n- 其他的工作制度和行为准则依厂部规定为准则。\r\n\r\n放得进-库容规划 良好的规划可以根据存放不同性质和规格的物料能够有计划的预留存储空间\r\n\r\n拿得出-通道顺畅 保持能够顺畅进出物料的通道，是仓库实现高效管理的必经之路\r\n\r\n现场好-注重仓库 5S 5S 能提升仓库的工作效率、减少浪费、确保安全并营造一个整洁有序的仓库环境\r\n\r\n常检查-管理落实 制定一套规则、流程、制度是容易的但能够落实才是管理好的关键\r\n\r\n找得到-分类清晰\r\n\r\n账物符-数量准确 仓库里实物数量和账面不一致的话对生产、销售乃至整个企业运作都会造成困扰\r\n\r\n重安全-安全第一 确保仓库安全不仅关乎员工的人身安全，也关系到企业的财产安全和业务连续性\r\n\r\n做保障-无缝对接 仓库在整个生产链条中的角色是保障和服务部门，仓库的工作要围绕生产展开，确保一切顺畅";
const __vite_glob_0_2 = "核心区别\r\n\r\n| **维度**     | **正排 (正序排程)**             | **倒排 (倒序排程)**            |\r\n| ------------ | ------------------------------- | ------------------------------ |\r\n| **起点**     | 从订单接收/生产开始时间正向推算 | 从订单交付截止时间反向推算     |\r\n| **优先级**   | 资源利用率优先                  | 交期保障优先                   |\r\n| **时间轴**   | 当前时间 → 未来时间             | 交付截止时间 → 当前时间        |\r\n| **产能约束** | 可能因资源不足延后交期          | 可能因资源不足需要调整生产策略 |\r\n\r\n应用场景对比\r\n\r\n正排适用场景\r\n\r\n- 产能有限时优化资源分配\r\n- 长周期生产项目（如飞机制造）\r\n- 按批次生产的流程型制造\r\n- 原料供应不稳定的情况\r\n\r\n倒排适用场景\r\n\r\n- 交期严格的关键订单\r\n- JIT（准时制）生产模式\r\n- 短周期快消品制造\r\n- 供应链响应敏捷的环境\r\n\r\n算法特性对比\r\n\r\n| **特性** | 正排                       | 倒排                        |\r\n| -------- | -------------------------- | --------------------------- |\r\n| 时间计算 | 前推法(Forward Scheduling) | 后推法(Backward Scheduling) |\r\n| 瓶颈处理 | 暴露产能缺口               | 强制满足交期                |\r\n| 灵活性   | 更适应常规生产节奏         | 更适合紧急订单处理          |\r\n| 缓冲设置 | 通常在工序间设置时间缓冲   | 更多在起始阶段预留安全时间  |\r\n\r\n混合排程策略\r\n\r\n现代APS系统常采用：\r\n\r\n1. **关键路径倒排**：对核心工序倒排\r\n2. **非关键路径正排**：辅助工序正排\r\n3. **动态缓冲调整**：根据实时产能变化自动优化";
const __vite_glob_0_3 = `---\r
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
const __vite_glob_0_4 = "---\r\ntitle: Antigravity登入\r\n---\r\n\r\n\r\n#### 下载安装\r\n#### 登入\r\n    ##### 1. 修改google账号归属地到美国，https://policies.google.com/country-association-form?pli=1\r\n    ##### 2. 梯子TUN\r\n#### 运行Antigravity并使用google登入\r\n";
const __vite_glob_0_5 = "---\r\ntitle: 项目进度\r\n---\r\n\r\n# 项目进度\r\n\r\n## 本周完成\r\n\r\n- 完成了用户界面设计\r\n- 修复了登录问题\r\n\r\n## 下周计划\r\n\r\n- 开始后端开发\r\n- 编写测试用例\r\n";
const modules = /* @__PURE__ */ Object.assign({ "../../content/Google/anitvity登入问题.md": __vite_glob_0_0, "../../content/制造知识库/仓库管理制度和流程.md": __vite_glob_0_1, "../../content/制造知识库/制造业高级排程中的正排与倒排对比.md": __vite_glob_0_2, "../../content/制造知识库/物料编码规则.mdx": __vite_glob_0_3, "../../content/学习/React学习笔记.md": __vite_glob_0_4, "../../content/工作/项目进度.md": __vite_glob_0_5 });
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
async function loader$4({ params }) {
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
  const { note, htmlContent } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
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
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async () => {
  return redirect("/tools/math");
};
function ToolsIndex() {
  return null;
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ToolsIndex,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
function requireDB(context) {
  const db = context == null ? void 0 : context.DB;
  if (!db) throw new Response("D1 not bound", { status: 500 });
  return db;
}
async function loader$2({ request, context }) {
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
      return json$1({ ok: true, table: ((_b = (_a = res.results) == null ? void 0 : _a[0]) == null ? void 0 : _b.name) ?? null });
    }
    const promptsStmt = category && category !== "ALL" ? db.prepare("SELECT id, category, title, content, created_at FROM prompts WHERE category = ? ORDER BY created_at DESC").bind(category) : db.prepare("SELECT id, category, title, content, created_at FROM prompts ORDER BY created_at DESC");
    const promptsRes = await promptsStmt.all();
    const catsRes = await db.prepare("SELECT DISTINCT category FROM prompts ORDER BY category ASC").all();
    return json$1({
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
    return json$1({ error: (e == null ? void 0 : e.message) ?? String(e) }, { status: 500 });
  }
}
async function action({ request, context }) {
  try {
    const db = requireDB(context);
    const method = request.method.toUpperCase();
    if (method === "POST") {
      await db.prepare(
        "CREATE TABLE IF NOT EXISTS prompts (id TEXT PRIMARY KEY, category TEXT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, created_at INTEGER NOT NULL)"
      ).run();
      const body = await request.json();
      const { category, title, content } = body ?? {};
      if (!category || !title || !content) return json$1({ error: "missing fields" }, { status: 400 });
      const id = crypto.randomUUID();
      const createdAt = Date.now();
      await db.prepare("INSERT INTO prompts (id, category, title, content, created_at) VALUES (?, ?, ?, ?, ?)").bind(id, category, title, content, createdAt).run();
      return json$1({ ok: true, id });
    }
    if (method === "DELETE") {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      if (!id) return json$1({ error: "missing id" }, { status: 400 });
      await db.prepare("DELETE FROM prompts WHERE id = ?").bind(id).run();
      return json$1({ ok: true });
    }
    return json$1({ error: "method not allowed" }, { status: 405 });
  } catch (e) {
    console.error("/api/prompts action error:", e);
    return json$1({ error: (e == null ? void 0 : e.message) ?? String(e) }, { status: 500 });
  }
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1() {
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
  return /* @__PURE__ */ jsx("div", { className: "mt-4 text-[13px] text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "从左侧选择一个笔记查看正文，右侧显示该页目录。" }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsIndexPage,
  loader: loader$1
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
            }

            /* Ensure internal grid works */
            .grid {
                display: grid !important;
            }
            
            /* Neutralize the root layout (Remix/Tailwind specific) */
            /* This targets the div.relative.flex.min-h-screen in root.tsx */
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
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MathGenerator
}, Symbol.toStringTag, { value: "Module" }));
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
function Index() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [allPrompts, setAllPrompts] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [addCatOpen, setAddCatOpen] = useState(false);
  const [addCatName, setAddCatName] = useState("");
  const [query, setQuery] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
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
  return /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("section", { className: "space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto px-4 max-w-[1200px] grid gap-6", children: /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-bold mb-3", children: "提示词库" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground", children: "按分类筛选" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: filter,
              onChange: (e) => setFilter(e.target.value),
              className: "h-8 text-[13px] w-full rounded-md border border-input bg-background px-3",
              children: [
                /* @__PURE__ */ jsx("option", { value: "ALL", children: "全部" }),
                categories.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Dialog, { open: openAdd, onOpenChange: setOpenAdd, children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "h-8 px-4 text-[13px]", children: "新增提示词" }) }),
          /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[640px]", children: [
            /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "新增提示词" }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground", children: "选择分类" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: category,
                    onChange: (e) => {
                      const v = e.target.value;
                      if (v === "__ADD__") {
                        setTimeout(() => setAddCatOpen(true), 0);
                      } else {
                        setCategory(v);
                      }
                    },
                    className: "h-8 text-[13px] w-full rounded-md border border-input bg-background px-3",
                    children: [
                      categories.length === 0 && /* @__PURE__ */ jsx("option", { value: "NONE", disabled: true, children: "暂无分类" }),
                      categories.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: c }, c)),
                      /* @__PURE__ */ jsx("option", { value: "__ADD__", children: "新建分类…" })
                    ]
                  }
                ),
                addCatOpen && /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2 border rounded-md p-2 bg-muted/30", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      value: addCatName,
                      onChange: (e) => setAddCatName(e.target.value),
                      className: "h-8 text-[13px]",
                      placeholder: "输入分类名称"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
                    /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "h-8 px-3 text-[13px]", onClick: () => {
                      setAddCatOpen(false);
                      setAddCatName("");
                    }, children: "取消" }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        size: "sm",
                        className: "h-8 px-3 text-[13px]",
                        onClick: () => {
                          const name = addCatName.trim();
                          if (!name) return;
                          setCategories((prev) => Array.from(/* @__PURE__ */ new Set([name, ...prev])).sort((a, b) => a.localeCompare(b)));
                          setCategory(name);
                          setAddCatName("");
                          setAddCatOpen(false);
                        },
                        children: "确定"
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground", children: "标题" }),
                /* @__PURE__ */ jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), className: "h-8 text-[13px]", placeholder: "提示词标题" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "text-xs text-muted-foreground", children: "内容" }),
                /* @__PURE__ */ jsx(Textarea, { value: content, onChange: (e) => setContent(e.target.value), rows: 6, placeholder: "完整提示词内容" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "h-8 px-4 text-[13px]", onClick: async () => {
                await addPrompt();
                setOpenAdd(false);
              }, children: "保存" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "border rounded-md min-h-[120px]", children: prompts.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-3 text-sm text-muted-foreground", children: "暂无提示词" }) : /* @__PURE__ */ jsx("div", { className: "divide-y", children: prompts.map((p) => /* @__PURE__ */ jsxs("div", { className: "p-3 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: p.category }),
            /* @__PURE__ */ jsx("div", { className: "font-medium truncate max-w-[520px]", children: p.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "h-8 px-3 text-[13px]", onClick: () => {
              navigator.clipboard.writeText(p.content);
              setNotice("内容已复制");
              setTimeout(() => setNotice(""), 2e3);
            }, children: [
              /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5 mr-1" }),
              " 复制"
            ] }),
            /* @__PURE__ */ jsxs(Dialog, { children: [
              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "h-8 px-3 text-[13px]", children: "查看" }) }),
              /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[640px]", children: [
                /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: p.title }) }),
                /* @__PURE__ */ jsx("div", { className: "text-sm whitespace-pre-wrap", children: p.content })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "sm", className: "h-8 px-3 text-[13px]", onClick: () => removePrompt(p.id), children: "删除" })
          ] })
        ] }, p.id)) }) })
      ] }),
      notice && /* @__PURE__ */ jsx(Alert, { className: "mb-2", children: /* @__PURE__ */ jsx(AlertDescription, { children: notice }) })
    ] })
  ] }) }) }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  return /* @__PURE__ */ jsx("div", { className: "max-w-[1200px] mx-auto px-4 py-6", children: /* @__PURE__ */ jsx(
    "article",
    {
      className: "markdown-body",
      style: { fontSize: "13px", backgroundColor: "transparent" },
      dangerouslySetInnerHTML: { __html: htmlContent }
    }
  ) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  return /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-4 py-6", children: [
    /* @__PURE__ */ jsx(Breadcrumbs, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ToolsLayout
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
  const notesByTag = getNotesByTag();
  return json({ notesByTag });
}
function DocsLayout() {
  var _a;
  const { notesByTag } = useLoaderData();
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];
  const toc = ((_a = lastMatch == null ? void 0 : lastMatch.data) == null ? void 0 : _a.toc) ?? [];
  return /* @__PURE__ */ jsx("div", { className: "max-w-[1200px] mx-auto px-4 py-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[240px,1fr,260px] gap-8", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden md:block", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FolderOpen, { className: "h-4 w-4" }),
        "笔记列表"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6 overflow-y-auto max-h-[calc(100vh-160px)] pr-2", children: notesByTag.map(({ tag, notes }) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-[12px] font-semibold mb-2", children: [
          tag,
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "(",
            notes.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: notes.map((note) => /* @__PURE__ */ jsx(
          Link,
          {
            to: `/docs/${encodeURIComponent(note.tag)}/${encodeURIComponent(note.slug)}`,
            className: "block text-sm text-foreground/80 hover:text-foreground truncate",
            title: note.title,
            children: note.title
          },
          note.filePath
        )) })
      ] }, tag)) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "min-w-0", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx("aside", { className: "hidden lg:block", children: toc.length > 0 && /* @__PURE__ */ jsxs("div", { className: "sticky top-20 border-l pl-6", children: [
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
  ] }) });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsLayout,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client.js", "imports": ["/assets/jsx-runtime.js", "/assets/index2.js", "/assets/index.js", "/assets/components.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root.js", "imports": ["/assets/jsx-runtime.js", "/assets/index2.js", "/assets/index.js", "/assets/components.js", "/assets/utils.js", "/assets/react-icons.esm.js", "/assets/Combination.js", "/assets/createLucideIcon.js"], "css": [] }, "routes/docs.$tag.$slug": { "id": "routes/docs.$tag.$slug", "parentId": "routes/docs", "path": ":tag/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/docs._tag._slug.js", "imports": ["/assets/jsx-runtime.js", "/assets/components.js", "/assets/createLucideIcon.js", "/assets/index.js", "/assets/index2.js"], "css": ["/assets/github-markdown.css"] }, "routes/tools._index": { "id": "routes/tools._index", "parentId": "routes/tools", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools._index.js", "imports": [], "css": [] }, "routes/api.prompts": { "id": "routes/api.prompts", "parentId": "root", "path": "api/prompts", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.prompts.js", "imports": [], "css": [] }, "routes/docs._index": { "id": "routes/docs._index", "parentId": "routes/docs", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs._index.js", "imports": ["/assets/jsx-runtime.js", "/assets/components.js", "/assets/createLucideIcon.js", "/assets/index2.js", "/assets/index.js"], "css": [] }, "routes/tools.math": { "id": "routes/tools.math", "parentId": "routes/tools", "path": "math", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.math.js", "imports": ["/assets/jsx-runtime.js", "/assets/input.js", "/assets/utils.js", "/assets/react-icons.esm.js", "/assets/createLucideIcon.js", "/assets/index2.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index.js", "imports": ["/assets/jsx-runtime.js", "/assets/input.js", "/assets/utils.js", "/assets/Combination.js", "/assets/createLucideIcon.js", "/assets/index2.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about.js", "imports": ["/assets/jsx-runtime.js"], "css": ["/assets/github-markdown.css"] }, "routes/tools": { "id": "routes/tools", "parentId": "root", "path": "tools", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.js", "imports": ["/assets/jsx-runtime.js", "/assets/index.js", "/assets/createLucideIcon.js"], "css": [] }, "routes/docs": { "id": "routes/docs", "parentId": "root", "path": "docs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs.js", "imports": ["/assets/jsx-runtime.js", "/assets/components.js", "/assets/createLucideIcon.js", "/assets/index.js", "/assets/index2.js"], "css": [] } }, "url": "/assets/manifest-6e89e0d6.js", "version": "6e89e0d6" };
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
  "routes/api.prompts": {
    id: "routes/api.prompts",
    parentId: "root",
    path: "api/prompts",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/docs._index": {
    id: "routes/docs._index",
    parentId: "routes/docs",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "routes/tools.math": {
    id: "routes/tools.math",
    parentId: "routes/tools",
    path: "math",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/tools": {
    id: "routes/tools",
    parentId: "root",
    path: "tools",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/docs": {
    id: "routes/docs",
    parentId: "root",
    path: "docs",
    index: void 0,
    caseSensitive: void 0,
    module: route9
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
