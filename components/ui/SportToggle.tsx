"use client";

import { useSportsStore } from "@/store/useSportsStore";
import { Sport } from "@/lib/types";

const sports: { value: Sport; label: string; emoji: string }[] = [
  { value: "football", label: "Football", emoji: "⚽" },
  { value: "basketball", label: "Basketball", emoji: "🏀" },
  { value: "tennis", label: "Tennis", emoji: "🎾" },
];

export default function SportToggle() {
  const { selectedSport, setSport } = useSportsStore();

  return (
    <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
      {sports.map((sport) => (
        <button
          key={sport.value}
          onClick={() => setSport(sport.value)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${
              selectedSport === sport.value
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }
          `}
        >
          <span>{sport.emoji}</span>
          {sport.label}
        </button>
      ))}
    </div>
  );
}