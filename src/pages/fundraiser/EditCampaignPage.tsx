import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../contexts/CategoriesContext';
import { useTags } from '../../contexts/TagsContext';

export function EditCampaignPage() {
  const { activeCategories } = useCategories();
  const { tags } = useTags();
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
      <Link to="/fundraiser/my-campaigns" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 mb-6">
        <i className="fa-solid fa-arrow-left" /> Back to My Campaigns
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Edit Campaign</h1>
      <p className="text-slate-500 mb-8">Update your campaign details</p>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
          <h2 className="font-semibold text-slate-800 mb-4">Campaign Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                defaultValue="Urgent Heart Surgery for Little Leo"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                {activeCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-emerald-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTagIds.includes(tag.id)}
                      onChange={(e) =>
                        setSelectedTagIds((prev) =>
                          e.target.checked ? [...prev, tag.id] : prev.filter((id) => id !== tag.id)
                        )
                      }
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">{tag.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                rows={5}
                defaultValue="Leo was born with a congenital heart defect..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">
            Save Changes
          </button>
          <Link to="/fundraiser/my-campaigns" className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
