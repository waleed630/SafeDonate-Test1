import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../contexts/CategoriesContext';
import { useTags } from '../contexts/TagsContext';

export function CreateCampaignPage() {
  const { activeCategories } = useCategories();
  const { tags } = useTags();
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
      <div className="mb-10">
        <Link to="/fundraiser/dashboard" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 mb-4">
          <i className="fa-solid fa-arrow-left" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Create a Campaign</h1>
        <p className="text-slate-500 mt-2">Tell your story and start raising funds</p>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Campaign Details</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">Campaign Title</label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Help Leo get heart surgery"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                id="category"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              >
                {activeCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
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
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Story</label>
              <textarea
                id="description"
                rows={6}
                placeholder="Share your story and explain why you need support..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">Cover Image URL</label>
              <input
                type="url"
                id="image"
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Funding Goal</h2>
          <div className="space-y-5">
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-slate-700 mb-2">Goal Amount ($)</label>
              <input
                type="number"
                id="goal"
                placeholder="15000"
                min="100"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-slate-700 mb-2">Campaign End Date</label>
              <input
                type="date"
                id="deadline"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            className="flex-1 w-full sm:w-auto py-3.5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
          >
            Create Campaign
          </button>
          <Link
            to="/fundraiser/dashboard"
            className="px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
