import { Link, useLocation, useFetcher } from "@remix-run/react"
import { cn } from "@/lib/utils"
import { FlaskConical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"

export interface AnimationItem {
  id: number
  title: string
  category: string
}

interface AnimationsSidebarProps {
  animations: AnimationItem[]
}

export function AnimationsSidebar({ animations }: AnimationsSidebarProps) {
  const location = useLocation()
  const pathname = location.pathname
  const fetcher = useFetcher()
  const [open, setOpen] = useState(false)
  
  const isSubmitting = fetcher.state === "submitting"

  useEffect(() => {
    if (fetcher.data && (fetcher.data as any).success) {
        setOpen(false)
    }
  }, [fetcher.data])

  // Group animations by category
  const groupedAnimations = animations.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, AnimationItem[]>)

  return (
    <aside className="fixed top-[calc(3.5rem+5px)] z-30 -ml-2 hidden h-[calc(100vh-3.5rem-5px)] w-full shrink-0 md:sticky md:block border-r bg-background">
      <div className="h-full pr-4 pl-2 py-4">
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 px-2">
             <h4 className="text-sm font-semibold">
               动画列表
             </h4>
             <Dialog open={open} onOpenChange={setOpen}>
                 <DialogTrigger asChild>
                     <Button variant="ghost" size="icon" className="h-6 w-6">
                         <Plus className="h-4 w-4" />
                         <span className="sr-only">添加动画</span>
                     </Button>
                 </DialogTrigger>
                 <DialogContent>
                     <DialogHeader>
                         <DialogTitle>添加新动画</DialogTitle>
                         <DialogDescription>
                             输入动画标题、分类和代码。
                         </DialogDescription>
                     </DialogHeader>
                     <fetcher.Form method="post" action="/animations" className="space-y-4">
                          <div className="space-y-2">
                             <Label htmlFor="category">分类</Label>
                             <Input id="category" name="category" placeholder="例如：四年级科学" required />
                         </div>
                         <div className="space-y-2">
                             <Label htmlFor="title">标题</Label>
                             <Input id="title" name="title" placeholder="例如：水的三态变化" required />
                         </div>
                         <div className="space-y-2">
                             <Label htmlFor="content">HTML 代码</Label>
                             <Textarea 
                                 id="content" 
                                 name="content" 
                                 placeholder="<style>...</style><svg>...</svg><script>...</script>" 
                                 className="font-mono min-h-[150px]"
                                 required 
                             />
                             <p className="text-xs text-muted-foreground">支持完整 HTML/SVG/CSS/JS。</p>
                         </div>
                         {(fetcher.data as any)?.error && (
                             <p className="text-sm text-destructive">{(fetcher.data as any).error}</p>
                         )}
                         <div className="flex justify-end">
                             <Button type="submit" disabled={isSubmitting}>
                                 {isSubmitting ? "添加中..." : "添加"}
                             </Button>
                         </div>
                     </fetcher.Form>
                 </DialogContent>
             </Dialog>
          </div>
         
         <div className="flex-1 overflow-y-auto pr-2">
           {animations.length === 0 ? (
               <div className="px-2 text-muted-foreground text-xs">暂无动画，点击上方 + 号添加</div>
           ) : (
               <div className="space-y-6">
                   {Object.entries(groupedAnimations).map(([category, items]) => (
                       <div key={category}>
                           <h5 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                               {category}
                           </h5>
                           <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
                               {items.map((item) => (
                                   <Link
                                     key={item.id}
                                     to={`/animations/${item.id}`}
                                     className={cn(
                                       "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline truncate",
                                       pathname === `/animations/${item.id}`
                                         ? "text-foreground font-medium bg-muted"
                                         : "text-muted-foreground"
                                     )}
                                     title={item.title}
                                   >
                                     <FlaskConical className="mr-2 h-4 w-4 shrink-0" />
                                     <span className="truncate">{item.title}</span>
                                   </Link>
                               ))}
                           </div>
                       </div>
                   ))}
               </div>
           )}
         </div>
        </div>
      </div>
    </aside>
  )
}
