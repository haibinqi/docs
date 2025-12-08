import{r as i,j as e}from"./jsx-runtime-56DGgGmo.js";import{c as N,B as f}from"./button-Bxu6Tqv_.js";import{c as _}from"./utils-CDN07tui.js";import{c as w}from"./createLucideIcon-BjpNcHng.js";/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],M=w("printer",k),o=i.forwardRef(({className:n,type:r,...a},m)=>e.jsx("input",{type:r,className:_("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",n),ref:m,...a}));o.displayName="Input";const C=N("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=i.forwardRef(({className:n,...r},a)=>e.jsx("label",{ref:a,className:_(C(),n),...r}));c.displayName="Label";function E(){const[n,r]=i.useState("1-9999"),[a,m]=i.useState("1-9999"),[x,b]=i.useState(20),[g,j]=i.useState([]),v=()=>{const t=d=>{const s=d.split("-").map(h=>parseInt(h.trim(),10));return s.length===1?{min:1,max:s[0]||9999}:{min:s[0]||1,max:s[1]||9999}},l=t(n),p=t(a),u=[];for(let d=0;d<x;d++){const s=Math.floor(Math.random()*(l.max-l.min+1))+l.min,h=Math.floor(Math.random()*(p.max-p.min+1))+p.min;u.push({num1:s,num2:h})}j(u)},y=()=>{window.print()};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"print:hidden space-y-6",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold tracking-tight",children:"竖式计算生成"}),e.jsx("p",{className:"text-muted-foreground",children:"生成多位数乘多位数的竖式计算练习题。"})]}),e.jsxs("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(c,{htmlFor:"range1",children:"乘数1范围 (例如 10-99)"}),e.jsx(o,{id:"range1",value:n,onChange:t=>r(t.target.value),placeholder:"1-9999"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(c,{htmlFor:"range2",children:"乘数2范围 (例如 10-99)"}),e.jsx(o,{id:"range2",value:a,onChange:t=>m(t.target.value),placeholder:"1-9999"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(c,{htmlFor:"count",children:"题目数量"}),e.jsx(o,{id:"count",type:"number",value:x,onChange:t=>b(parseInt(t.target.value)||0)})]}),e.jsxs("div",{className:"flex gap-2 justify-end",children:[e.jsx(f,{onClick:v,children:"生成试卷"}),e.jsxs(f,{variant:"outline",onClick:y,children:[e.jsx(M,{className:"mr-2 h-4 w-4"})," 打印A4"]})]})]})]}),e.jsxs("div",{className:"print:block",id:"print-area",children:[e.jsxs("div",{className:"hidden print:block mb-8 text-center",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"竖式计算练习"}),e.jsxs("div",{className:"mt-2 flex justify-center gap-8 text-sm",children:[e.jsx("span",{children:"日期: ______________"}),e.jsx("span",{children:"耗时: ______________"}),e.jsx("span",{children:"得分: ______________"})]})]}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 print:grid-cols-5 gap-x-8 gap-y-16 print:gap-y-12 w-full",children:g.map((t,l)=>e.jsxs("div",{className:"font-mono text-xl",style:{letterSpacing:"0.2em"},children:[e.jsx("div",{className:"text-right",children:t.num1}),e.jsxs("div",{className:"text-right border-b-2 border-black relative",children:[e.jsx("span",{className:"absolute left-0 bottom-0.5",children:"×"}),t.num2]}),e.jsx("div",{className:"h-12"})," "]},l))}),g.length===0&&e.jsx("div",{className:"print:hidden text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg",children:"点击上方“生成试卷”按钮开始"})]}),e.jsx("style",{children:`
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
      `})]})}export{E as default};
