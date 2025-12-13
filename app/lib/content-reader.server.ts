export interface ContentNote {
    slug: string;
    title: string;
    content: string;
    tag: string;
    filePath: string;
    modifiedAt: string;
}

// Use import.meta.glob to load all markdown files eagerly.
// We use a relative path to ensure Vite finds it relative to this file (app/lib/content-reader.server.ts).
// This usually resolves to keys starting with ../../content/ or /content/ depending on configuration.
// Use import.meta.glob to load all markdown files eagerly.
// We remove specific query/import options to get the full Module Namespace.
// This allows us to inspect if 'frontmatter' is exported or if we can use the default export.
const modules = import.meta.glob("../../content/**/*.{md,mdx}", { eager: true });

// Helper to extract frontmatter locally without gray-matter if possible,
// or just parse basic frontmatter since we removed the complex dependency.
// For now, we will do a simple regex parse for title and basic metadata 
// to avoid importing 'gray-matter' which uses 'stream' and 'buffer'.
function parseFrontmatter(text: string): { data: any; content: string } {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = text.match(frontmatterRegex);

    if (match) {
        const frontmatterBlock = match[1];
        const content = text.slice(match[0].length).trim();
        const data: any = {};

        frontmatterBlock.split('\n').forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length) {
                data[key.trim()] = values.join(':').trim();
            }
        });

        return { data, content };
    }

    return { data: {}, content: text };
}

const debugLogs: string[] = [];

export function getAllNotes(): ContentNote[] {
    const notes: ContentNote[] = [];
    debugLogs.length = 0; // Clear previous logs

    for (const [path, mod] of Object.entries(modules)) {
        try {
            debugLogs.push(`Processing: ${path}`);

            // Normalize path
            const normalizedPath = path.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
            debugLogs.push(`Normalized: ${normalizedPath}`);
            const parts = normalizedPath.split("/");
            if (parts.length < 3) {
                debugLogs.push("SKIPPED: Parts < 3");
                continue;
            }
            const tag = parts[1];
            const filename = parts[2];
            const slug = filename.replace(/\.(md|mdx)$/, "");

            // Inspect Module
            debugLogs.push(`Module Keys: ${Object.keys(mod as any).join(", ")}`);

            // Check for frontmatter
            // @ts-ignore
            const frontmatter = mod.frontmatter || {};
            debugLogs.push(`Frontmatter found: ${JSON.stringify(frontmatter)}`);

            // If we have frontmatter, we can use it.
            // But we still need 'content'. 
            // If we can't get raw content string, we might need to render the component or look for other exports.
            // For now, let's just log and see if we can find a way forward.

            // fallback for content if simple string not available
            let content = "";
            // @ts-ignore
            if (typeof mod.default === 'string') content = mod.default; // rare
            else content = "Content unavailable in debug mode (component source)";

            // Attempt to use 'parseFrontmatter' only if we have raw string, otherwise rely on exported keys
            if (content.startsWith("Content unavailable")) {
                // Try to see if we can get a raw export?
                // If not, we will need to change strategy to SSR.
            }

            notes.push({
                slug,
                title: frontmatter.title || slug, // Prefer exported frontmatter
                content: content,
                tag,
                filePath: `${tag}/${filename}`,
                modifiedAt: "2024-01-01", // Placeholder
            });
            debugLogs.push("SUCCESS");
        } catch (e: any) {
            debugLogs.push(`ERROR: ${e.message}`);
            console.error("Error parsing note:", path, e);
        }
    }

    return notes;
}

export function getNotesByTag(): { tag: string; notes: ContentNote[] }[] {
    const allNotes = getAllNotes();
    const tagMap = new Map<string, ContentNote[]>();

    for (const note of allNotes) {
        if (!tagMap.has(note.tag)) {
            tagMap.set(note.tag, []);
        }
        tagMap.get(note.tag)!.push(note);
    }

    return Array.from(tagMap.entries()).map(([tag, notes]) => ({ tag, notes }));
}

export function getAllTags(): string[] {
    const tags = new Set<string>();
    for (const path of Object.keys(modules)) {
        const parts = path.split("/");
        if (parts.length >= 4) {
            tags.add(parts[2]);
        }
    }
    return Array.from(tags);
}

export function getNoteByPath(tag: string, slug: string): ContentNote | null {
    const allNotes = getAllNotes();
    return allNotes.find(n => n.tag === tag && n.slug === slug) || null;
}

export function getDebugKeys(): string[] {
    return debugLogs;
}
