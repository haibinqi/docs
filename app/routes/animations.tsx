import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import { AnimationsSidebar, type AnimationItem } from "@/components/animations-sidebar";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  if (!context.cloudflare.env.DB) {
    return json({ animations: [] });
  }

  const { results } = await context.cloudflare.env.DB.prepare(
    "SELECT id, title, category FROM animations ORDER BY created_at DESC"
  ).all<AnimationItem>();
  return json({ animations: results });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  if (!context.cloudflare.env.DB) {
    throw new Error("Database binding 'DB' not found.");
  }

  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const category = formData.get("category");

  if (!title || !content || !category) {
    return json({ error: "Title, content and category are required" }, { status: 400 });
  }

  await context.cloudflare.env.DB.prepare(
    "INSERT INTO animations (title, content, category) VALUES (?, ?, ?)"
  ).bind(title, content, category).run();

  return json({ success: true });
};

export default function AnimationsLayout() {
  const { animations } = useLoaderData<typeof loader>();
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-2 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-4 px-[5px] pt-[5px]">
      <AnimationsSidebar animations={animations} />
      <main className="relative h-[calc(100vh-4rem)] overflow-hidden -mx-[5px] lg:-mx-4 md:ml-0">
        <Outlet />
      </main>
    </div>
  )
}
