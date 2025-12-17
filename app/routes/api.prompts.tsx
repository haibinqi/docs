import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";

function requireDB(context: any) {
  const db = (context as any)?.DB as D1Database | undefined;
  if (!db) throw new Response("D1 not bound", { status: 500 });
  return db;
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const health = url.searchParams.get("health");
    const category = url.searchParams.get("category");
    const db = requireDB(context);

    if (health === "1") {
      const res = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='prompts'").all();
      return json({ ok: true, table: res.results?.[0]?.name ?? null });
    }

    const promptsStmt = category && category !== "ALL"
      ? db.prepare("SELECT id, category, title, content, created_at FROM prompts WHERE category = ? ORDER BY created_at DESC").bind(category)
      : db.prepare("SELECT id, category, title, content, created_at FROM prompts ORDER BY created_at DESC");
    const promptsRes = await promptsStmt.all();

    const catsRes = await db.prepare("SELECT DISTINCT category FROM prompts ORDER BY category ASC").all();

    return json({
      prompts: (promptsRes.results ?? []).map((r: any) => ({
        id: String(r.id),
        category: String(r.category),
        title: String(r.title),
        content: String(r.content),
        createdAt: Number(r.created_at),
      })),
      categories: (catsRes.results ?? []).map((r: any) => String(r.category)),
    });
  } catch (e: any) {
    console.error("/api/prompts loader error:", e);
    return json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}

export async function action({ request, context }: ActionFunctionArgs) {
  try {
    const db = requireDB(context);
    const method = request.method.toUpperCase();

    if (method === "POST") {
      const body = await request.json();
      const { category, title, content } = body ?? {};
      if (!category || !title || !content) return json({ error: "missing fields" }, { status: 400 });
      const id = crypto.randomUUID();
      const createdAt = Date.now();
      await db.prepare("INSERT INTO prompts (id, category, title, content, created_at) VALUES (?, ?, ?, ?, ?)").bind(id, category, title, content, createdAt).run();
      return json({ ok: true, id });
    }

    if (method === "DELETE") {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      if (!id) return json({ error: "missing id" }, { status: 400 });
      await db.prepare("DELETE FROM prompts WHERE id = ?").bind(id).run();
      return json({ ok: true });
    }

    return json({ error: "method not allowed" }, { status: 405 });
  } catch (e: any) {
    console.error("/api/prompts action error:", e);
    return json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}
