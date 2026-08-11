"use client";

import DashboardHeader from "@/components/ui/DashboardHeader";
import SportToggle from "@/components/ui/SportToggle";
import Filters from "@/components/ui/Filters";
import MatchCard from "@/components/ui/MatchCard";
import { useSportsStore } from "@/store/useSportsStore";

export default function HomePage() {
  const { selectedSport, selectedLeague, matches } = useSportsStore();

  const filteredMatches = matches.filter((match) => {
    const sportMatch = match.sport === selectedSport;
    const leagueMatch =
      selectedLeague === "all" || match.league === selectedLeague;
    return sportMatch && leagueMatch;
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <SportToggle />
          <Filters />
        </div>

        {/* Results count */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            {filteredMatches.length} Match
            {filteredMatches.length !== 1 ? "es" : ""}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Showing fair probabilities (vigorish removed)
          </p>
        </div>

        {/* Match Grid */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No matches found for the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}