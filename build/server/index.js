import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useLocation } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { ChevronDown, Calculator, Printer } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronRightIcon, CheckIcon, DotFilledIcon } from "@radix-ui/react-icons";
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
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsx("div", { className: "container flex h-14 max-w-screen-2xl items-center", children: /* @__PURE__ */ jsxs("div", { className: "mr-4 hidden md:flex", children: [
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
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 outline-none", children: [
          "工具 ",
          /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", children: /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/tools/math", children: "小学生口算" }) }) })
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
  return /* @__PURE__ */ jsx("footer", { className: "py-6 md:px-8 md:py-0", children: /* @__PURE__ */ jsx("div", { className: "container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row", children: /* @__PURE__ */ jsx("p", { className: "text-balance text-center text-sm leading-loose text-muted-foreground md:text-left", children: "Built by Qihaibin" }) }) });
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
const loader = async () => {
  return redirect("/tools/math");
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
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
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsIndex
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
  const [range1, setRange1] = useState("1-100");
  const [range2, setRange2] = useState("1-100");
  const [count, setCount] = useState(20);
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "print:hidden space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calculator, { className: "h-8 w-8 text-primary" }),
          "小学生口算生成器"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "自定义生成加减乘除口算题，支持竖式和横式。" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start bg-muted/30 p-4 rounded-lg border", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "range1", children: "数字1范围" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "range1",
                  value: range1,
                  onChange: (e) => setRange1(e.target.value),
                  placeholder: "1-100"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "range2", children: "数字2范围" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "range2",
                  value: range2,
                  onChange: (e) => setRange2(e.target.value),
                  placeholder: "1-100"
                }
              )
            ] })
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
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "运算符号" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["+", "-", "*", "/"].map((op) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  id: `op-${op}`,
                  checked: operators.includes(op),
                  onCheckedChange: () => toggleOperator(op)
                }
              ),
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: `op-${op}`,
                  className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  children: getOperatorSymbol(op)
                }
              )
            ] }, op)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "题目格式" }),
            /* @__PURE__ */ jsxs(RadioGroup, { value: format, onValueChange: (v) => setFormat(v), className: "flex gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(RadioGroupItem, { value: "horizontal", id: "r-horizontal" }),
                /* @__PURE__ */ jsx(Label, { htmlFor: "r-horizontal", children: "横式 (1 + 1 = )" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(RadioGroupItem, { value: "vertical", id: "r-vertical" }),
                /* @__PURE__ */ jsx(Label, { htmlFor: "r-vertical", children: "竖式" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 justify-end h-full", children: [
          /* @__PURE__ */ jsx(Button, { onClick: generateProblems, size: "lg", disabled: operators.length === 0, children: "生成试卷" }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: handlePrint, children: [
            /* @__PURE__ */ jsx(Printer, { className: "mr-2 h-4 w-4" }),
            " 打印A4"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "print:block min-h-[500px]", id: "print-area", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden print:block mb-6 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "口算能力测试" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex justify-center gap-12 text-sm", children: [
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
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
function ToolsLayout() {
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-[960px] flex-1 py-6 lg:py-8", children: /* @__PURE__ */ jsx("main", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "mx-auto w-full min-w-0", children: /* @__PURE__ */ jsx(Outlet, {}) }) }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DocsLayout
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C_y_Tdsi.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-u55fAOmI.js", "/assets/index-DASjYjjc.js", "/assets/components-CM53OEYS.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-B_60d_b5.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-u55fAOmI.js", "/assets/index-DASjYjjc.js", "/assets/components-CM53OEYS.js", "/assets/react-icons.esm-bRy50t4j.js", "/assets/index-DEgJNgjO.js", "/assets/utils-CDN07tui.js"], "css": ["/assets/root-CHjUW-X_.css"] }, "routes/docs.google-antivity-issue": { "id": "routes/docs.google-antivity-issue", "parentId": "routes/docs", "path": "google-antivity-issue", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs.google-antivity-issue-CqwUWCcr.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js"], "css": [] }, "routes/tools._index": { "id": "routes/tools._index", "parentId": "routes/tools", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools._index-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/docs._index": { "id": "routes/docs._index", "parentId": "routes/docs", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs._index-tfclapco.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js"], "css": [] }, "routes/tools.math": { "id": "routes/tools.math", "parentId": "routes/tools", "path": "math", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.math-CxT-vEuA.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-BRIOkNW8.js", "/assets/utils-CDN07tui.js", "/assets/index-DEgJNgjO.js", "/assets/react-icons.esm-bRy50t4j.js", "/assets/index-u55fAOmI.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DlHOAn4c.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-BRIOkNW8.js", "/assets/components-CM53OEYS.js", "/assets/index-DEgJNgjO.js", "/assets/utils-CDN07tui.js", "/assets/index-u55fAOmI.js", "/assets/index-DASjYjjc.js"], "css": [] }, "routes/tools": { "id": "routes/tools", "parentId": "root", "path": "tools", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools-Yv9A-_pN.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-DASjYjjc.js"], "css": [] }, "routes/docs": { "id": "routes/docs", "parentId": "root", "path": "docs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs-BghHuC-m.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/utils-CDN07tui.js", "/assets/index-DASjYjjc.js", "/assets/components-CM53OEYS.js", "/assets/index-u55fAOmI.js"], "css": [] } }, "url": "/assets/manifest-5623c103.js", "version": "5623c103" };
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
  "routes/tools": {
    id: "routes/tools",
    parentId: "root",
    path: "tools",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/docs": {
    id: "routes/docs",
    parentId: "root",
    path: "docs",
    index: void 0,
    caseSensitive: void 0,
    module: route7
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
