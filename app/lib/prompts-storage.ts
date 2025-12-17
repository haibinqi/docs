export interface PromptItem {
  id: string;
  category: string;
  title: string;
  content: string;
  createdAt: number;
}

const STORAGE_KEY = "docs-prompts";

export function getPrompts(): PromptItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as PromptItem[];
  } catch {
    return [];
  }
}

export function savePrompt(item: Omit<PromptItem, "id" | "createdAt">): PromptItem {
  const list = getPrompts();
  const newItem: PromptItem = {
    ...item,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    createdAt: Date.now(),
  };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
}

export function deletePrompt(id: string): boolean {
  const list = getPrompts();
  const filtered = list.filter((p) => p.id !== id);
  const changed = filtered.length !== list.length;
  if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return changed;
}

export function getCategories(): string[] {
  const set = new Set<string>();
  getPrompts().forEach((p) => set.add(p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getPromptsByCategory(cat?: string): PromptItem[] {
  const list = getPrompts();
  if (!cat) return list;
  return list.filter((p) => p.category === cat);
}

export function exportPrompts(): string {
  return JSON.stringify(getPrompts(), null, 2);
}

export function importPrompts(json: string): boolean {
  try {
    const data = JSON.parse(json) as PromptItem[];
    if (!Array.isArray(data)) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
