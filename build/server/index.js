import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData, useFetcher, useSearchParams, useLocation } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { Sun, Moon, Github, Printer, X, ChevronDown, ChevronUp, Check, Plus, Filter, Eye, Trash2, Sparkles, Key, Loader2, Send, AlertTriangle } from "lucide-react";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { json } from "@remix-run/cloudflare";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
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
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container flex h-14 max-w-screen-2xl items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "mr-4 hidden md:flex", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "mr-6 flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "hidden font-bold sm:inline-block", children: "你会开飞机吗" }) }),
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-6 text-sm", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/docs",
            className: "transition-colors hover:text-foreground/80 text-foreground/60",
            children: "Docs"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/tools/multiplication",
            className: "transition-colors hover:text-foreground/80 text-foreground/60",
            children: "tools"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/about",
            className: "transition-colors hover:text-foreground/80 text-foreground/60",
            children: "About"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-between space-x-2 md:justify-end", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex-1 md:w-auto md:flex-none", children: /* @__PURE__ */ jsx("div", { className: "relative inline-flex h-9 w-full items-center justify-start rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:w-64 sm:pr-12", children: /* @__PURE__ */ jsx("span", { className: "inline-flex", children: "Search..." }) }) }),
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "https://github.com/remix-run/remix",
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0",
            children: [
              /* @__PURE__ */ jsx(Github, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "GitHub" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(ThemeToggle, {})
      ] })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "py-6 md:px-8 md:py-0", children: /* @__PURE__ */ jsx("div", { className: "container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row", children: /* @__PURE__ */ jsxs("p", { className: "text-balance text-center text-sm leading-loose text-muted-foreground md:text-left", children: [
    "Built by Antigravity. The source code is available on",
    " ",
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#",
        target: "_blank",
        rel: "noreferrer",
        className: "font-medium underline underline-offset-4",
        children: "GitHub"
      }
    ),
    "."
  ] }) }) });
}
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
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const frontmatter = {
  "title": "google-antivity-issue",
  "description": null
};
function _createMdxContent(props) {
  const _components = {
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return jsxs(Fragment, {
    children: [jsxs(_components.p, {
      children: ["Antigravity", jsx(_components.strong, {
        children: "使用方法"
      })]
    }), "\n", jsxs(_components.ol, {
      children: ["\n", jsx(_components.li, {
        children: "下载安装"
      }), "\n", jsxs(_components.li, {
        children: ["登入", "\n", jsxs(_components.ol, {
          children: ["\n", jsx(_components.li, {
            children: "修改google账号归属地，https://policies.google.com/country-association-form?pli=1，改为美国加利福尼亚州"
          }), "\n", jsx(_components.li, {
            children: "TUN"
          }), "\n"]
        }), "\n"]
      }), "\n", jsx(_components.li, {
        children: "运行Antigravity并使用google登入"
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsx(MDXLayout, {
    ...props,
    children: jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MDXContent,
  frontmatter
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
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
function MultiplicationGenerator() {
  const [range1, setRange1] = useState("1-9999");
  const [range2, setRange2] = useState("1-9999");
  const [count, setCount] = useState(20);
  const [problems, setProblems] = useState([]);
  const generateProblems = () => {
    const parseRange = (rangeStr) => {
      const parts = rangeStr.split("-").map((p) => parseInt(p.trim(), 10));
      if (parts.length === 1) return { min: 1, max: parts[0] || 9999 };
      return { min: parts[0] || 1, max: parts[1] || 9999 };
    };
    const r1 = parseRange(range1);
    const r2 = parseRange(range2);
    const newProblems = [];
    for (let i = 0; i < count; i++) {
      const num1 = Math.floor(Math.random() * (r1.max - r1.min + 1)) + r1.min;
      const num2 = Math.floor(Math.random() * (r2.max - r2.min + 1)) + r2.min;
      newProblems.push({ num1, num2 });
    }
    setProblems(newProblems);
  };
  const handlePrint = () => {
    window.print();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "print:hidden space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "竖式计算生成" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "生成多位数乘多位数的竖式计算练习题。" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "range1", children: "乘数1范围 (例如 10-99)" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "range1",
              value: range1,
              onChange: (e) => setRange1(e.target.value),
              placeholder: "1-9999"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "range2", children: "乘数2范围 (例如 10-99)" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "range2",
              value: range2,
              onChange: (e) => setRange2(e.target.value),
              placeholder: "1-9999"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "count", children: "题目数量" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "count",
              type: "number",
              value: count,
              onChange: (e) => setCount(parseInt(e.target.value) || 0)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsx(Button, { onClick: generateProblems, children: "生成试卷" }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: handlePrint, children: [
            /* @__PURE__ */ jsx(Printer, { className: "mr-2 h-4 w-4" }),
            " 打印A4"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "print:block", id: "print-area", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden print:block mb-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "竖式计算练习" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-center gap-8 text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "日期: ______________" }),
          /* @__PURE__ */ jsx("span", { children: "耗时: ______________" }),
          /* @__PURE__ */ jsx("span", { children: "得分: ______________" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 print:grid-cols-5 gap-x-8 gap-y-16 print:gap-y-12 w-full", children: problems.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "font-mono text-xl", style: { letterSpacing: "0.2em" }, children: [
        /* @__PURE__ */ jsx("div", { className: "text-right", children: p.num1 }),
        /* @__PURE__ */ jsxs("div", { className: "text-right border-b-2 border-black relative", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-0 bottom-0.5", children: "×" }),
          p.num2
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-12" }),
        " "
      ] }, i)) }),
      problems.length === 0 && /* @__PURE__ */ jsx("div", { className: "print:hidden text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg", children: "点击上方“生成试卷”按钮开始" })
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
            /* Hide everything except root and print area logic is usually handled by hiding unrelated parents, 
               but in single page app it's trickier. 
               Strategy: Hide all siblings of #print-area or use specific print-hidden utility 
            */
            nav, header, aside, footer, .print\\:hidden {
                display: none !important;
            }
            
            /* Ensure main content takes full width */
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
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MultiplicationGenerator
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
const loader$1 = async ({ request, context }) => {
  const { env } = context.cloudflare;
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  let query = "SELECT * FROM prompts";
  const params = [];
  if (category && category !== "All") {
    query += " WHERE category = ?";
    params.push(category);
  }
  query += " ORDER BY created_at DESC";
  const stmt = env.DB.prepare(query);
  const { results } = await (params.length > 0 ? stmt.bind(...params) : stmt).all();
  return json({ prompts: results, currentCategory: category || "All" });
};
const action$1 = async ({ request, context }) => {
  const { env } = context.cloudflare;
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "add") {
    const content = formData.get("content");
    const category = formData.get("category") || "General";
    if (!(content == null ? void 0 : content.trim())) {
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
  { value: "Other", label: "其他 (Other)" }
];
function PromptsPage() {
  var _a;
  const { prompts, currentCategory } = useLoaderData();
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAdding = fetcher.state === "submitting" && ((_a = fetcher.formData) == null ? void 0 : _a.get("intent")) === "add";
  const handleFilterChange = (value) => {
    setSearchParams((prev) => {
      if (value === "All") {
        prev.delete("category");
      } else {
        prev.set("category", value);
      }
      return prev;
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 p-6 max-w-5xl mx-auto h-[calc(100vh-4rem)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 flex-shrink-0", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "提示词合集" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "高效管理和检索您的 AI 提示词库" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 flex-1 min-h-0", children: [
      /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", className: "grid gap-4 rounded-lg border p-4 bg-muted/30 flex-shrink-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-semibold", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
          " 新增提示词"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[180px] flex-shrink-0", children: /* @__PURE__ */ jsxs(Select, { name: "category", defaultValue: "General", children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "选择分类" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: CATEGORIES.map((cat) => /* @__PURE__ */ jsx(SelectItem, { value: cat.value, children: cat.label }, cat.value)) })
          ] }) }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              name: "content",
              placeholder: "输入提示词内容...",
              className: "min-h-[80px] flex-1 bg-background resize-none",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            name: "intent",
            value: "add",
            disabled: isAdding,
            children: isAdding ? "Saving..." : "保存提示词"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-md border bg-card flex-1 min-h-0 flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 p-3 grid grid-cols-[100px_1fr_120px] gap-4 text-sm font-medium text-muted-foreground border-b flex-shrink-0 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Filter, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxs(Select, { value: currentCategory, onValueChange: handleFilterChange, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 border-none bg-transparent hover:bg-background/50 focus:ring-0 w-[110px] p-0 shadow-none", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "分类筛选" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "All", children: "全部 (All)" }),
                CATEGORIES.map((cat) => /* @__PURE__ */ jsx(SelectItem, { value: cat.value, children: cat.label }, cat.value))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { children: "内容预览" }),
          /* @__PURE__ */ jsx("div", { className: "text-right", children: "操作" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-y-auto p-0", children: prompts.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-12 text-muted-foreground", children: currentCategory !== "All" ? "该分类下暂无数据" : "暂无数据" }) : /* @__PURE__ */ jsx("div", { className: "divide-y", children: prompts.map((prompt) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[100px_1fr_120px] gap-4 p-3 items-center hover:bg-muted/30 transition-colors", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", children: prompt.category || "General" }) }),
          /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-mono text-muted-foreground", children: prompt.content }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxs(Dialog, { children: [
              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50", children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl max-h-[80vh] flex flex-col", children: [
                /* @__PURE__ */ jsxs(DialogHeader, { children: [
                  /* @__PURE__ */ jsx(DialogTitle, { children: "提示词详情" }),
                  /* @__PURE__ */ jsxs(DialogDescription, { children: [
                    "分类: ",
                    prompt.category || "General",
                    " | 创建时间: ",
                    new Date(prompt.created_at).toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto mt-4 p-4 rounded-md bg-muted/30 border font-mono text-sm whitespace-pre-wrap break-words", children: prompt.content })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", className: "inline-block", children: [
              /* @__PURE__ */ jsx("input", { type: "hidden", name: "id", value: prompt.id }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  name: "intent",
                  value: "delete",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] })
        ] }, prompt.id)) }) })
      ] })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: PromptsPage,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
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
const loader = async ({ context }) => {
  const { env } = context.cloudflare;
  return json({ hasEnvKey: !!env.GEMINI_API_KEY });
};
const action = async ({ request, context }) => {
  var _a, _b, _c, _d, _e, _f;
  const { env } = context.cloudflare;
  const formData = await request.formData();
  const prompt = formData.get("prompt");
  const model = formData.get("model") || "gemini-1.5-pro";
  const apiKey = formData.get("apiKey") || env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "API Key is required" }, { status: 400 });
  }
  if (!(prompt == null ? void 0 : prompt.trim())) {
    return json({ error: "Prompt is required" }, { status: 400 });
  }
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      const errorMessage = ((_a = errorData.error) == null ? void 0 : _a.message) || "Failed to fetch from Gemini API";
      return json({ error: errorMessage }, { status: response.status });
    }
    const data = await response.json();
    const text = (_f = (_e = (_d = (_c = (_b = data.candidates) == null ? void 0 : _b[0]) == null ? void 0 : _c.content) == null ? void 0 : _d.parts) == null ? void 0 : _e[0]) == null ? void 0 : _f.text;
    if (!text) {
      return json({ error: "No text generated from Gemini." }, { status: 500 });
    }
    return json({ response: text });
  } catch (error) {
    console.error("Gemini Request Failed:", error);
    return json({ error: error.message || "Network error occurred" }, { status: 500 });
  }
};
function GeminiPage() {
  var _a, _b;
  const { hasEnvKey } = useLoaderData();
  const fetcher = useFetcher();
  const [apiKey, setApiKey] = useState("");
  useEffect(() => {
    const storedKey = localStorage.getItem("gemini_api_key");
    if (storedKey) setApiKey(storedKey);
  }, []);
  const handleKeyChange = (e) => {
    const newValue = e.target.value;
    setApiKey(newValue);
    localStorage.setItem("gemini_api_key", newValue);
  };
  const [model, setModel] = useState("gemini-1.5-pro");
  const [prompt, setPrompt] = useState("");
  const isSubmitting = fetcher.state === "submitting";
  const resultRef = useRef(null);
  useEffect(() => {
    var _a2, _b2;
    if ((_a2 = fetcher.data) == null ? void 0 : _a2.response) {
      (_b2 = resultRef.current) == null ? void 0 : _b2.scrollIntoView({ behavior: "smooth" });
    }
  }, [fetcher.data]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 p-6 max-w-4xl mx-auto min-h-[calc(100vh-4rem)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold tracking-tight flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-8 w-8 text-yellow-500" }),
        "Gemini 智能对话"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "直接与 Google Gemini 大模型进行对话，探索无限创意" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "配置" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "设置 API 密钥和模型参数" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "model", children: "模型选择" }),
            /* @__PURE__ */ jsxs(Select, { value: model, onValueChange: setModel, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { id: "model", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select model" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "gemini-1.5-pro", children: "Gemini 1.5 Pro (推荐)" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "gemini-1.5-flash", children: "Gemini 1.5 Flash (快速)" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "gemini-pro", children: "Gemini 1.0 Pro" })
              ] })
            ] })
          ] }),
          !hasEnvKey && /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "apiKey", children: "API Key (未设置环境变量)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Key, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "apiKey",
                  type: "password",
                  placeholder: "输入 Google AI Studio Key",
                  className: "pl-9",
                  value: apiKey,
                  onChange: handleKeyChange
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Key将保存在本地浏览器中。" })
          ] }),
          hasEnvKey && /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "API Key" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center h-10 px-3 rounded-md border bg-muted text-muted-foreground text-sm", children: "Configured in Environment" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", className: "grid gap-4", children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "apiKey", value: apiKey }),
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "model", value: model }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Textarea,
            {
              name: "prompt",
              placeholder: "输入您的问题、创意或需求...",
              className: "min-h-[150px] p-4 text-base resize-y shadow-sm font-mono",
              value: prompt,
              onChange: (e) => setPrompt(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  fetcher.submit(e.currentTarget.form);
                }
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 right-3 text-xs text-muted-foreground", children: "Cmd/Ctrl + Enter 发送" })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            size: "lg",
            disabled: !prompt.trim() || isSubmitting || !hasEnvKey && !apiKey,
            className: "w-full md:w-auto md:ml-auto gap-2",
            children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
              "思考中..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
              "发送消息"
            ] })
          }
        )
      ] }) }),
      ((_a = fetcher.data) == null ? void 0 : _a.error) && /* @__PURE__ */ jsxs(Alert, { variant: "destructive", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx(AlertTitle, { children: "Error" }),
        /* @__PURE__ */ jsx(AlertDescription, { children: fetcher.data.error })
      ] }),
      ((_b = fetcher.data) == null ? void 0 : _b.response) && /* @__PURE__ */ jsxs(Card, { className: "bg-muted/30 border-primary/20", ref: resultRef, children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
          "Gemini 的回答"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "prose prose-sm md:prose-base dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed", children: fetcher.data.response }) })
      ] })
    ] })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: GeminiPage,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function DocsIndex() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", children: "Introduction" }),
    /* @__PURE__ */ jsx("p", { className: "leading-7 [&:not(:first-child)]:mt-6", children: "Welcome to the documentation. This is a replication of the nextjscn.org style using Remix." }),
    /* @__PURE__ */ jsx("h2", { className: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0", children: "Features" }),
    /* @__PURE__ */ jsxs("ul", { className: "my-6 ml-6 list-disc [&>li]:mt-2", children: [
      /* @__PURE__ */ jsx("li", { children: "Remix Framework" }),
      /* @__PURE__ */ jsx("li", { children: "Tailwind CSS Styling" }),
      /* @__PURE__ */ jsx("li", { children: "Shadcn UI Components" }),
      /* @__PURE__ */ jsx("li", { children: "Dark Mode Support" })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsIndex
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ jsx("section", { className: "space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32", children: /* @__PURE__ */ jsxs("div", { className: "container flex max-w-[64rem] flex-col items-center gap-4 text-center", children: [
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
    /* @__PURE__ */ jsxs("section", { id: "features", className: "container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold", children: "Features" }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7", children: "This project is an exact replica of the Next.js site style but built using Remix." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3", children: [
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
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const toolsNavItems = [
  {
    title: "学习工具",
    items: [
      {
        title: "竖式计算生成器",
        href: "/tools/multiplication"
      }
    ]
  },
  {
    title: "工作",
    items: [
      {
        title: "提示词合集",
        href: "/tools/prompts"
      },
      {
        title: "Gemini 对话",
        href: "/tools/gemini"
      }
    ]
  }
];
function ToolsSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  return /* @__PURE__ */ jsx("aside", { className: "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block", children: /* @__PURE__ */ jsx("div", { className: "h-full py-6 pr-6 lg:py-8", children: /* @__PURE__ */ jsx("div", { className: "w-full", children: toolsNavItems.map((item, index) => {
    var _a;
    return /* @__PURE__ */ jsxs("div", { className: "pb-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "mb-1 rounded-md px-2 py-1 text-sm font-semibold", children: item.title }),
      ((_a = item.items) == null ? void 0 : _a.length) && /* @__PURE__ */ jsx("div", { className: "grid grid-flow-row auto-rows-max text-sm", children: item.items.map((subItem, subIndex) => /* @__PURE__ */ jsx(
        Link,
        {
          to: subItem.href,
          className: cn(
            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
            pathname === subItem.href ? "text-foreground font-medium" : "text-muted-foreground"
          ),
          children: subItem.title
        },
        subIndex
      )) })
    ] }, index);
  }) }) }) });
}
function ToolsLayout() {
  return /* @__PURE__ */ jsxs("div", { className: "container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10", children: [
    /* @__PURE__ */ jsx(ToolsSidebar, {}),
    /* @__PURE__ */ jsx("main", { className: "relative py-6 lg:gap-10 lg:py-8", children: /* @__PURE__ */ jsx("div", { className: "mx-auto w-full min-w-0", children: /* @__PURE__ */ jsx(Outlet, {}) }) })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ToolsLayout
}, Symbol.toStringTag, { value: "Module" }));
const sidebarNavItems = [
  {
    title: "Google issue",
    items: [
      {
        title: "antivity issue",
        href: "/docs/google-antivity-issue"
      }
    ]
  },
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs"
      },
      {
        title: "Installation",
        href: "/docs/installation"
      }
    ]
  },
  {
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/docs/components/button"
      },
      {
        title: "Card",
        href: "/docs/components/card"
      }
    ]
  }
];
function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  return /* @__PURE__ */ jsx("aside", { className: "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block", children: /* @__PURE__ */ jsx("div", { className: "h-full py-6 pr-6 lg:py-8", children: /* @__PURE__ */ jsx("div", { className: "w-full", children: sidebarNavItems.map((item, index) => {
    var _a;
    return /* @__PURE__ */ jsxs("div", { className: "pb-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "mb-1 rounded-md px-2 py-1 text-sm font-semibold", children: item.title }),
      ((_a = item.items) == null ? void 0 : _a.length) && /* @__PURE__ */ jsx("div", { className: "grid grid-flow-row auto-rows-max text-sm", children: item.items.map((subItem, subIndex) => /* @__PURE__ */ jsx(
        Link,
        {
          to: subItem.href,
          className: cn(
            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
            pathname === subItem.href ? "text-foreground font-medium" : "text-muted-foreground"
          ),
          children: subItem.title
        },
        subIndex
      )) })
    ] }, index);
  }) }) }) });
}
function DocsLayout() {
  return /* @__PURE__ */ jsxs("div", { className: "container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-full min-w-0", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx("div", { className: "hidden text-sm xl:block", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-y-auto pt-4", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "On This Page" }),
        /* @__PURE__ */ jsx("ul", { className: "m-0 list-none", children: /* @__PURE__ */ jsx("li", { className: "mt-0 pt-2", children: /* @__PURE__ */ jsx("a", { href: "#", className: "inline-block no-underline transition-colors hover:text-foreground text-muted-foreground", children: "Top" }) }) })
      ] }) })
    ] })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsLayout
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CgkZ_TKt.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/components-uY1RQYdm.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-Rg2uli1e.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/components-uY1RQYdm.js", "/assets/createLucideIcon-3FgSs6nL.js"], "css": ["/assets/root-BgK8IcSo.css"] }, "routes/docs.google-antivity-issue": { "id": "routes/docs.google-antivity-issue", "parentId": "routes/docs", "path": "google-antivity-issue", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs.google-antivity-issue-CqwUWCcr.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js"], "css": [] }, "routes/tools.multiplication": { "id": "routes/tools.multiplication", "parentId": "routes/tools", "path": "multiplication", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.multiplication-CAQ_Tpf4.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-BF-7J69j.js", "/assets/label-BvVeiCgh.js", "/assets/createLucideIcon-3FgSs6nL.js", "/assets/utils-CDN07tui.js"], "css": [] }, "routes/tools.prompts": { "id": "routes/tools.prompts", "parentId": "routes/tools", "path": "prompts", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.prompts-DU_Goovy.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-BF-7J69j.js", "/assets/select-Df6w1pt1.js", "/assets/utils-CDN07tui.js", "/assets/createLucideIcon-3FgSs6nL.js", "/assets/components-uY1RQYdm.js"], "css": [] }, "routes/tools.gemini": { "id": "routes/tools.gemini", "parentId": "routes/tools", "path": "gemini", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.gemini-C2VGyrkN.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-BF-7J69j.js", "/assets/select-Df6w1pt1.js", "/assets/label-BvVeiCgh.js", "/assets/utils-CDN07tui.js", "/assets/components-uY1RQYdm.js", "/assets/createLucideIcon-3FgSs6nL.js"], "css": [] }, "routes/docs._index": { "id": "routes/docs._index", "parentId": "routes/docs", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs._index-tfclapco.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DfAzkht2.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-BF-7J69j.js", "/assets/components-uY1RQYdm.js", "/assets/utils-CDN07tui.js"], "css": [] }, "routes/tools": { "id": "routes/tools", "parentId": "root", "path": "tools", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools-DBpfpGKm.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/utils-CDN07tui.js", "/assets/components-uY1RQYdm.js"], "css": [] }, "routes/docs": { "id": "routes/docs", "parentId": "root", "path": "docs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs-Coe5xjxK.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/utils-CDN07tui.js", "/assets/components-uY1RQYdm.js"], "css": [] } }, "url": "/assets/manifest-9f2d1c73.js", "version": "9f2d1c73" };
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
  "routes/docs.google-antivity-issue": {
    id: "routes/docs.google-antivity-issue",
    parentId: "routes/docs",
    path: "google-antivity-issue",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/tools.multiplication": {
    id: "routes/tools.multiplication",
    parentId: "routes/tools",
    path: "multiplication",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/tools.prompts": {
    id: "routes/tools.prompts",
    parentId: "routes/tools",
    path: "prompts",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/tools.gemini": {
    id: "routes/tools.gemini",
    parentId: "routes/tools",
    path: "gemini",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/docs._index": {
    id: "routes/docs._index",
    parentId: "routes/docs",
    path: void 0,
    index: true,
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
