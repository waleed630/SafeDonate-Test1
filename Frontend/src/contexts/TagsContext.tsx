import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'safedonate_tags';

export interface TagItem {
  id: string;
  label: string;
  slug: string;
}

const defaultTags: TagItem[] = [
  { id: '1', label: 'Urgent', slug: 'urgent' },
  { id: '2', label: 'Verified', slug: 'verified' },
  { id: '3', label: 'Featured', slug: 'featured' },
];

function loadTags(): TagItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TagItem[];
      return parsed.length ? parsed : defaultTags;
    }
  } catch {
    /* ignore */
  }
  return defaultTags;
}

function saveTags(items: TagItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

type TagsContextValue = {
  tags: TagItem[];
  addTag: (item: Omit<TagItem, 'id'>) => void;
  updateTag: (id: string, updates: Partial<TagItem>) => void;
  removeTag: (id: string) => void;
};

const TagsContext = createContext<TagsContextValue | null>(null);

export function TagsProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<TagItem[]>(loadTags);

  useEffect(() => {
    saveTags(tags);
  }, [tags]);

  const addTag = useCallback((item: Omit<TagItem, 'id'>) => {
    const id = String(Date.now());
    setTags((prev) => [...prev, { ...item, id }]);
  }, []);

  const updateTag = useCallback((id: string, updates: Partial<TagItem>) => {
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const removeTag = useCallback((id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({ tags, addTag, updateTag, removeTag }),
    [tags, addTag, updateTag, removeTag]
  );

  return (
    <TagsContext.Provider value={value}>
      {children}
    </TagsContext.Provider>
  );
}

export function useTags() {
  const ctx = useContext(TagsContext);
  if (!ctx) throw new Error('useTags must be used within TagsProvider');
  return ctx;
}

export function useTagsOptional() {
  return useContext(TagsContext);
}
