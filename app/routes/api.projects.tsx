import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";

function requireDB(context: any) {
  const db = (context as any)?.DB as D1Database | undefined;
  if (!db) throw new Response("D1 not bound", { status: 500 });
  return db;
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    const db = requireDB(context);

    // Ensure table exists (auto-migration logic for simplicity in this setup)
    await db
      .prepare(
        `CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          tasks TEXT NOT NULL,
          links TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        )`
      )
      .run();

    const stmt = db.prepare("SELECT id, name, tasks, links, updated_at FROM projects ORDER BY updated_at DESC");
    const res = await stmt.all();

    return json({
      projects: (res.results ?? []).map((r: any) => ({
        id: String(r.id),
        name: String(r.name),
        tasks: JSON.parse(String(r.tasks)),
        links: JSON.parse(String(r.links)),
        updatedAt: Number(r.updated_at),
      })),
    });
  } catch (e: any) {
    console.error("/api/projects loader error:", e);
    return json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}

export async function action({ request, context }: ActionFunctionArgs) {
  try {
    const db = requireDB(context);
    const method = request.method.toUpperCase();

    // Ensure table exists
    await db
      .prepare(
        `CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          tasks TEXT NOT NULL,
          links TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        )`
      )
      .run();

    if (method === "POST") {
      const body = await request.json();
      const { name, tasks, links } = body as any;
      if (!name) return json({ error: "missing name" }, { status: 400 });
      
      const id = crypto.randomUUID();
      const now = Date.now();
      
      await db
        .prepare("INSERT INTO projects (id, name, tasks, links, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(id, name, JSON.stringify(tasks || []), JSON.stringify(links || []), now, now)
        .run();
        
      return json({ ok: true, id, name, tasks: tasks || [], links: links || [] });
    }

    if (method === "PUT") {
      const body = await request.json();
      const { id, name, tasks, links } = body as any;
      if (!id) return json({ error: "missing id" }, { status: 400 });

      const now = Date.now();
      
      // Build update query dynamically based on provided fields
      const updates = [];
      const params = [];
      
      if (name !== undefined) {
        updates.push("name = ?");
        params.push(name);
      }
      if (tasks !== undefined) {
        updates.push("tasks = ?");
        params.push(JSON.stringify(tasks));
      }
      if (links !== undefined) {
        updates.push("links = ?");
        params.push(JSON.stringify(links));
      }
      
      if (updates.length === 0) return json({ ok: true }); // Nothing to update
      
      updates.push("updated_at = ?");
      params.push(now);
      
      params.push(id); // For WHERE clause

      await db
        .prepare(`UPDATE projects SET ${updates.join(", ")} WHERE id = ?`)
        .bind(...params)
        .run();

      return json({ ok: true });
    }

    if (method === "DELETE") {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      if (!id) return json({ error: "missing id" }, { status: 400 });
      
      await db.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
      return json({ ok: true });
    }

    return json({ error: "method not allowed" }, { status: 405 });
  } catch (e: any) {
    console.error("/api/projects action error:", e);
    return json({ error: e?.message ?? String(e) }, { status: 500 });
  }
}
