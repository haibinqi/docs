import{j as e}from"./jsx-runtime.js";import{a as c,O as i}from"./index.js";import{c as m}from"./createLucideIcon.js";/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],p=m("chevron-right",l);function x(){const o=c().pathname.split("/").filter(t=>t),a=t=>({docs:"文档",notes:"记录",tags:"标签",tools:"工具"})[t]||t.charAt(0).toUpperCase()+t.slice(1).replace(/-/g," ");return e.jsx("div",{className:"mb-4 flex items-center text-sm text-muted-foreground",children:o.map((t,s)=>{const n=a(t),r=s===o.length-1;return e.jsxs("div",{className:"flex items-center",children:[s>0&&e.jsx(p,{className:"h-4 w-4 mx-1"}),e.jsx("span",{className:r?"font-medium text-foreground":"",children:n})]},t+s)})})}function j(){return e.jsxs("div",{className:"max-w-[1200px] mx-auto px-4 py-6",children:[e.jsx(x,{}),e.jsx(i,{})]})}export{j as default};
