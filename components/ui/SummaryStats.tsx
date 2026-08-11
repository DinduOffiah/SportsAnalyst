"use client";

import { useSportsStore } from "@/store/useSportsStore";
import { calculateFairProbabilities } from "@/lib/probability";

export default function SummaryStats() {
  const { selectedSport, selectedLeague, matches } = useSportsStore();

  const filtered = matches.filter((m) => {
    const sportMatch = m.sport === selectedSport;
    const leagueMatch = selectedLeague === "all" || m.league === selectedLeague;
    return sportMatch && leagueMatch;
  });

  const liveCount = filtered.filter((m) => m.status === "live").length;

  // Average fair home probability
  const avgHomeProb =
    filtered.length > 0
      ? filtered.reduce((sum, m) => {
          const p = calculateFairProbabilities(m.odds);
          return sum + p.fairHome;
        }, 0) / filtered.length
      : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-1">Total Matches</p>
        <p className="text-2xl font-bold">{filtered.length}</p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-1">Live Now</p>
        <p className="text-2xl font-bold text-red-400">{liveCount}</p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-1">Avg Home Win Prob</p>
        <p className="text-2xl font-bold text-emerald-400">
          {(avgHomeProb * 100).toFixed(1)}%
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-1">Sport</p>
        <p className="text-2xl font-bold capitalize">{selectedSport}</p>
      </div>
    </div>
  );
}