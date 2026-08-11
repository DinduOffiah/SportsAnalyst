"use client";

import { useSportsStore } from "@/store/useSportsStore";
import { BettingFormat } from "@/lib/types";

export default function Filters() {
  const {
    selectedSport,
    selectedLeague,
    bettingFormat,
    setLeague,
    setBettingFormat,
    matches,
  } = useSportsStore();

  // Get unique leagues for the currently selected sport
  const leagues = Array.from(
    new Set(
      matches
        .filter((m) => m.sport === selectedSport)
        .map((m) => m.league)
    )
  );

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* League Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">League</label>
        <select
          value={selectedLeague}
          onChange={(e) => setLeague(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All Leagues</option>
          {leagues.map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>

      {/* Betting Format Toggle */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">Format</label>
        <div className="flex bg-slate-900 rounded-lg border border-slate-700 p-1">
          {(["moneyline", "spread", "totals"] as BettingFormat[]).map((format) => (
            <button
              key={format}
              onClick={() => setBettingFormat(format)}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-md capitalize transition
                ${
                  bettingFormat === format
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              {format}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}