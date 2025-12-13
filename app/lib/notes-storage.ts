// Notes Storage Utility - localStorage based

export interface Note {
    id: string;
    title: string;
    tags: string[];
    content: string;
    createdAt: number;
    updatedAt: number;
}

const STORAGE_KEY = "docs-notes";

export function getNotes(): Note[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored) as Note[];
    } catch {
        return [];
    }
}

export function saveNote(note: Omit<Note, "id" | "createdAt" | "updatedAt">): Note {
    const notes = getNotes();
    const newNote: Note = {
        ...note,
        id: Date.now().toString(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    notes.unshift(newNote);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return newNote;
}

export function updateNote(id: string, updates: Partial<Omit<Note, "id" | "createdAt">>): Note | null {
    const notes = getNotes();
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) return null;
    notes[index] = { ...notes[index], ...updates, updatedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return notes[index];
}

export function deleteNote(id: string): boolean {
    const notes = getNotes();
    const filtered = notes.filter((n) => n.id !== id);
    if (filtered.length === notes.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
}

export function getAllTags(): string[] {
    const notes = getNotes();
    const tagsSet = new Set<string>();
    notes.forEach((note) => note.tags.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
}

export function getNotesByTag(tag: string): Note[] {
    return getNotes().filter((note) => note.tags.includes(tag));
}
