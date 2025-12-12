import{r as i,j as e}from"./jsx-runtime-BDw8OB7t.js";import{B as g}from"./button-BF-7J69j.js";import{L as d,I as o}from"./label-BvVeiCgh.js";import{c as f}from"./createLucideIcon-3FgSs6nL.js";import"./utils-CDN07tui.js";/**
 * @license lucide-react v0.556.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],k=f("printer",N);function P(){const[c,u]=i.useState("1-9999"),[m,_]=i.useState("1-9999"),[h,j]=i.useState(20),[p,v]=i.useState([]),y=()=>{const t=s=>{const n=s.split("-").map(l=>parseInt(l.trim(),10));return n.length===1?{min:1,max:n[0]||9999}:{min:n[0]||1,max:n[1]||9999}},a=t(c),r=t(m),x=[];for(let s=0;s<h;s++){const n=Math.floor(Math.random()*(a.max-a.min+1))+a.min,l=Math.floor(Math.random()*(r.max-r.min+1))+r.min;x.push({num1:n,num2:l})}v(x)},b=()=>{window.print()};return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"print:hidden space-y-6",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold tracking-tight",children:"竖式计算生成"}),e.jsx("p",{className:"text-muted-foreground",children:"生成多位数乘多位数的竖式计算练习题。"})]}),e.jsxs("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx(d,{htmlFor:"range1",children:"乘数1范围 (例如 10-99)"}),e.jsx(o,{id:"range1",value:c,onChange:t=>u(t.target.value),placeholder:"1-9999"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(d,{htmlFor:"range2",children:"乘数2范围 (例如 10-99)"}),e.jsx(o,{id:"range2",value:m,onChange:t=>_(t.target.value),placeholder:"1-9999"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(d,{htmlFor:"count",children:"题目数量"}),e.jsx(o,{id:"count",type:"number",value:h,onChange:t=>j(parseInt(t.target.value)||0)})]}),e.jsxs("div",{className:"flex gap-2 justify-end",children:[e.jsx(g,{onClick:y,children:"生成试卷"}),e.jsxs(g,{variant:"outline",onClick:b,children:[e.jsx(k,{className:"mr-2 h-4 w-4"})," 打印A4"]})]})]})]}),e.jsxs("div",{className:"print:block",id:"print-area",children:[e.jsxs("div",{className:"hidden print:block mb-8 text-center",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"竖式计算练习"}),e.jsxs("div",{className:"mt-2 flex justify-center gap-8 text-sm",children:[e.jsx("span",{children:"日期: ______________"}),e.jsx("span",{children:"耗时: ______________"}),e.jsx("span",{children:"得分: ______________"})]})]}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 print:grid-cols-5 gap-x-8 gap-y-16 print:gap-y-12 w-full",children:p.map((t,a)=>e.jsxs("div",{className:"font-mono text-xl",style:{letterSpacing:"0.2em"},children:[e.jsx("div",{className:"text-right",children:t.num1}),e.jsxs("div",{className:"text-right border-b-2 border-black relative",children:[e.jsx("span",{className:"absolute left-0 bottom-0.5",children:"×"}),t.num2]}),e.jsx("div",{className:"h-12"})," "]},a))}),p.length===0&&e.jsx("div",{className:"print:hidden text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg",children:"点击上方“生成试卷”按钮开始"})]}),e.jsx("style",{children:`
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
      `})]})}export{P as default};
