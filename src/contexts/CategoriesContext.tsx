import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { categories as defaultCategories } from '../data/campaigns';

const STORAGE_KEY = 'safedonate_categories';

export interface CategoryItem {
  id: string;
  label: string;
  icon: string;
  badge: string;
  hover: string;
  active: boolean;
  order: number;
}

function loadCategories(): CategoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CategoryItem[];
      return parsed.map((c) => ({ ...c, active: c.active !== false, order: c.order ?? 0 }));
    }
  } catch {
    /* ignore */
  }
  return defaultCategories.map((c, i) => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
    badge: c.badge,
    hover: c.hover,
    active: true,
    order: i,
  }));
}

function saveCategories(items: CategoryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

type CategoriesContextValue = {
  categories: CategoryItem[];
  activeCategories: CategoryItem[];
  addCategory: (item: Omit<CategoryItem, 'order' | 'active'>) => void;
  updateCategory: (id: string, updates: Partial<CategoryItem>) => void;
  setOrder: (id: string, newOrder: number) => void;
  deactivate: (id: string) => void;
  activate: (id: string) => void;
};

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<CategoryItem[]>(loadCategories);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const activeCategories = useMemo(
    () => categories.filter((c) => c.active).sort((a, b) => a.order - b.order),
    [categories]
  );

  const addCategory = useCallback((item: Omit<CategoryItem, 'order' | 'active'>) => {
    const order = Math.max(0, ...categories.map((c) => c.order)) + 1;
    setCategories((prev) => [...prev, { ...item, active: true, order }]);
  }, [categories]);

  const updateCategory = useCallback((id: string, updates: Partial<CategoryItem>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }, []);

  const setOrder = useCallback((id: string, newOrder: number) => {
    setCategories((prev) => {
      const copy = prev.map((c) => ({ ...c }));
      const idx = copy.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      copy[idx].order = newOrder;
      return copy.sort((a, b) => a.order - b.order);
    });
  }, []);

  const deactivate = useCallback((id: string) => {
    updateCategory(id, { active: false });
  }, [updateCategory]);

  const activate = useCallback((id: string) => {
    updateCategory(id, { active: true });
  }, [updateCategory]);

  const value = useMemo(
    () => ({
      categories,
      activeCategories,
      addCategory,
      updateCategory,
      setOrder,
      deactivate,
      activate,
    }),
    [categories, activeCategories, addCategory, updateCategory, setOrder, deactivate, activate]
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoriesContext);
  if (!ctx) throw new Error('useCategories must be used within CategoriesProvider');
  return ctx;
}

export function useCategoriesOptional() {
  return useContext(CategoriesContext);
}
