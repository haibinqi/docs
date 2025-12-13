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
const modules = import.meta.glob("../../content/**/*.{md,mdx}", { eager: true, as: "raw" });

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

export function getAllNotes(): ContentNote[] {
    const notes: ContentNote[] = [];

    for (const [path, rawContent] of Object.entries(modules)) {
        try {
            // Path might be "../../content/Tag/Slug.md" or "/content/Tag/Slug.md"
            // Normalize it to look like content/Tag/Slug.md for splitting
            const normalizedPath = path.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
            // normalizedPath = "content/Tag/Slug.md"

            const parts = normalizedPath.split("/");
            // parts = ["content", "Tag", "Slug.md"]
            if (parts.length < 3) continue;

            const tag = parts[1];
            const filename = parts[2];
            const slug = filename.replace(/\.(md|mdx)$/, "");

            const { data, content } = parseFrontmatter(rawContent as string);

            notes.push({
                slug,
                title: data.title || slug,
                content,
                tag,
                filePath: `${tag}/${filename}`,
                modifiedAt: "2024-01-01", // Placeholder
            });
        } catch (e) {
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
