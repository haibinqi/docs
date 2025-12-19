import { json, type LoaderFunctionArgs, type ActionFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, Form, redirect } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const meta: MetaFunction = ({ data }) => {
  return [
    { title: `${(data as any)?.animation?.title || "动画演示"} - Haibin` },
  ];
};

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const { id } = params;
  
  if (!context.cloudflare.env.DB) {
    throw new Error("Database binding not found");
  }

  const animation = await context.cloudflare.env.DB.prepare(
    "SELECT * FROM animations WHERE id = ?"
  ).bind(id).first();

  if (!animation) {
    throw new Response("Animation Not Found", { status: 404 });
  }

  return json({ animation });
};

export const action = async ({ params, context }: ActionFunctionArgs) => {
  const { id } = params;
  if (!context.cloudflare.env.DB) {
      throw new Error("Database binding not found");
  }
  
  await context.cloudflare.env.DB.prepare(
      "DELETE FROM animations WHERE id = ?"
  ).bind(id).run();
  
  return redirect("/animations");
};

export default function AnimationDetail() {
  const { animation } = useLoaderData<typeof loader>();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-3 bg-transparent z-10 absolute top-0 left-0 right-0 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
            <h1 className="text-lg font-medium">{animation.title}</h1>
            <span className="text-sm text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">{animation.category}</span>
        </div>
        <Form method="post" onSubmit={(event) => {
            if (!confirm("确定要删除这个动画吗？")) {
                event.preventDefault();
            }
        }} className="pointer-events-auto">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">删除</span>
            </Button>
        </Form>
      </div>
      <div className="flex-1 w-full relative">
        <iframe 
            srcDoc={`<!DOCTYPE html><html><head><style>body{margin:0;overflow:auto;font-family:system-ui,-apple-system,sans-serif;height:100vh;}</style></head><body>${animation.content}</body></html>`}
            className="w-full h-full border-0 absolute inset-0"
            title={animation.title}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
