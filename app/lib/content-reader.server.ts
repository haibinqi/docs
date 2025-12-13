import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ContentNote {
    slug: string;
    title: string;
    content: string;
    tag: string;
    filePath: string;
    modifiedAt: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllNotes(): ContentNote[] {
    const notes: ContentNote[] = [];

    if (!fs.existsSync(CONTENT_DIR)) {
        return notes;
    }

    const folders = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    for (const folder of folders) {
        const folderPath = path.join(CONTENT_DIR, folder);
        const files = fs.readdirSync(folderPath)
            .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContent);

            const stats = fs.statSync(filePath);
            notes.push({
                slug: file.replace(/\.(md|mdx)$/, ""),
                title: data.title || file.replace(/\.(md|mdx)$/, ""),
                content: content.trim(),
                tag: folder,
                filePath: `${folder}/${file}`,
                modifiedAt: stats.mtime.toISOString().split("T")[0],
            });
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
    if (!fs.existsSync(CONTENT_DIR)) {
        return [];
    }

    return fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
}

export function getNoteByPath(tag: string, slug: string): ContentNote | null {
    const filePath = path.join(CONTENT_DIR, tag, `${slug}.md`);
    const mdxPath = path.join(CONTENT_DIR, tag, `${slug}.mdx`);

    let actualPath = "";
    if (fs.existsSync(filePath)) {
        actualPath = filePath;
    } else if (fs.existsSync(mdxPath)) {
        actualPath = mdxPath;
    } else {
        return null;
    }

    const fileContent = fs.readFileSync(actualPath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = fs.statSync(actualPath);
    const fileName = path.basename(actualPath);

    return {
        slug,
        title: data.title || slug,
        content: content.trim(),
        tag,
        filePath: `${tag}/${fileName}`,
        modifiedAt: stats.mtime.toISOString().split("T")[0],
    };
}
