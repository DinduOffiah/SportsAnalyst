"use client";

import { useState } from "react";
import { useSportsStore } from "@/store/useSportsStore";
import { Bookmark, Trash2, Plus } from "lucide-react";

export default function SavedFilters() {
  const {
    savedFilters,
    saveCurrentFilter,
    loadFilter,
    deleteFilter,
    selectedSport,
    selectedLeague,
    bettingFormat,
  } = useSportsStore();

  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const handleSave = () => {
    if (!newName.trim()) return;
    saveCurrentFilter(newName);
    setNewName("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition"
      >
        <Bookmark className="w-4 h-4" />
        Saved Filters
        {savedFilters.length > 0 && (
          <span className="bg-emerald-600 text-xs px-1.5 py-0.5 rounded-full">
            {savedFilters.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 p-4">
          <h3 className="font-semibold mb-3 text-sm">Saved Filters</h3>

          {/* Save new filter */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Filter name..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-500 p-2 rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* List of saved filters */}
          {savedFilters.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">
              No saved filters yet
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {savedFilters.map((filter) => (
                <div
                  key={filter.id}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition group"
                >
                  <button
                    onClick={() => {
                      loadFilter(filter.id);
                      setIsOpen(false);
                    }}
                    className="text-left flex-1"
                  >
                    <p className="text-sm font-medium">{filter.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {filter.sport} • {filter.league} • {filter.bettingFormat}
                    </p>
                  </button>

                  <button
                    onClick={() => deleteFilter(filter.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}