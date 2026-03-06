import { useState } from 'react';
import { useCategories } from '../../contexts/CategoriesContext';
import type { CategoryItem } from '../../contexts/CategoriesContext';

const ICON_OPTIONS = [
  'fa-heart-pulse',
  'fa-graduation-cap',
  'fa-paw',
  'fa-house-chimney-crack',
  'fa-palette',
  'fa-leaf',
  'fa-book-open',
  'fa-hand-holding-heart',
  'fa-globe',
];
const BADGE_OPTIONS = [
  'text-emerald-700',
  'text-blue-700',
  'text-amber-700',
  'text-rose-700',
  'text-purple-700',
  'text-teal-700',
];

export function ManageCategoriesPage() {
  const { categories, addCategory, updateCategory, activate, deactivate } = useCategories();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<CategoryItem | null>(null);
  const [form, setForm] = useState({ id: '', label: '', icon: 'fa-leaf', badge: 'text-teal-700', hover: 'group-hover:text-teal-700' });

  const handleAdd = () => {
    if (!form.id.trim() || !form.label.trim()) return;
    addCategory({
      id: form.id.trim().toLowerCase().replace(/\s+/g, '-'),
      label: form.label.trim(),
      icon: form.icon,
      badge: form.badge,
      hover: form.hover,
    });
    setForm({ id: '', label: '', icon: 'fa-leaf', badge: 'text-teal-700', hover: 'group-hover:text-teal-700' });
    setShowAdd(false);
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    updateCategory(editing.id, { label: form.label, icon: form.icon, badge: form.badge, hover: form.hover });
    setEditing(null);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Campaign Categories</h1>
      <p className="text-slate-500 mb-8">Create and manage categories for campaigns</p>

      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          <i className="fa-solid fa-plus mr-2" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Label</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">ID / Slug</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.sort((a, b) => a.order - b.order).map((c) => (
                <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="px-4 py-4">
                    <span className={`${c.badge} font-medium`}>
                      <i className={`fa-solid ${c.icon} mr-2`} />
                      {c.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-mono text-sm text-slate-600">{c.id}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        c.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(c);
                        setForm({ id: c.id, label: c.label, icon: c.icon, badge: c.badge, hover: c.hover });
                      }}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mr-3"
                    >
                      Edit
                    </button>
                    {c.active ? (
                      <button
                        type="button"
                        onClick={() => deactivate(c.id)}
                        className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => activate(c.id)}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm((f) => ({ ...f, label: e.target.value, id: f.id || e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                  placeholder="e.g. Medical"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ID / Slug</label>
                <input
                  type="text"
                  value={form.id}
                  onChange={(e) => setForm((f) => ({ ...f, id: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                  placeholder="medical"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Icon (Font Awesome class)</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {ICON_OPTIONS.map((ico) => (
                    <option key={ico} value={ico}>{ico}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Badge color class</label>
                <select
                  value={form.badge}
                  onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value, hover: `group-hover:${e.target.value}` }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {BADGE_OPTIONS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Edit Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {ICON_OPTIONS.map((ico) => (
                    <option key={ico} value={ico}>{ico}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Badge color</label>
                <select
                  value={form.badge}
                  onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value, hover: `group-hover:${e.target.value}` }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {BADGE_OPTIONS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 py-2 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
