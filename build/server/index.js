import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useLocation } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { Sun, Moon, Github, Printer } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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
      /* @__PURE__ */ jsx(Link, { to: "/", className: "mr-6 flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "hidden font-bold sm:inline-block", children: "你开开飞机吗" }) }),
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
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsLayout
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Cy4ET2b8.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-BXeFEaJ_.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-Dl2KSXUU.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-BXeFEaJ_.js", "/assets/createLucideIcon-BjpNcHng.js"], "css": ["/assets/root-Cg0El1l6.css"] }, "routes/docs.google-antivity-issue": { "id": "routes/docs.google-antivity-issue", "parentId": "routes/docs", "path": "google-antivity-issue", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs.google-antivity-issue-C2ChzCub.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/tools.multiplication": { "id": "routes/tools.multiplication", "parentId": "routes/tools", "path": "multiplication", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.multiplication-ChEKUvwq.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/button-Bxu6Tqv_.js", "/assets/utils-CDN07tui.js", "/assets/createLucideIcon-BjpNcHng.js"], "css": [] }, "routes/docs._index": { "id": "routes/docs._index", "parentId": "routes/docs", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs._index-CT9mo2tw.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-Eb8Rq7Ra.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/button-Bxu6Tqv_.js", "/assets/components-BXeFEaJ_.js", "/assets/utils-CDN07tui.js"], "css": [] }, "routes/tools": { "id": "routes/tools", "parentId": "root", "path": "tools", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools-D77pC1ZT.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/utils-CDN07tui.js", "/assets/components-BXeFEaJ_.js"], "css": [] }, "routes/docs": { "id": "routes/docs", "parentId": "root", "path": "docs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs-DhgJstlu.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/utils-CDN07tui.js", "/assets/components-BXeFEaJ_.js"], "css": [] } }, "url": "/assets/manifest-d434abe7.js", "version": "d434abe7" };
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
  "routes/docs._index": {
    id: "routes/docs._index",
    parentId: "routes/docs",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "routes/tools": {
    id: "routes/tools",
    parentId: "root",
    path: "tools",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/docs": {
    id: "routes/docs",
    parentId: "root",
    path: "docs",
    index: void 0,
    caseSensitive: void 0,
    module: route6
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
