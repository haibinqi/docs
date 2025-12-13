import { jsx, jsxs } from "react/jsx-runtime";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData, useLocation } from "@remix-run/react";
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
import process from "vite-plugin-node-polyfills/shims/process";
import fs from "fs";
import matter from "gray-matter";
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
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function assertPath(path2) {
  if (typeof path2 !== "string") {
    throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
  }
}
function normalizeStringPosix(path2, allowAboveRoot) {
  var res = "";
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path2.length; ++i) {
    if (i < path2.length)
      code = path2.charCodeAt(i);
    else if (code === 47)
      break;
    else
      code = 47;
    if (code === 47) {
      if (lastSlash === i - 1 || dots === 1) ;
      else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += "/..";
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path2.slice(lastSlash + 1, i);
        else
          res = path2.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}
var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = "";
    var resolvedAbsolute = false;
    var cwd;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path2;
      if (i >= 0)
        path2 = arguments[i];
      else {
        if (cwd === void 0)
          cwd = process.cwd();
        path2 = cwd;
      }
      assertPath(path2);
      if (path2.length === 0) {
        continue;
      }
      resolvedPath = path2 + "/" + resolvedPath;
      resolvedAbsolute = path2.charCodeAt(0) === 47;
    }
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return "/" + resolvedPath;
      else
        return "/";
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return ".";
    }
  },
  normalize: function normalize(path2) {
    assertPath(path2);
    if (path2.length === 0) return ".";
    var isAbsolute2 = path2.charCodeAt(0) === 47;
    var trailingSeparator = path2.charCodeAt(path2.length - 1) === 47;
    path2 = normalizeStringPosix(path2, !isAbsolute2);
    if (path2.length === 0 && !isAbsolute2) path2 = ".";
    if (path2.length > 0 && trailingSeparator) path2 += "/";
    if (isAbsolute2) return "/" + path2;
    return path2;
  },
  isAbsolute: function isAbsolute(path2) {
    assertPath(path2);
    return path2.length > 0 && path2.charCodeAt(0) === 47;
  },
  join: function join() {
    if (arguments.length === 0)
      return ".";
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === void 0)
          joined = arg;
        else
          joined += "/" + arg;
      }
    }
    if (joined === void 0)
      return ".";
    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to) return "";
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47) {
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47) {
            lastCommonSep = i;
          } else if (i === 0) {
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47)
        lastCommonSep = i;
    }
    var out = "";
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47) {
        if (out.length === 0)
          out += "..";
        else
          out += "/..";
      }
    }
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47)
        ++toStart;
      return to.slice(toStart);
    }
  },
  _makeLong: function _makeLong(path2) {
    return path2;
  },
  dirname: function dirname(path2) {
    assertPath(path2);
    if (path2.length === 0) return ".";
    var code = path2.charCodeAt(0);
    var hasRoot = code === 47;
    var end = -1;
    var matchedSlash = true;
    for (var i = path2.length - 1; i >= 1; --i) {
      code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path2.slice(0, end);
  },
  basename: function basename(path2, ext) {
    if (ext !== void 0 && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
    assertPath(path2);
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (ext !== void 0 && ext.length > 0 && ext.length <= path2.length) {
      if (ext.length === path2.length && ext === path2) return "";
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path2.length - 1; i >= 0; --i) {
        var code = path2.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) end = firstNonSlashEnd;
      else if (end === -1) end = path2.length;
      return path2.slice(start, end);
    } else {
      for (i = path2.length - 1; i >= 0; --i) {
        if (path2.charCodeAt(i) === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) return "";
      return path2.slice(start, end);
    }
  },
  extname: function extname(path2) {
    assertPath(path2);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var preDotState = 0;
    for (var i = path2.length - 1; i >= 0; --i) {
      var code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path2.slice(startDot, end);
  },
  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format("/", pathObject);
  },
  parse: function parse(path2) {
    assertPath(path2);
    var ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path2.length === 0) return ret;
    var code = path2.charCodeAt(0);
    var isAbsolute2 = code === 47;
    var start;
    if (isAbsolute2) {
      ret.root = "/";
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path2.length - 1;
    var preDotState = 0;
    for (; i >= start; --i) {
      code = path2.charCodeAt(i);
      if (code === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46) {
        if (startDot === -1) startDot = i;
        else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute2) ret.base = ret.name = path2.slice(1, end);
        else ret.base = ret.name = path2.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute2) {
        ret.name = path2.slice(1, startDot);
        ret.base = path2.slice(1, end);
      } else {
        ret.name = path2.slice(startPart, startDot);
        ret.base = path2.slice(startPart, end);
      }
      ret.ext = path2.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path2.slice(0, startPart - 1);
    else if (isAbsolute2) ret.dir = "/";
    return ret;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
posix.posix = posix;
var pathBrowserify = posix;
const path = /* @__PURE__ */ getDefaultExportFromCjs(pathBrowserify);
const CONTENT_DIR = path.join(process.cwd(), "content");
function getAllNotes() {
  const notes = [];
  if (!fs.existsSync(CONTENT_DIR)) {
    return notes;
  }
  const folders = fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
  for (const folder of folders) {
    const folderPath = path.join(CONTENT_DIR, folder);
    const files = fs.readdirSync(folderPath).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const stats = fs.statSync(filePath);
      notes.push({
        slug: file.replace(/\.(md|mdx)$/, ""),
        title: data.title || file.replace(/\.(md|mdx)$/, ""),
        content: content.trim(),
        tag: folder,
        filePath: `${folder}/${file}`,
        modifiedAt: stats.mtime.toISOString().split("T")[0]
      });
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
  const filePath = path.join(CONTENT_DIR, tag, `${slug}.md`);
  const mdxPath = path.join(CONTENT_DIR, tag, `${slug}.mdx`);
  let actualPath = "";
  if (fs.existsSync(filePath)) {
    actualPath = filePath;
  } else if (fs.existsSync(mdxPath)) {
    actualPath = mdxPath;
  } else {
    return null;
  }
  const fileContent = fs.readFileSync(actualPath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = fs.statSync(actualPath);
  const fileName = path.basename(actualPath);
  return {
    slug,
    title: data.title || slug,
    content: content.trim(),
    tag,
    filePath: `${tag}/${fileName}`,
    modifiedAt: stats.mtime.toISOString().split("T")[0]
  };
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
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
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
  return json({ notesByTag });
}
function DocsIndexPage() {
  const { notesByTag } = useLoaderData();
  if (notesByTag.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-muted-foreground", children: [
      /* @__PURE__ */ jsx(FileText, { className: "h-16 w-16 mb-4 opacity-20" }),
      /* @__PURE__ */ jsx("p", { children: "暂无笔记" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2", children: [
        "在 ",
        /* @__PURE__ */ jsx("code", { className: "bg-muted px-2 py-1 rounded", children: "content/" }),
        " 目录创建 md 文件"
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
  const [format2, setFormat] = useState("horizontal");
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
          /* @__PURE__ */ jsxs(RadioGroup, { value: format2, onValueChange: (v) => setFormat(v), className: "flex gap-4 items-center h-8", children: [
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
          className: `grid w-full ${format2 === "vertical" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-5 gap-x-12 gap-y-12" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 gap-x-12 gap-y-8"}`,
          children: problems.map((p, i) => /* @__PURE__ */ jsx("div", { className: "font-mono text-xl flex justify-center", style: { breakInside: "avoid" }, children: format2 === "vertical" ? p.operator === "/" ? (
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
    async function parse2() {
      const html = await marked.parse(CONTENT);
      setHtmlContent(html);
    }
    parse2();
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
const serverManifest = { "entry": { "module": "/assets/entry.client-CcXv6cDh.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-u55fAOmI.js", "/assets/index-Drv927az.js", "/assets/components-CygCA5-A.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-_Bshli8p.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-u55fAOmI.js", "/assets/index-Drv927az.js", "/assets/components-CygCA5-A.js", "/assets/react-icons.esm-hryL2ptm.js", "/assets/utils-BafzuVJE.js", "/assets/createLucideIcon-3FgSs6nL.js"], "css": ["/assets/root-BAUJX8W4.css"] }, "routes/docs.$tag.$slug": { "id": "routes/docs.$tag.$slug", "parentId": "routes/docs", "path": ":tag/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs._tag._slug-DiBFHWut.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/components-CygCA5-A.js", "/assets/createLucideIcon-3FgSs6nL.js", "/assets/index-u55fAOmI.js", "/assets/index-Drv927az.js"], "css": ["/assets/github-markdown-Mfi8Kzjz.css"] }, "routes/tools._index": { "id": "routes/tools._index", "parentId": "routes/tools", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools._index-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/docs._index": { "id": "routes/docs._index", "parentId": "routes/docs", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs._index-VxqXupWN.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/components-CygCA5-A.js", "/assets/createLucideIcon-3FgSs6nL.js", "/assets/index-u55fAOmI.js", "/assets/index-Drv927az.js"], "css": [] }, "routes/tools.math": { "id": "routes/tools.math", "parentId": "routes/tools", "path": "math", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools.math-CsX_1i7s.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-DzWdpVie.js", "/assets/utils-BafzuVJE.js", "/assets/react-icons.esm-hryL2ptm.js", "/assets/createLucideIcon-3FgSs6nL.js", "/assets/index-u55fAOmI.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-D0_k_iqe.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/button-DzWdpVie.js", "/assets/components-CygCA5-A.js", "/assets/utils-BafzuVJE.js", "/assets/index-u55fAOmI.js", "/assets/index-Drv927az.js"], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about-wKbtEu1z.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js"], "css": ["/assets/github-markdown-Mfi8Kzjz.css"] }, "routes/tools": { "id": "routes/tools", "parentId": "root", "path": "tools", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/tools-_8Q5ozeV.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-Drv927az.js", "/assets/createLucideIcon-3FgSs6nL.js"], "css": [] }, "routes/docs": { "id": "routes/docs", "parentId": "root", "path": "docs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/docs-zBhqxjG2.js", "imports": ["/assets/jsx-runtime-BDw8OB7t.js", "/assets/index-Drv927az.js"], "css": [] } }, "url": "/assets/manifest-48e88b9f.js", "version": "48e88b9f" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename2 = "/";
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
  basename2 as basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
